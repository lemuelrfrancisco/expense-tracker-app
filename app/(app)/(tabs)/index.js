import { Text, View } from 'react-native';

import { useSession } from '../../../store/auth-context';

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Manage Expenses Page</Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}

