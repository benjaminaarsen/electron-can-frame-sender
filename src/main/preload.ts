// // Disable no-unused-vars, broken for spread args
// /* eslint no-unused-vars: off */
import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
// import CanApi from './can_api';

// const can = new CanApi();
const electronHandler = {
  ipcRenderer: {
    send(channel: string, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: string, ...args: unknown[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
};

contextBridge.exposeInMainWorld('api', electronHandler);

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('load-settings', (event, settings: Object) => {
    console.log(settings);

    Object.entries(settings).forEach(([key, value]) => {
      if (typeof value === 'string') {
        try {
          localStorage.setItem(key, value);
          // console.log(localStorage.getItem(key));
          document.documentElement.setAttribute(
            'data-bs-theme',
            localStorage.getItem('theme') || 'light',
          );
        } catch (e) {
          console.error(e);
        }
      }
    });
  });
});
