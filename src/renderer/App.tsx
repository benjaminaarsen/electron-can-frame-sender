import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import Home from './pages/Home/Home';
import './App.scss';
import Nav from './pages/components/Nav/Nav';

export default function App() {
  return (
    <Router>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
