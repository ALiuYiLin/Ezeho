import { getAppIdByPath } from '../utils/registry.js';
import { subAppInit } from './subAppInit.js';
import { subAppMount } from './subAppMount.js';
import { subAppUnmount } from './subAppUnmount.js';

export async function navigate(pathname) {
  const appId = getAppIdByPath(pathname);
  if (!appId) {
    subAppUnmount();
    return;
  }
  await subAppInit(appId);
  await subAppMount(appId);
}