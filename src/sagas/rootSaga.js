import { all } from 'redux-saga/effects'
import { appSagas } from './appSaga';
import { authSagas } from './authSaga';

export default function* rootSaga() {
  yield all([
    ...appSagas,
    ...authSagas,
  ])
}