import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '@/components/UI/IconButton';
import Button from '@/components/UI/Button';
import { ExpensesContext } from '@/store/expenses-context';

export default function ManageExpense() {
  const navigation = useNavigation();
  const editedExpenseId = useLocalSearchParams();
  const isEditing = !!editedExpenseId.expenseId;

  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId.expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    const DUMMY_CONFIRM_DATA = {
      description: 'Dummy description',
      amount: 1999.99,
      date: new Date(),
    };
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId.expenseId, DUMMY_CONFIRM_DATA);
    } else {
      expensesCtx.addExpense(DUMMY_CONFIRM_DATA);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color='red'
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'dodgerblue',
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: 'lightblue',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

