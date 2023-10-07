import { IpcMain } from 'electron';

declare global {
  const ipcMain: IpcMain;
}

export {};
