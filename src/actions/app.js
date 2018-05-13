/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const SET_OFFLINE = 'SET_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const SET_DRAWER_STATE = 'SET_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const SET_PAGE = 'SET_PAGE';

/*
 * Navigation related actions
 */
// This action is used in the reducer to change the state
export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page
  };
};

// This action triggers the saga
export const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

/*
 * Snackbar related actions
 */
// This action triggers the saga
export const showSnackbar = () => {
  return {
    type: SHOW_SNACKBAR
  };
};

// This action is used in the reducer to change the state
export const openSnackbar = () => {
  return {
    type: OPEN_SNACKBAR
  };
};
// This action is used in the reducer to change the state
export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR
  };
};

/*
 * Offline state related actions
 */
// This action triggers the saga
export const updateOffline = (offline) => {
  return {
    type: UPDATE_OFFLINE,
    offline
  };
};
// This action is used in the reducer to change the state
export const setOffline = (offline) => {
  return {
    type: SET_OFFLINE,
    offline
  };
};

/*
 * Drawer related actions
 */
// This action triggers the saga
export const updateDrawerState = (opened) => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened
  };
};
// This action triggers the saga
export const updateLayout = (wide) => {
  return {
    type: UPDATE_LAYOUT,
    wide
  };
};
// This action is used in the reducer to change the state
export const setDrawerState = (opened) => {
  return {
    type: SET_DRAWER_STATE,
    opened
  };
};
