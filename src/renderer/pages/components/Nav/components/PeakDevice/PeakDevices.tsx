import React = require('react');
import { useEffect, useState, JSX } from 'react';
import PeakDevice from './PeakDevice';

function getDevices() {
  const res = window.api.ipcRenderer
    .invoke('list-devices')
    .then((devices: any[]) => {
      return devices;
    })
    .catch((err: Error) => {
      console.log(err);
    });
  return res;
}
function PeakDevices({ setDevice }: { setDevice: React.Dispatch<any> }) {
  const [elements, setElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const devices: any[] = getDevices();
    const newElements: JSX.Element[] = [];
    Array.from(devices).forEach((d) => {
      newElements.push(
        <PeakDevice
          setDevice={setDevice}
          key={d.path}
          path={d.path}
          id={d.device_id}
        />,
      );
    });
    setElements(newElements);
  }, [setDevice]);
  return elements;
}

export default PeakDevices;
