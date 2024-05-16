import { FlatList, Text, View } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(item) {
  return <ExpenseItem {...item.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <>
      <View>
        <FlatList
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}

export default ExpensesList;

