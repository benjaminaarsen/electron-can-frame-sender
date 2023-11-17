import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Home from './pages/Home/Home';
import './App.scss';
import Nav from './pages/components/Nav/Nav';
import DbcView from './pages/Home/DbcView';

export default function App() {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const currentDevice = await window.api.getCurrentDevice();
      if (currentDevice) {
        setDevice(currentDevice);
        setLoading(false);
        return;
      }
      await window.api.updateDevices();
      window.api
        .getDevices()
        .then((devices) => {
          if (devices.length === 0) {
            setLoading(false);
            setDevice(null);
            return;
          }
          devices.forEach((d: any) => {
            if (d.path === parseInt(localStorage.getItem('device') || '', 10)) {
              window.api.openDevice(d.path);
              setDevice(d.path);
              setLoading(false);
            }
          });
          return;
        })
        .catch(console.log);
    })();
  });

  useEffect(() => {
    window.api.onDbcFileLoaded(() => {
      console.log('DBC file loaded');
      navigate('/dbc');
    });
  });
  if (loading) return null;
  return (
    <>
      <Container fluid className="p-0 position-fixed z-1">
        <Nav Initdevice={device} />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dbc" element={<DbcView />} />
      </Routes>
    </>
  );
}
