// // Disable no-unused-vars, broken for spread args
// /* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
// import CanApi from './can_api';

// const can = new CanApi();
// const electronHandler = {
//   ipcRenderer: {
//     send(channel: string, ...args: unknown[]) {
//       ipcRenderer.send(channel, ...args);
//     },
//     on(channel: string, func: (...args: unknown[]) => void) {
//       const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
//         func(...args);
//       ipcRenderer.on(channel, subscription);

//       return () => {
//         ipcRenderer.removeListener(channel, subscription);
//       };
//     },
//     once(channel: string, func: (...args: unknown[]) => void) {
//       ipcRenderer.once(channel, (_event, ...args) => func(...args));
//     },
//     invoke(channel: string, ...args: unknown[]) {
//       return ipcRenderer.invoke(channel, ...args);
//     },
//   },
// };

const WINDOW_API = {
  openDevice: (devicePath: string) => {
    ipcRenderer.send('open-device', devicePath);
  },
  minimizeApp: () => {
    ipcRenderer.send('minimize-app');
  },
  maximizeApp: () => {
    ipcRenderer.send('maximize-app');
  },
  unmaximizeApp: () => {
    ipcRenderer.send('unmaximize-app');
  },
  isMaximized: () => {
    const promise = ipcRenderer.invoke('is-maximized');
    return promise;
  },
  closeApp: () => {
    ipcRenderer.send('close-app');
  },
  saveSettings: (localStorage: Storage) => {
    ipcRenderer.send('save-settings', localStorage);
  },
  closeDevice: () => {
    ipcRenderer.send('close-device');
  },
  openDbcFile: () => {
    const promise = ipcRenderer.invoke('open-dbc-file');
    return promise;
  },
  updateDevices: () => {
    ipcRenderer.send('update-devices');
  },
  getDevices: () => {
    const promise = ipcRenderer.invoke('get-devices');
    return promise;
  },
  getStatus: () => {
    const promise = ipcRenderer.invoke('get-status');
    return promise;
  },
  getCurrentDevice: () => {
    const promise = ipcRenderer.invoke('get-device');
    return promise;
  },
};
// contextBridge.exposeInMainWorld('api', electronHandler);
contextBridge.exposeInMainWorld('api', WINDOW_API);

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('load-settings', (event, settings: Object) => {
    // console.log(settings);

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
