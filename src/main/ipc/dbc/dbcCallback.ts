import os from 'os';
import { dialog, ipcMain } from 'electron';
import { DbcData } from 'dbc-can/lib/dbc/Dbc';
import parseDbcFile from '../../util/dbcParser';
import {} from 'dbc-can';

let dbcData: DbcData | null = null;

module openDbcFile {
  ipcMain.on('open-dbc-file', async () => {
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
      const result = await parseDbcFile(filePath);
      dbcData = result;
    }
    return null;
  });

  ipcMain.handle('get-dbc-data', async () => {
    return dbcData;
  });
}
export default openDbcFile;
