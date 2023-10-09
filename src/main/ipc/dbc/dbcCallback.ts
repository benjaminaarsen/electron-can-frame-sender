import os from 'os';
import { dialog } from 'electron';
import parseDbcFile from '../../util/dbcParser';
import global from '../../global';

module.exports = {
  openDbcFile: global.ipcMain.handle('open-dbc-file', async () => {
    const filePath = await dialog
      .showOpenDialog({
        properties: ['openFile'],
        filters: [
          { name: 'DBC Files', extensions: ['dbc'] },
          { name: 'All Files', extensions: ['*'] },
        ],
        defaultPath: os.homedir(),
      })
      .then((result) => {
        if (result.canceled) {
          return null;
        }
        return result.filePaths[0];
      });
    if (filePath) {
      const result = parseDbcFile(filePath);
      return result;
    }
    return null;
  }),
};
