import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getFormattedDate, isDateValid } from '../../util/date';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { useForm } from 'react-hook-form';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: defaultValues?.description ? defaultValues.description : '',
      amount: defaultValues?.amount ? defaultValues.amount.toString() : 0,
      date:
        defaultValues?.date && isDateValid(defaultValues.date)
          ? getFormattedDate(defaultValues.date)
          : '',
      // date: getFormattedDate(new Date())
    },
  });

  function submitHandler(data) {
    if (!isDateValid(data.date)) {
      setError('date', {
        type: 'custom',
        message: 'Please enter valid date.',
      });

      return;
    }
    const expenseData = {
      amount: +parseFloat(data.amount),
      date: new Date(data.date),
      description: data.description,
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <CustomInput
          style={styles.rowInput}
          control={control}
          name='amount'
          rules={{
            required: true,
          }}
          placeholder='Amount'
          keyboardType='decimal-pad'
        />
        <CustomInput
          style={styles.rowInput}
          control={control}
          name='date'
          rules={{ required: true, dateIsValid: true }}
          placeholder='YYYY-MM-DD'
        />
      </View>
      <CustomInput
        control={control}
        name='description'
        rules={{ required: true }}
        placeholder='Description'
        multiline
        numberOfLines={5}
      />
      <View style={styles.buttons}>
        <CustomButton
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          Cancel
        </CustomButton>
        <CustomButton
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit(submitHandler)}
        >
          {submitButtonLabel}
        </CustomButton>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: 'forestgreen',
    color: 'white',
  },
});

