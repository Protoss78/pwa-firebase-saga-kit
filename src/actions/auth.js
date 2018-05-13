/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

export const WATCH_AUTH_STATE = 'WATCH_AUTH_STATE';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_USER = 'SET_USER';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

// This action triggers the saga
export const watchAuthState = () => {
  return {
    type: WATCH_AUTH_STATE
  };
};
// This action triggers the saga
export const signIn = () => {
  return {
    type: SIGN_IN
  };
};
// This action triggers the saga
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
// This action is used in the reducer to change the state
export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};
// This action is used in the reducer to change the state
export const setAccessToken = (token) => {
  return {
    type: SET_ACCESS_TOKEN,
    token
  };
};