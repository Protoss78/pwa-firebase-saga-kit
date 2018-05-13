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
import { plusIcon, minusIcon } from './my-icons.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class CounterElement extends LitElement {
  _render(props) {
    return html`
      ${ButtonSharedStyles}
      <style>
        span { width: 20px; display: inline-block; text-align: center; font-weight: bold;}
      </style>
      <div>
        <p>
          Clicked: <span>${props.clicks}</span> times.
          Value is <span>${props.value}</span>.
          <button on-click="${() => this._onIncrement()}" title="Add 1">${plusIcon}</button>
          <button on-click="${() => this._onDecrement()}" title="Minus 1">${minusIcon}</button>
        </p>
      </div>
    `;
  }

  static get properties() { return {
    /* The total number of clicks you've done. */
    clicks: Number,
    /* The current value of the counter. */
    value: Number
  }};

  constructor() {
    super();
    this.clicks = 0;
    this.value = 0;
  }

  _onIncrement() {
    this.value++;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-incremented'));
  }

  _onDecrement() {
    this.value--;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-decremented'));
  }
}

window.customElements.define('counter-element', CounterElement);
