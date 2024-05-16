import { StyleSheet, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 999.99,
    date: new Date('2024-03-14'),
  },
  {
    id: 'e2',
    description: 'Basic T-Shirt',
    amount: 499.99,
    date: new Date('2024-03-14'),
  },
  {
    id: 'e3',
    description: 'A pair of socks',
    amount: 159.99,
    date: new Date('2024-03-15'),
  },
  {
    id: 'e5',
    description: 'Perfume',
    amount: 15000.0,
    date: new Date('2024-03-16'),
  },
  {
    id: 'e6',
    description: 'Leather Belt',
    amount: 5999.99,
    date: new Date('2024-03-16'),
  },
  {
    id: 'e7',
    description: 'Dinner',
    amount: 3520.0,
    date: new Date('2024-03-16'),
  },
];
function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={style.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'royalblue',
  },
});

