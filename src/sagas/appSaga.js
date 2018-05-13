import {call, put, select, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {
  setPage, openSnackbar, showSnackbar, closeSnackbar, setDrawerState, setOffline, updateDrawerState,
  UPDATE_LAYOUT, UPDATE_PAGE, SHOW_SNACKBAR, UPDATE_OFFLINE, UPDATE_DRAWER_STATE
} from "../actions/app";

/*
 * Selector functions
 */
const getAppOffline = (state) => state.app.offline;
const getDrawerOpened = (state) => state.app.drawerOpened;

/*
 * Saga and worker functions for navigation
 */

function* updatePageSaga(action) {
  if (!action || !action.page) {
    return;
  }
  // Extract the page name from path.
  const page = action.page === '/' ? 'view1' : action.page.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  yield call(loadPage, page);
  yield put(setPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  yield put(updateDrawerState(false));
}

async function loadPage(page) {
  switch (page) {
    case 'view1':
      await import('../components/my-view1.js');
      // Put code here that you want it to run every time when
      // navigate to view1 page and my-view1.js is loaded
      break;
    case 'view2':
      await import('../components/my-view2.js');
      break;
    default:
      page = 'view404';
      await import('../components/my-view404.js');
  }
}

/*
 * Snackbar saga
 */

function* showSnackBarSaga() {
  yield put(openSnackbar());
  yield delay(3000);
  yield put(closeSnackbar());
}

/*
 * Saga for offline state changes
 */

function* updateOfflineSaga(action) {
  // Show the snackbar, unless this is the first load of the page.
  if (yield select(getAppOffline) !== undefined) {
    yield put(showSnackbar());
  }
  yield put(setOffline(action.offline));
}

/*
 * Saga which decides if the drawer state should change or not
 */

function* updateLayoutSaga(action) {
  if (yield select(getDrawerOpened)) {
    yield put(updateDrawerState(false));
  }
}

/*
 * Saga which decides if the drawer should be opened or not
 */

function* updateDrawerStateSaga(action) {
  if (yield select(getDrawerOpened) !== action.opened) {
    yield put(setDrawerState(action.opened));
  }
}

export const appSagas = [
  takeEvery(UPDATE_PAGE, updatePageSaga),
  takeEvery(SHOW_SNACKBAR, showSnackBarSaga),
  takeEvery(UPDATE_OFFLINE, updateOfflineSaga),
  takeEvery(UPDATE_DRAWER_STATE, updateDrawerStateSaga),
  takeEvery(UPDATE_LAYOUT, updateLayoutSaga),
];