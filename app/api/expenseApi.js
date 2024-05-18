import { useSession } from '@/store/auth-context';
import axios from 'axios';
const baseUrl = 'https://test-dyci-default-rtdb.firebaseio.com/users/';

export async function getUserExpenses(userSession) {
  try {
    const requestUrl = `${baseUrl}${userSession.localId}/expenses.json?auth=${userSession.idToken}`;
    const response = await axios.get(requestUrl);
    const expenses = [];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {}
}

export async function getExpenseByID({ userSession, id }) {
  try {
    const requestUrl = `${baseUrl}${userSession.localId}/expenses/${id}.json?auth=${userSession.idToken}`;
    const response = await axios.get(requestUrl);

    return {
      id: id,
      amount: response.data.amount,
      date: new Date(response.data.date),
      description: response.data.description,
    };
  } catch (error) {
    throw 'There was a problem in your request';
  }
}

export async function saveExpense({ userSession, data }) {
  try {
    const requestUrl = `${baseUrl}${userSession.localId}/expenses.json?auth=${userSession.idToken}`;
    return await axios.post(requestUrl, data);
  } catch (error) {
    throw 'There was a problem in your request';
  }
}

export async function updateExpense({ userSession, data, id }) {
  try {
    const requestUrl = `${baseUrl}${userSession.localId}/expenses/${id}.json?auth=${userSession.idToken}`;
    return await axios.patch(requestUrl, data);
  } catch (error) {
    throw 'There was a problem in your request';
  }
}

export async function deleteExpense({ userSession, id }) {
  try {
    const requestUrl = `${baseUrl}${userSession.localId}/expenses/${id}.json?auth=${userSession.idToken}`;
    return await axios.delete(requestUrl);
  } catch (error) {
    throw 'There was a problem in your request';
  }
}

