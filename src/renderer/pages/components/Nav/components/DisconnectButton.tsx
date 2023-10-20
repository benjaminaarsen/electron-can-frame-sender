import { Button } from 'react-bootstrap';

function DisconnectButton({ setDevice }: { setDevice: Function }) {
  return (
    <Button
      className="ms-2"
      onClick={() => {
        setDevice(null);
        window.api.closeDevice();
      }}
      variant="outline-danger"
    >
      Disconnect
    </Button>
  );
}
export default DisconnectButton;
