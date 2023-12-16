import React, { useEffect, useState, JSX } from 'react';
import { DropdownItem } from 'react-bootstrap';
import PeakDevice from './PeakDevice';

// async function getDevices() {
//   const devices = await window.api.listDevices();
//   return devices;
// }

function PeakDevices({ setDevice }: { setDevice: React.Dispatch<any> }) {
  const [elements, setElements] = useState<JSX.Element[]>([]);

  const refreshPeakDevices = () => {
    window.api
      .getDevices()
      .then((devices) => {
        const el = devices.map((d) => {
          return (
            <PeakDevice key={d.path} path={d.path} setDevice={setDevice} />
          );
        });
        return setElements(el);
      })
      .catch(console.log);
  };
  useEffect(() => {
    refreshPeakDevices();
    return window.api.onUpdateDevices(refreshPeakDevices, []);
  });
  if (elements.length > 0) return elements;
  return <DropdownItem>No devices found.</DropdownItem>;
}

export default PeakDevices;
