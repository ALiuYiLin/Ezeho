export const state = {
  container: null,
  currentAppId: null,
};

export function setContainer(el) {
  state.container = el;
}

export function getContainer() {
  return state.container;
}

export function setCurrentAppId(id) {
  state.currentAppId = id;
}

export function getCurrentAppId() {
  return state.currentAppId;
}