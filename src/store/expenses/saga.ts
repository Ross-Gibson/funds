import { call, put, takeLatest } from 'redux-saga/effects';
import { Platform } from 'react-native';

import {
  ExpensesActionTypes,
  FetchExpensesAction,
  AddCommentAction,
  AddReceiptAction,
} from './types';

function* fetchExpenses(action: FetchExpensesAction) {
  try {
    const { limit, offset } = action.payload;

    const baseUrl =
      Platform.OS === 'android'
        ? 'http://10.0.2.2:3000/'
        : 'http://localhost:3000/';

    const response = yield call(
      fetch,
      baseUrl +
        'expenses?limit=' +
        limit.toString() +
        '&offset=' +
        offset.toString(),
    );
    const responseJson = yield call([response, response.json]);

    yield put({
      type: ExpensesActionTypes.FETCH_EXPENSES_SUCCESS,
      payload: { expenses: responseJson.expenses },
    });
  } catch (error) {
    yield put({
      type: ExpensesActionTypes.FETCH_EXPENSES_FAILURE,
    });
  }
}

function* addComment(action: AddCommentAction) {
  try {
    const { comment, expenseId } = action.payload;

    const baseUrl =
      Platform.OS === 'android'
        ? 'http://10.0.2.2:3000/'
        : 'http://localhost:3000/';

    const response = yield call(fetch, baseUrl + 'expenses/' + expenseId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: comment }),
    });
    const responseJson = yield call([response, response.json]);

    yield put({
      type: ExpensesActionTypes.ADD_COMMENT_SUCCESS,
      payload: { expense: responseJson },
    });
  } catch (error) {
    yield put({
      type: ExpensesActionTypes.ADD_COMMENT_FAILURE,
    });
  }
}

function* addReceipt(action: AddReceiptAction) {
  try {
    const { receipt, expenseId } = action.payload;

    const baseUrl =
      Platform.OS === 'android'
        ? 'http://10.0.2.2:3000/'
        : 'http://localhost:3000/';

    // TODO: Replace mocked data with real data
    const image = {
      uri: 'https://blog.pleo.io/wp-content/uploads/2020/02/pleoblog-logo.png',
      name: 'Pleo.png',
      type: 'image/png',
    };

    const formData = new FormData();
    formData.append('receipt', image);

    const response = yield call(
      fetch,
      baseUrl + 'expenses/' + expenseId + '/receipts',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      },
    );
    const responseJson = yield call([response, response.json]);

    console.log('Added receipt to expense:', responseJson);

    yield put({
      type: ExpensesActionTypes.ADD_RECEIPT_SUCCESS,
      payload: { expense: responseJson },
    });
  } catch (error) {
    yield put({
      type: ExpensesActionTypes.ADD_RECEIPT_FAILURE,
    });
  }
}

function* expensesSaga() {
  yield takeLatest(ExpensesActionTypes.FETCH_EXPENSES_REQUEST, fetchExpenses);
  yield takeLatest(ExpensesActionTypes.ADD_COMMENT_REQUEST, addComment);
  yield takeLatest(ExpensesActionTypes.ADD_RECEIPT_REQUEST, addReceipt);
}

export default expensesSaga;
