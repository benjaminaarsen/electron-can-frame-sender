import { dialog, ipcMain } from 'electron';
// import global from '../../global';
import {
  can,
  updateDevices as _updateDevices,
  getDevices as _getDevices,
  setCurrentDevice,
  getCurrentDevice,
} from '../../util/can';

export module updateDevices {
  ipcMain.on('update-devices', async () => {
    _updateDevices();
  });
}

export module getDevices {
  ipcMain.handle('get-devices', () => {
    return _getDevices();
  });
}

export module openDevice {
  ipcMain.on('open-device', (event, devicePath) => {
    can.open(devicePath).catch((err) => {
      if (getCurrentDevice()) {
        dialog.showErrorBox(
          'Error',
          `${err.message}\n\nMake sure the device is not in use.`,
        );
      }

      // console.log(err);
      setCurrentDevice(devicePath);
    });
  });
}
export module getStatus {
  ipcMain.handle('get-status', async () => {
    const result = await can.isOpen();
    return result;
  });
}
export module getDevice {
  ipcMain.handle('get-device', () => {
    const result = getCurrentDevice();
    return result;
  });
}
export module closeDevice {
  ipcMain.on('close-device', () => {
    can.close();
  });
}
