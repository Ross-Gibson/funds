export enum ExpensesActionTypes {
  FETCH_EXPENSES_REQUEST = 'FETCH_EXPENSES_REQUEST',
  FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS',
  FETCH_EXPENSES_FAILURE = 'FETCH_EXPENSES_FAILURE',
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

export type ExpensesAction = FetchExpensesAction | UpdateExpensesAction;

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
}
