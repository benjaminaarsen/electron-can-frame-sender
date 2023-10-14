import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './pages/Home/Home';
import './App.scss';
import Nav from './pages/components/Nav/Nav';
import DbcView from './pages/Home/DbcView';

export default function App() {
  return (
    <Router>
      <Container fluid className="p-0 position-fixed z-1">
        <Nav />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dbc" element={<DbcView />} />
      </Routes>
    </Router>
  );
}
