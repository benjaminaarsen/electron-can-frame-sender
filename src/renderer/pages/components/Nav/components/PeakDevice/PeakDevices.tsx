import React = require('react');
import { useEffect, useState, JSX } from 'react';
import PeakDevice from './PeakDevice';

function PeakDevices({ setDevice }: { setDevice: React.Dispatch<any> }) {
  const [elements, setElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    window.api.ipcRenderer
      .invoke('list-devices')
      .then((devices: any[]) => {
        const newElements: JSX.Element[] = [];
        devices.forEach((d) => {
          newElements.push(
            <PeakDevice
              setDevice={setDevice}
              key={d.path}
              path={d.path}
              id={d.device_id}
            />,
          );
        });
        return setElements(newElements);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, [setDevice]);
  return elements;
}

export default PeakDevices;
