/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { signIn, signOut } from '../actions/auth.js';

// We are lazy loading its reducer.
import auth from '../reducers/auth.js';

store.addReducers({
  auth
});

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class LoginElement extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${ButtonSharedStyles}
      <style>
        div[hidden] {display: none}
      </style>
      <div hidden="${props.signedIn}">
        <button on-click="${() => this._onSignIn()}" title="Sign In">Sign In</button>
      </div>
      <div hidden="${!props.signedIn}">
          <span>${props.userName}</span>
          <button on-click="${() => this._onSignOut()}" title="Sign Out">Sign Out</button>
      </div>
    `;
  }

  static get properties() { return {
    // This is the data from the store.
    user: Object,
    signedIn: Boolean,
    token: String,
    userName: String
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this.user = state.auth.user;
    this.signedIn = state.auth.signedIn;
    this.token = state.auth.token;
    if (this.signedIn === true && this.user) {
      this.userName = this.user.displayName;
    } else {
      this.userName = '';
    }
  }

  constructor() {
    super();
    this.user = null;
    this.signedIn = false;
    this.token = null;
    this.userName = '';
  }

  _onSignIn() {
    store.dispatch(signIn());
  }

  _onSignOut() {
    store.dispatch(signOut());
  }
}

window.customElements.define('login-element', LoginElement);
