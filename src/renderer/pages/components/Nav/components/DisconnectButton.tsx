import { Button } from 'react-bootstrap';

function DisconnectButton({ setDevice }: { setDevice: Function }) {
  return (
    <Button
      className="ms-2"
      onClick={() => {
        setDevice('Connect adapter');
        window.api.ipcRenderer.send('close-device');
      }}
      variant="outline-danger"
    >
      Disconnect
    </Button>
  );
}
export default DisconnectButton;
