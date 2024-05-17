import { View, StyleSheet } from 'react-native';
import ExpensesOutput from '../../../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../../../store/expenses-context';

export default function AllExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod={'Total'} fallbackText={"No registered expenses found."} />
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

