import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import React, { useEffect } from 'react';

import Home from './pages/Home/Home';
import './App.scss';
import Nav from './pages/components/Nav/Nav';
import DbcView from './pages/Home/DbcView/DbcView';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    return window.api.onDbcFileLoaded(() => {
      navigate('/dbc');
    });
  });
  return (
    <>
      <Container fluid className="p-0 z-1">
        <Nav />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dbc" element={<DbcView />} />
      </Routes>
    </>
  );
}
