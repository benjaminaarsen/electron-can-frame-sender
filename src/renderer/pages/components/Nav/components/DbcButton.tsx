import { Button } from 'react-bootstrap';
import React from 'react';

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
