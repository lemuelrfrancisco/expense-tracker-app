import { StyleSheet, Text, View } from 'react-native';

function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <>
      <View style={style.container}>
        <Text style={style.period}>{periodName}</Text>
        <Text style={style.sum}>₱{expensesSum.toFixed(2)}</Text>
      </View>
    </>
  );
}

export default ExpensesSummary;

const style = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: 'white',
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

