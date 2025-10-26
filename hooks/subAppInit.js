import { getAppById } from '../utils/registry.js';

export async function subAppInit(appId) {
  const app = getAppById(appId);
  if (!app) return false;
  // 可添加预加载、鉴权、依赖检查等
  return true;
}