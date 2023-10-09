import Dbc from 'dbc-can';

const dbc = new Dbc();

function parseDbcFile(path: string) {
  const data = dbc.load(path);
  return data;
}

export default parseDbcFile;
