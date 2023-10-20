import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Home from './pages/Home/Home';
import './App.scss';
import Nav from './pages/components/Nav/Nav';
import DbcView from './pages/Home/DbcView';

export default function App() {
  const [device, setDevice] = useState(null);
  useEffect(() => {
    (async () => {
      const currentDevice = await window.api.getCurrentDevice();
      if (currentDevice) {
        setDevice(currentDevice);
        return;
      }
      await window.api.updateDevices();
      const devices = await window.api.getDevices();
      devices.forEach((d: any) => {
        if (d.path === parseInt(localStorage.getItem('device') || '', 10)) {
          window.api.openDevice(d.path);
          setDevice(d.path);
        }
      });
    })();
  });
  return (
    <Router>
      <Container fluid className="p-0 position-fixed z-1">
        <Nav Initdevice={device} />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dbc" element={<DbcView />} />
      </Routes>
    </Router>
  );
}
