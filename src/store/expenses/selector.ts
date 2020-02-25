import { RootState } from '../types';

export const getExpenseById = (state: RootState, expenseId: string) => {
  return state.expenses.expenses.find(expense => expense.id === expenseId);
};
