import React = require('react');
import { useEffect, useState, JSX } from 'react';
import PeakDevice from './PeakDevice';

async function getDevices() {
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
    const devices = getDevices();
    const newElements: JSX.Element[] = [];
    devices
      .then((_d: any[]) => {
        Array.from(_d).forEach((d) => {
          newElements.push(
            <PeakDevice setDevice={setDevice} key={d.path} path={d.path} />,
          );
        });
        return setElements(newElements);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, [setDevice]);
  if (elements.length > 0) return elements;
  return 'No devices found.';
}

export default PeakDevices;
