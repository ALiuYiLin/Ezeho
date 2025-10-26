import { mainInit } from './mainInit.js';
import { navigate } from './navigate.js';

export function start() {
  mainInit();
  navigate(window.location.pathname);
}