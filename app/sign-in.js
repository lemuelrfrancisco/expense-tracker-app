import { router } from 'expo-router';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useSession } from '../store/auth-context';
import { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const { signIn, error } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    setIsSigningIn(true);
    try {
      //call login api with your credentials
      signIn(data);
      setIsSigningIn(false);
    } catch (error) {
      setIsSigningIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.logInContainer, styles.logInCard]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoName}>Expense Tracker</Text>
        </View>
        <Text style={[styles.headerText]}>Sign in</Text>
        {error && (
          <View>
            <Text style={{ color: 'red' }}>Incorrect Email/Password.</Text>
          </View>
        )}
        <Text style={styles.paragraph}>Email*</Text>
        <CustomInput
          control={control}
          name='email'
          rules={{ required: true }}
          placeholder='Email'
        />

        <Text style={styles.paragraph}>Password*</Text>
        <CustomInput
          control={control}
          name='password'
          rules={{ required: true }}
          placeholder='Password'
          secureTextEntry={true}
        />

        <View style={[styles.signUpButtonContainer]}>
          <Pressable onPress={() => navigation.navigate('sign-up')}>
            <Text>Sign up</Text>
          </Pressable>
        </View>
        <View style={[styles.signInButtonContainer]}>
          <CustomButton
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
            onPress={handleSubmit(onSubmit)}
            disabled={isSigningIn}
          >
            {!isSigningIn ? 'Sign in' : 'Signing in...'}
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  logInContainer: {
    width: '80%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    padding: 8,
    backgroundColor: 'white',
    marginVertical: 8,
    backgroundColor: '#d3d3d3',
  },
  signInButtonContainer: {
    marginTop: 18,
  },
  logoContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 70,
    width: '100%',
    marginBottom: 25,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  logoName: {
    fontSize: 36,
    fontWeight: 'bold',
    height: '100%',
    color: 'dodgerblue',
  },
  logInCard: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  signInButton: {
    backgroundColor: '#6495ED',
  },
  signInButtonText: {
    color: '#ffffff',
  },
});

