export const registry = {
  app1: { path: '/app1', url: '/subApps/app1/index.html' },
  app2: { path: '/app2', url: '/subApps/app2/index.html' },
};

export function getAppById(id) {
  return registry[id] || null;
}

export function getAppIdByPath(pathname) {
  const match = Object.entries(registry).find(([, app]) => app.path === pathname);
  return match ? match[0] : null;
}