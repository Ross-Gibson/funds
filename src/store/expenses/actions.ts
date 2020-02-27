import { ExpensesAction, ExpensesActionTypes } from './types';

export function fetchExpenses(payload: {
  limit: number;
  offset: number;
}): ExpensesAction {
  return {
    type: ExpensesActionTypes.FETCH_EXPENSES_REQUEST,
    payload,
  };
}

export function addComment(payload: {
  comment: string;
  expenseId: string;
}): ExpensesAction {
  return {
    type: ExpensesActionTypes.ADD_COMMENT_REQUEST,
    payload,
  };
}

export function addReceipt(payload: {
  receipt: string;
  expenseId: string;
}): ExpensesAction {
  return {
    type: ExpensesActionTypes.ADD_RECEIPT_REQUEST,
    payload,
  };
}
