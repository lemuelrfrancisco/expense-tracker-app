import { View, StyleSheet } from 'react-native';
import ExpensesOutput from '../../../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect } from 'react';
import { ExpensesContext } from '../../../store/expenses-context';
import { useSession } from '../../../store/auth-context';
import { getUserExpenses } from '../../api/expenseApi';

export default function AllExpenses() {
  const { session } = useSession();
  const userSession = JSON.parse(session);

  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await getUserExpenses(userSession);
      if (expenses) {
        expenseCtx.setExpenses(expenses);
      }
    }

    if (!expenseCtx.expenses.length) {
      getExpenses();
    }
  }, []);
  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={expenseCtx.expenses}
        expensesPeriod={'Total'}
        fallbackText={'No registered expenses found.'}
      />
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

