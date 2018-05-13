/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { SET_USER, SET_ACCESS_TOKEN } from '../actions/auth.js';

const auth = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
        signedIn: (action.user !== null && action.user !== undefined)
      };
    default:
      return state;
  }
};

export default auth;
