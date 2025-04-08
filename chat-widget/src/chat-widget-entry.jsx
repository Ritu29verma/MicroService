import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget'; // Make sure this path is correct

class ChatWidgetElement extends HTMLElement {
  connectedCallback() {
    const orgId = this.getAttribute("data-org");

    const mountPoint = document.createElement("div");
    this.appendChild(mountPoint);

    ReactDOM.createRoot(mountPoint).render(
      <ChatWidget orgId={orgId} />
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
