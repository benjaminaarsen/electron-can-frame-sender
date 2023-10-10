import { Button } from 'react-bootstrap';
import { DbcData } from 'candied/lib/dbc/Dbc';
import getOppositeColor from '../../../../util/getOppositeColor';
import { setData } from '../../../Home/DbcView';

function DbcButton() {
  return (
    <Button
      variant={getOppositeColor()}
      onClick={() => {
        window.api.ipcRenderer
          .invoke('open-dbc-file')
          .then((data: DbcData) => {
            console.log(data);
            return setData(data);
          })
          .catch((err: Error) => {
            console.log(err);
          });
      }}
    >
      Open DBC File
    </Button>
  );
}

export default DbcButton;
