import { ExpensesAction, ExpensesState, ExpensesActionTypes } from './types';

const initialState: ExpensesState = {
  loading: false,
  expenses: [],
  savingComment: false,
  uploadingReceipt: false,
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
    case ExpensesActionTypes.ADD_RECEIPT_SUCCESS:
    case ExpensesActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense,
        ),
        savingComment:
          action.type === ExpensesActionTypes.ADD_COMMENT_SUCCESS
            ? false
            : state.savingComment,
        uploadingReceipt:
          action.type === ExpensesActionTypes.ADD_RECEIPT_SUCCESS
            ? false
            : state.uploadingReceipt,
      };
    case ExpensesActionTypes.ADD_RECEIPT_REQUEST:
      return {
        ...state,
        uploadingReceipt: true,
      };
    default:
      return state;
  }
};

export default expenses;
