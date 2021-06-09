import { SagaIterator } from '@redux-saga/types';
import { all, fork } from 'redux-saga/effects';

// Sagas
import usersSaga from '../user/sagas';

export default function* root(): SagaIterator {
  yield all([fork(usersSaga)]);
}