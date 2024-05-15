import { Text, View } from 'react-native';

import { useSession } from '../../../store/auth-context';

export default function RecentExpenses() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recent Expense Page</Text>
    </View>
  );
}

