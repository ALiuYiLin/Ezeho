import { start } from './hooks/start.js';
import { mainInit } from './hooks/mainInit.js';
import { subAppInit } from './hooks/subAppInit.js';
import { subAppMount } from './hooks/subAppMount.js';
import { subAppUnmount } from './hooks/subAppUnmount.js';
import { navigate } from './hooks/navigate.js';

// 暴露 API 便于在控制台或其他模块使用
window.MicroMain = {
  start,
  mainInit,
  subAppInit,
  subAppMount,
  subAppUnmount,
  navigate,
};

// 自动启动
start();