import React = require('react');
import { useEffect, useState, JSX } from 'react';
import PeakDevice from './PeakDevice';
import { DropdownItem } from 'react-bootstrap';

// async function getDevices() {
//   const devices = await window.api.listDevices();
//   return devices;
// }

function PeakDevices({ setDevice }: { setDevice: React.Dispatch<any> }) {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  //rerender when return value of window.api.getDevices changes
  useEffect(() => {
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
      .catch((err) => {
        console.log(err);
      });
  });
  if (elements.length > 0) return elements;
  return <DropdownItem>No devices found.</DropdownItem>;
}

export default PeakDevices;
