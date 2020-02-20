import { ExpensesAction, ExpensesActionTypes } from './types';

// export const fetchExpenses = ({
//   limit: number,
//   offset: number},
// ): ExpensesAction => ({
//   type: ExpensesActionTypes.FETCH_EXPENSES_REQUEST,
//   payload: payload,
// });

export function fetchExpenses(payload: {
  limit: number;
  offset: number;
}): ExpensesAction {
  return {
    type: ExpensesActionTypes.FETCH_EXPENSES_REQUEST,
    payload,
  };
}
