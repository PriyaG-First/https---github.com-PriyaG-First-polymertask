// my-header.js
import { PolymerElement, html } from "@polymer/polymer";

class MyHeader extends PolymerElement {
  static get template() {
    return html`
      <style>
        /* Add your header styles here */
        :host {
          display: block;
          width: 100%;
          background-color: green;
          color: white;
          padding: 10px;
        }
        .header{
          text-align: front;
        }
      </style>
      <div class="header">
        <div>
        <h3>Account details</h3>
        </div>
      </div>
    `
  }
}

customElements.define("my-header", MyHeader);
