import { View, StyleSheet } from 'react-native';
import ExpensesOutput from '../../../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../../../store/expenses-context';
import { getDateMinusDays } from '../../../util/date';
import { getUserExpenses } from '../../api/expenseApi';
import { useSession } from '../../../store/auth-context';

export default function Index() {
  const { session } = useSession();
  const userSession = JSON.parse(session);
  const expenseCtx = useContext(ExpensesContext);

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  useEffect(() => {
    async function getExpenses() {
      const expenses = await getUserExpenses(userSession);
      if (expenses) {
        expenseCtx.setExpenses(expenses);
      }
    }
    getExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod={'Last 7 Days'}
        fallbackText={'No expenses registered for the last 7 days.'}
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

