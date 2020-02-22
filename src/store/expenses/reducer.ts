import { ExpensesAction, ExpensesState, ExpensesActionTypes } from './types';

const initialState: ExpensesState = {
  loading: false,
  expenses: [],
  savingComment: false,
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
        expenses: action.payload.expenses,
        loading: false,
      };
    case ExpensesActionTypes.ADD_COMMENT_REQUEST:
      return {
        ...state,
        savingComment: true,
      };
    case ExpensesActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        expense: action.payload.expense,
        savingComment: false,
      };
    default:
      return state;
  }
};

export default expenses;
