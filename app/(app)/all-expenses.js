import { Text, View } from 'react-native';

import { useSession } from '../../store/auth-context';

export default function AllExpenses() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>All Expenses Page</Text>
    </View>
  );
}

