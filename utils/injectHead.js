import { fetchHtml } from './fetchHtml.js'

export async function injectHeadResources(head, baseUrl, targetRoot) {
  if (!head || !targetRoot) return;
  const absBase = new URL(baseUrl, window.location.origin);
  // Inline <style>
  head.querySelectorAll('style').forEach(style => {
    const s = document.createElement('style');
    s.textContent = style.textContent;
    targetRoot.appendChild(s);
  });
  // External stylesheets: fetch and inline into shadow root
  const links = head.querySelectorAll('link[rel="stylesheet"]');
  for (const link of links) {
    const href = new URL(link.getAttribute('href'), absBase).toString();
    try {
      const cssText = await fetchHtml(href);
      const styleEl = document.createElement('style');
      styleEl.textContent = cssText;
      targetRoot.appendChild(styleEl);
    } catch (e) {
      console.error('Failed to load stylesheet', href, e);
    }
  }
}