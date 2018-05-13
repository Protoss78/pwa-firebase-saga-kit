import {call, put, takeEvery, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {SIGN_IN, SIGN_OUT, WATCH_AUTH_STATE, setUser, setAccessToken} from '../actions/auth.js';

import firebaseConfig from '../firebase-config.js';

firebase.initializeApp(firebaseConfig);

function* watchAuthState() {
  const channel = yield call(doWatchAuthState);
  try {
    while (true) {
      const payload = yield take(channel);
      if (payload && payload.user) {
        yield put(setUser(payload.user));
      } else {
        yield put(setUser(null));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function doWatchAuthState() {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {
    let stateChangedEvent = user => emit({user: user});
    firebase.auth().onAuthStateChanged(stateChangedEvent)

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
    };
    return unsubscribe;
  });
}

function doSignOut() {
  return firebase.auth().signOut();
}

function doSignIn() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

function* signInSaga(action) {
  try {
    let result = yield call(doSignIn);
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      yield put(setAccessToken(token));
    }
    yield put(setUser(result.user));
  } catch (error) {
    console.log(error);
  }
}

function* signOutSaga(action) {
  yield call(doSignOut);
  yield put(setUser(null));
}

export const authSagas = [
  takeEvery(WATCH_AUTH_STATE, watchAuthState),
  takeEvery(SIGN_IN, signInSaga),
  takeEvery(SIGN_OUT, signOutSaga),
];