import { getAppById } from '../utils/registry.js';
import { ensureContainer } from '../utils/container.js';
import { fetchHtml, parseHtml } from '../utils/fetchHtml.js';
import { injectHeadResources } from '../utils/injectHead.js';
import { executeBodyScripts } from '../utils/executeScripts.js';
import { setCurrentAppId } from '../utils/state.js';
import { subAppUnmount } from './subAppUnmount.js';

export async function subAppMount(appId) {
  const app = getAppById(appId);
  if (!app) {
    subAppUnmount();
    return;
  }

  const container = ensureContainer();
  container.innerHTML = '加载中…';

  try {
    const html = await fetchHtml(app.url);
    const doc = parseHtml(html);

    injectHeadResources(doc.head, app.url);
    const bodyContent = doc.body ? doc.body.innerHTML : html;
    container.innerHTML = bodyContent;
    executeBodyScripts(doc.body, app.url);

    setCurrentAppId(appId);
  } catch (err) {
    container.innerHTML = `<p style="color:#d32f2f;">加载失败：${String(err)}</p>`;
    setCurrentAppId(null);
  }
}