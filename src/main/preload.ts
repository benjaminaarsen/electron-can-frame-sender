// // Disable no-unused-vars, broken for spread args
// /* eslint no-unused-vars: off */
import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { MessageDataStore } from '../shared/CanDataStore';

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
    ipcRenderer.send('open-dbc-file');
  },
  sendData: (messageData: MessageDataStore) => {
    ipcRenderer.send('send-data', messageData);
  },
  getDbcData: () => {
    const promise = ipcRenderer.invoke('get-dbc-data');
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
  handleResize(func: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      func(...args);
    ipcRenderer.on('resized', subscription);

    return () => {
      ipcRenderer.removeListener('resized', subscription);
    };
  },
  onDbcFileLoaded(func: () => void) {
    const subscription = () => func();
    ipcRenderer.on('dbc-file-loaded', subscription);

    return () => {
      ipcRenderer.removeListener('dbc-file-loaded', subscription);
    };
  },
  onUpdateDevices(func: () => void) {
    const subscription = () => func();
    ipcRenderer.on('update-devices', subscription);

    return () => {
      ipcRenderer.removeListener('update-devices', subscription);
    };
  },
  onDeviceOpened(func: () => void) {
    const subscription = () => func();
    ipcRenderer.on('device-opened', subscription);

    return () => {
      ipcRenderer.removeListener('device-opened', subscription);
    };
  },
  onDeviceClosed(func: () => void) {
    const subscription = () => func();
    ipcRenderer.on('device-closed', subscription);

    return () => {
      ipcRenderer.removeListener('device-closed', subscription);
    };
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
