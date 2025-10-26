export function executeBodyScripts(body, baseUrl, targetRoot) {
  if (!body || !targetRoot) return;
  const absBase = new URL(baseUrl, window.location.origin);
  const scripts = body.querySelectorAll('script');
  scripts.forEach(orig => {
    const s = document.createElement('script');
    [...orig.attributes].forEach(attr => {
      if (attr.name === 'src') {
        s.src = new URL(attr.value, absBase).toString();
      } else {
        s.setAttribute(attr.name, attr.value);
      }
    });
    s.textContent = orig.textContent || '';
    targetRoot.appendChild(s);
  });
}