import { unmountContainer } from '../utils/container.js';
import { setCurrentAppId } from '../utils/state.js';

export function subAppUnmount() {
  unmountContainer();
  setCurrentAppId(null);
}