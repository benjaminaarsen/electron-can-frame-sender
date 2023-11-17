import { Button } from 'react-bootstrap';

function DbcButton() {
  return (
    <Button
      variant="primary"
      onClick={() => {
        window.api.openDbcFile();
      }}
    >
      Open DBC File
    </Button>
  );
}

export default DbcButton;
