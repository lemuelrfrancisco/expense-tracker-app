import React, { useState } from 'react';
import { useStorageState } from '../useStorageState';
import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';
import { router } from 'expo-router';

const authBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const key = '?key=AIzaSyDpOCvyppuSRW_qB5PhQ-PqOINJ3SGFXeI';

interface AuthContextInterface {
  signIn: ({ email, password }: SignInInterface) => void;
  signUp: ({ email, password }: SignInInterface) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  error?: AxiosError | null;
}

interface SignInInterface {
  email: string;
  password: string;
}

const AuthContext = React.createContext<AuthContextInterface>({
  signIn: ({ email, password }: SignInInterface) => null,
  signUp: ({ email, password }: SignInInterface) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  error: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [error, setError] = useState<AxiosError | null>(null);

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ email, password }) => {
          // Perform sign-in logic here
          setError(null);
          const request = await axios
            .post(`${authBaseUrl}signInWithPassword${key}`, {
              email,
              password,
            })
            .then((res) => {
              setSession(JSON.stringify(res.data));
              router.replace('/');
            })
            .catch((err: AxiosError) => {
              setError(err);
            });
        },
        signUp: async ({ email, password }) => {
          setError(null);
          const request = await axios
            .post(`${authBaseUrl}signUp${key}`, {
              email,
              password,
              returnSecureToken: true,
            })
            .then((res) => {
              setSession(JSON.stringify(res.data));
              router.replace('/');
            })
            .catch((err: AxiosError) => {
              console.log(err);
              setError(err);
            });
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

