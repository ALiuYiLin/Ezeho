export async function fetchHtml(url) {
  const res = await fetch(url, { credentials: 'same-origin' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return await res.text();
}

export function parseHtml(html) {
  return new DOMParser().parseFromString(html, 'text/html');
}