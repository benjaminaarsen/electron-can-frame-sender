import { DbcData } from 'candied/lib/dbc/Dbc';

let data: DbcData;

export function setData(newData: DbcData) {
  data = newData;
  console.log(data);
}

function DbcView() {
  return (
    <div>
      <h1>DBC View</h1>
    </div>
  );
}

export default DbcView;
