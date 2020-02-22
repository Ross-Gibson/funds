import { call, put, takeLatest } from 'redux-saga/effects';
import { Platform } from 'react-native';

import {
  ExpensesActionTypes,
  FetchExpensesAction,
  AddCommentAction,
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

function* expensesSaga() {
  yield takeLatest(ExpensesActionTypes.FETCH_EXPENSES_REQUEST, fetchExpenses);
  yield takeLatest(ExpensesActionTypes.ADD_COMMENT_REQUEST, addComment);
}

export default expensesSaga;
