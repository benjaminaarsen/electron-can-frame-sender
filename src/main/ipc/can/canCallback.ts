import { dialog, ipcMain } from 'electron';
// import global from '../../global';
import can from '../../util/can';

export module listDevices {
  ipcMain.handle('list-devices', async () => {
    const result = await can.list();
    return result;
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
