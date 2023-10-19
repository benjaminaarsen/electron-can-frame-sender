import { Button } from 'react-bootstrap';

function DisconnectButton({ setDevice }: { setDevice: Function }) {
  return (
    <Button
      className="ms-2"
      onClick={() => {
        setDevice('Adapter not connected');
        window.api.closeDevice();
      }}
      variant="outline-danger"
    >
      Disconnect
    </Button>
  );
}
export default DisconnectButton;
