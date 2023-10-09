import Dbc from 'dbc-can';

const dbc = new Dbc();

async function parseDbcFile(path: string) {
  const data = await dbc.load(path);
  return data;
}

export default parseDbcFile;
