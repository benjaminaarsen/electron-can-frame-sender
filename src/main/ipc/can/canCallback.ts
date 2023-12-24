/* eslint-disable no-bitwise */
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
    can.open(devicePath).catch((err: Error) => {
      if (getCurrentDevice()) {
        dialog.showErrorBox(
          'Error',
          `${err.message}\n\nMake sure the device is not in use.`,
        );
      }

      // console.log(err);
    });
    setCurrentDevice(devicePath);

    event.sender.send('device-opened');
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
  ipcMain.on('close-device', (event) => {
    can.close();
    event.sender.send('device-closed');
  });
}

const signalDataStoreToBuffer = (signalDataStore: SignalDataStore) => {
  const buf = Buffer.alloc(8);
  let signalsToEightBytes = BigInt(0);

  signalDataStore.forEach((signal) => {
    signalsToEightBytes |=
      BigInt(signal.value) << BigInt(signal.startBit - signal.length + 1);
  });

  // console.log(signalsToEightBytes.toString(2));
  buf.writeBigUInt64BE(signalsToEightBytes);
  return buf;
};

export module sendCanData {
  ipcMain.on('send-data', (event, messageData: MessageDataStore) => {
    // signalDataStoreToBuffer(messageData.entries().next().value[1]);
    messageData.forEach(async (signalDataStore, id) => {
      const buf = signalDataStoreToBuffer(signalDataStore);
      const canData: CanData = {
        id,
        ext: id > 0x7ff,
        buf,
      };
      await sendData(canData);
    });
  });
}

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
