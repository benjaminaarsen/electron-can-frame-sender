import React = require('react');
import { Dropdown } from 'react-bootstrap';

function PeakDevice({
  setDevice,
  id,
  path,
}: {
  setDevice: React.Dispatch<React.SetStateAction<string | null>>;
  id: string;
  path: string;
}) {
  return (
    <Dropdown.Item
      onClick={() => {
        window.api.ipcRenderer.send('open-device', path);
        setDevice(`PeakCAN id: ${id}`);
      }}
    >
      PeakCAN id: {id}
    </Dropdown.Item>
  );
}

export default PeakDevice;
