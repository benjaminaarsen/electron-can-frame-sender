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
      onClick={async () => {
        const data: DbcData = await window.api.openDbcFile();
        if (!data) return;
        navigate('/dbc');
        setData(data);
      }}
    >
      Open DBC File
    </Button>
  );
}

export default DbcButton;
