export function injectHeadResources(head, baseUrl) {
  if (!head) return;
  head.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    const href = new URL(link.getAttribute('href'), baseUrl).toString();
    if (!document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      document.head.appendChild(l);
    }
  });
  head.querySelectorAll('style').forEach(style => {
    const s = document.createElement('style');
    s.textContent = style.textContent;
    document.head.appendChild(s);
  });
}