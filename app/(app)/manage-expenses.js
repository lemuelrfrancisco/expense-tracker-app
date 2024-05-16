import { Text, View, StyleSheet } from 'react-native';
import { useSession } from '../../store/auth-context';

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text>Manage Expenses Page</Text>
      {/* <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

