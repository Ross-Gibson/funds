import { fork } from 'redux-saga/effects';

import expensesSaga from './expenses/saga';

function* saga() {
  yield fork(expensesSaga);
}

export default saga;
