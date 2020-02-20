import { combineReducers } from 'redux';

import expenses from './expenses/reducer';

const reducer = combineReducers({
  expenses: expenses,
});

export default reducer;
