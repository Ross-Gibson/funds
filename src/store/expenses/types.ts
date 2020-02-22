export enum ExpensesActionTypes {
  FETCH_EXPENSES_REQUEST = 'FETCH_EXPENSES_REQUEST',
  FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS',
  FETCH_EXPENSES_FAILURE = 'FETCH_EXPENSES_FAILURE',
  ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST',
  ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS',
  ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE',
}

export interface FetchExpensesAction {
  type: typeof ExpensesActionTypes.FETCH_EXPENSES_REQUEST;
  payload: {
    limit: number;
    offset: number;
  };
}

export interface UpdateExpensesAction {
  type: typeof ExpensesActionTypes.FETCH_EXPENSES_SUCCESS;
  payload: {
    expenses: Expense[];
  };
}

export interface AddCommentAction {
  type: typeof ExpensesActionTypes.ADD_COMMENT_REQUEST;
  payload: {
    expenseId: string;
    comment: string;
  };
}

export interface UpdateCommentAction {
  type: typeof ExpensesActionTypes.ADD_COMMENT_SUCCESS;
  payload: {
    expense: Expense;
  };
}

export type ExpensesAction =
  | FetchExpensesAction
  | UpdateExpensesAction
  | AddCommentAction
  | UpdateCommentAction;

export interface Expense {
  id: string;
  amount: {
    value: string;
    currency: string;
  };
  date: string;
  merchant: string;
  receipts: any[];
  comment: string;
  category: string;
  user: {
    first: string;
    last: string;
    email: string;
  };
}

export interface ExpensesState {
  loading: boolean;
  expenses: Expense[];
  savingComment: boolean;
}
