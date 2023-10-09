import { Button } from 'react-bootstrap';
import getOppositeColor from '../../../../util/getOppositeColor';

function DbcButton() {
  return (
    <Button
      variant={getOppositeColor()}
      onClick={() => {
        window.api.ipcRenderer.invoke('open-dbc-file');
      }}
    >
      Open DBC File
    </Button>
  );
}

export default DbcButton;
