import { IpcMain } from 'electron';

interface Global {
  ipcMain: IpcMain;
}

declare const global: Global;

export default global;
