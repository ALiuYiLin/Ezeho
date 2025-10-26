import { navigate } from './navigate.js';
import { getAppIdByPath } from '../utils/registry.js';

export function mainInit() {
  window.addEventListener('click', onLinkClick);
  window.addEventListener('popstate', () => navigate(window.location.pathname));
}

function onLinkClick(e) {
  const a = e.target.closest('a');
  if (!a) return;
  const url = new URL(a.href, window.location.href);
  if (url.origin === window.location.origin && getAppIdByPath(url.pathname)) {
    e.preventDefault();
    history.pushState({}, '', url.pathname);
    navigate(url.pathname);
  }
}