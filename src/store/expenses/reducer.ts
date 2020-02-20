import { ExpensesAction, ExpensesState, ExpensesActionTypes } from './types';

const initialState: ExpensesState = {
  loading: false,
  expenses: [],
};

const expenses = (state = initialState, action: ExpensesAction) => {
  switch (action.type) {
    case ExpensesActionTypes.FETCH_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ExpensesActionTypes.FETCH_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: action.expenses,
        loading: false,
      };
    default:
      return state;
  }
};

export default expenses;
