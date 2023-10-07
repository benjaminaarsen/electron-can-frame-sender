import Can from '@csllc/cs-pcan-usb';
import { IpcMainEvent } from 'electron';

const can = new Can({
  canRate: 250000,
});

module.exports = {
  canCallback: global.ipcMain.on('list-devices', (event: IpcMainEvent) => {
    can
      .list()
      .then((ports: any) => {
        return event.reply('list-devices-response', ports);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }),
};
