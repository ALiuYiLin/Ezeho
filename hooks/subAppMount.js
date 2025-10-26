import { getAppById } from '../utils/registry.js'
import { ensureContainer, ensureShadowRoot } from '../utils/container.js'
import { fetchHtml, parseHtml } from '../utils/fetchHtml.js'
import { injectHeadResources } from '../utils/injectHead.js'
import { executeBodyScripts } from '../utils/executeScripts.js'
import { setCurrentAppId } from '../utils/state.js'
import { subAppUnmount } from './subAppUnmount.js'

export async function subAppMount(appId) {
  const app = getAppById(appId);
  if (!app) {
    subAppUnmount();
    return;
  }

  const container = ensureContainer();
  container.textContent = '加载中…';

  try {
    const html = await fetchHtml(app.url);
    const doc = parseHtml(html);

    const root = ensureShadowRoot();
    // Clear previous content
    root.innerHTML = '';

    await injectHeadResources(doc.head, app.url, root);

    const bodyContent = doc.body ? doc.body.innerHTML : html;
    // Inject body HTML (scripts will not auto-execute)
    const frag = document.createElement('div');
    frag.innerHTML = bodyContent;
    // Remove script tags to prevent duplicates
    frag.querySelectorAll('script').forEach(el => el.remove());
    root.appendChild(frag);

    // Execute scripts within shadow root
    executeBodyScripts(doc.body, app.url, root);

    // Remove loading text on host container
    container.textContent = '';
    setCurrentAppId(appId);
  } catch (err) {
    container.innerHTML = `<p style="color:#d32f2f;">加载失败：${String(err)}</p>`;
    setCurrentAppId(null);
  }
}