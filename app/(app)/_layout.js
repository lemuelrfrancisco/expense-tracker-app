import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';
import { useSession } from '../../store/auth-context';
import { StatusBar } from 'expo-status-bar';
import ExpensesContextProvider from '../../store/expenses-context';
export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/sign-in' />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <>
      <StatusBar style='auto' />
      <ExpensesContextProvider>
        <Stack>
          <Stack.Screen
            name='(tabs)'
            options={{
              title: 'Expense Tracker App',
              headerShown: false,
              headerStyle: {
                backgroundColor: 'dodgerblue',
              },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name='manage-expenses'
            options={{
              title: 'Manage Expenses',
              headerShown: true,
              headerStyle: {
                backgroundColor: 'dodgerblue',
              },
              headerTintColor: 'white',
              headerTitleAlign: 'left',
              presentation: 'modal',
            }}
          />
        </Stack>
      </ExpensesContextProvider>
    </>
  );
}

