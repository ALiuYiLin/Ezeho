import { state, setContainer } from './state.js'

export function ensureContainer() {
  let c = state.container;
  if (!c) {
    c = document.createElement('div');
    c.id = 'micro-container';
    c.style.cssText = 'position:relative;margin-top:24px;border:1px solid #eee;border-radius:8px;min-height:60vh;padding:16px;';
    document.body.appendChild(c);
    setContainer(c);
  }
  return c;
}

export function ensureShadowRoot() {
  const c = ensureContainer();
  if (!c.shadowRoot) {
    c.attachShadow({ mode: 'open' });
  }
  return c.shadowRoot;
}

export function unmountContainer() {
  const c = state.container;
  if (c) {
    c.remove();
    setContainer(null);
  }
}