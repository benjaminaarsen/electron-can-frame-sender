import { dialog } from 'electron';
import global from '../../global';
import can from '../../util/can';

module.exports = {
  listDevices: global.ipcMain.handle('list-devices', async () => {
    const result = await can.list();
    return result;
  }),
  openDevice: global.ipcMain.on('open-device', (event, devicePath) => {
    can.open(devicePath).catch((err) => {
      dialog.showErrorBox(
        'Error',
        `${err.message}\n\nMake sure the device is not in use.`,
      );
      // console.log(err);
    });
  }),
  getStatus: global.ipcMain.handle('get-status', () => {
    const result = can.isOpen();
    return result;
  }),
  closeDevice: global.ipcMain.on('close-device', () => {
    can.close();
  }),
};
