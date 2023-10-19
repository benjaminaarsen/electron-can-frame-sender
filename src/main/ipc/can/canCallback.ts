import { dialog, ipcMain } from 'electron';
// import global from '../../global';
import {
  updateDevices as _updateDevices,
  getDevices as _getDevices,
} from '../../devices';
import can from '../../util/can';

export module updateDevices {
  ipcMain.on('update-devices', async () => {
    const result = await can.list();
    console.log(result);
    // update local devices list
    const newDevices: any[] = [];
    result.forEach((device: any) => {
      newDevices.push(device);
    });
    _updateDevices(newDevices);
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
      dialog.showErrorBox(
        'Error',
        `${err.message}\n\nMake sure the device is not in use.`,
      );
      // console.log(err);
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
  ipcMain.handle('get-device', async () => {
    const result = can.getPort();
    return result;
  });
}
export module closeDevice {
  ipcMain.on('close-device', () => {
    can.close();
  });
}
