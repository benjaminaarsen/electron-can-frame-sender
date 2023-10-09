import { Dbc } from 'candied';

const dbc = new Dbc();
import dbcReader from 'candied/lib/filesystem/DbcReader';

function parseDbcFile(path: string) {
  const fileData = dbcReader(path);
  const data = dbc.load(fileData);
  console.log(data);
  return data;
}

export default parseDbcFile;
