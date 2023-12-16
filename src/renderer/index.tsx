import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router } from 'react-router-dom';
import React from 'react';
import App from './App';
import 'bootstrap';

declare global {
  interface Window {
    api?: any;
  }
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Router>
    <App />
  </Router>,
);
