import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from '../src/components/';
import { Provider } from 'react-redux';
import { store } from '/src/store/store.js';

class ChatWidgetElement extends HTMLElement {
  connectedCallback() {
    const orgId = this.getAttribute("data-org");

    const mountPoint = document.createElement("div");
    this.appendChild(mountPoint);

    ReactDOM.createRoot(mountPoint).render(
      <Provider store={store}>
        <ChatWidget orgId={orgId} />
      </Provider>
    );
  }
}

customElements.define('chat-widget', ChatWidgetElement);

document.addEventListener("DOMContentLoaded", () => {
  const el = document.createElement("chat-widget");
  const scriptTag = document.currentScript || document.querySelector('script[data-org]');
  el.setAttribute("data-org", scriptTag?.getAttribute("data-org"));
  document.body.appendChild(el);
});
