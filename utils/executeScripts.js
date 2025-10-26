export function executeBodyScripts(body, baseUrl) {
  if (!body) return;
  const scripts = body.querySelectorAll('script');
  scripts.forEach(orig => {
    const s = document.createElement('script');
    [...orig.attributes].forEach(attr => {
      if (attr.name === 'src') {
        s.src = new URL(attr.value, baseUrl).toString();
      } else {
        s.setAttribute(attr.name, attr.value);
      }
    });
    s.textContent = orig.textContent || '';
    document.body.appendChild(s);
  });
}