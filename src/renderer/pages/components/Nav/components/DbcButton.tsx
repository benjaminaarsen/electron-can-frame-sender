import { Button } from 'react-bootstrap';

import { DbcData } from 'dbc-can/lib/dbc/Dbc';
import { useNavigate } from 'react-router-dom';
import getOppositeColor from '../../../../util/getOppositeColor';
import { setData } from '../../../Home/DbcView';

function DbcButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant={getOppositeColor()}
      onClick={() => {
        window.api.ipcRenderer
          .invoke('open-dbc-file')
          .then((data: DbcData) => {
            navigate('/dbc');
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
