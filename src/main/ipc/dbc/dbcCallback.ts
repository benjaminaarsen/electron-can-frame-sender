import os from 'os';
import { dialog, ipcMain } from 'electron';
import parseDbcFile from '../../util/dbcParser';
import {} from 'dbc-can';

export module openDbcFile {
  ipcMain.handle('open-dbc-file', async () => {
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
      console.log(result.messages);
      return result;
    }
    return null;
  });
}
export default openDbcFile;
