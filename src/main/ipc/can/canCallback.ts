import { dialog, ipcMain } from 'electron';
// import global from '../../global';
import {
  can,
  updateDevices as _updateDevices,
  getDevices as _getDevices,
  setCurrentDevice,
  getCurrentDevice,
  sendData,
  CanData,
} from '../../util/can';
import {
  MessageDataStore,
  SignalDataStore,
} from '../../../shared/CanDataStore';
import messageDataStore from '../../../renderer/pages/Home/DbcView/MessageData';

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

// export module sendCanData {
//   ipcMain.on('send-data', (event, messageData: MessageDataStore) => {
//     // messageData.forEach((signals: SignalDataStore, id: number) => {
//     //   const data: CanData = {
//     //     id,
//     //     ext: id > 0x7ff,
//     //     buf: Buffer.from(signals.map((signal) => signal.value)),
//     //   };
//     //   sendData(data);
//     // });
//   });
// }

// const messageDataStoreToCanData = (messageDataStore: MessageDataStore) => {
//   const canData: CanData[] = [];
//   messageDataStore.forEach((signals: SignalDataStore, id: number) => {
//     const data: CanData = {
//       id,
//       ext: id > 0x7ff,
//     };
//     signals.forEach((signal) => {
//       data.buf = Buffer.
//     });
//     canData.push(data);
//   });
//   return canData;
// }

// const SignalDataStoreToBuffer = (signalDataStore: SignalDataStore) => {
//   const buf = Buffer.alloc(8);
//   // some signals only use 1 bit, so we need to keep track of the bit offset, but the buffer uses byte offset
//   let bitOffset = 0;

//   return buf;
// }
