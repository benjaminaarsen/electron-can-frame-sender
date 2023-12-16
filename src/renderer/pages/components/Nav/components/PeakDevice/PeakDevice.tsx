import React from 'react';
import { Dropdown } from 'react-bootstrap';

function PeakDevice({
  setDevice,
  path,
}: {
  setDevice: React.Dispatch<React.SetStateAction<string | null>>;
  path: string;
}) {
  return (
    <Dropdown.Item
      onClick={() => {
        window.api.openDevice(path);
        setDevice(`PeakCAN handle: ${path}`);
        localStorage.setItem('device', path);
      }}
    >
      PeakCAN handle: {path}
    </Dropdown.Item>
  );
}

export default PeakDevice;
