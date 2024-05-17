import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '@/components/UI/IconButton';
import Button from '@/components/UI/Button';
import { ExpensesContext } from '@/store/expenses-context';
import ExpenseForm from '../../components/ManageExpense/ExpenseForm';
import {
  deleteExpense,
  getUserExpenses,
  saveExpense,
  updateExpense,
} from '../api/expenseApi';
import { useSession } from '@/store/auth-context';
export default function ManageExpense() {
  const { session } = useSession();
  const userSession = JSON.parse(session);

  const expenseCtx = useContext(ExpensesContext);

  const navigation = useNavigation();
  const editedExpense = useLocalSearchParams();
  const isEditing = !!editedExpense.expenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpense.expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.navigate('/');
    }
  };

  async function deleteExpenseHandler() {
    const request = await deleteExpense({
      userSession,
      id: editedExpense.expenseId,
    });

    expenseCtx.deleteExpense(editedExpense.expenseId);
    handleGoBack();
  }
  function cancelHandler() {
    handleGoBack();
  }
  async function confirmHandler(data) {
    if (isEditing) {
      const request = await updateExpense({
        userSession,
        data,
        id: editedExpense.expenseId,
      });
      expenseCtx.updateExpense(editedExpense.expenseId, data);
    } else {
      const request = await saveExpense({ userSession, data });
      expenseCtx.addExpense({ ...data, id: request.data.name });
    }
    handleGoBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

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
    backgroundColor: 'royalblue',
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

