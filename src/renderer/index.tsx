import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap';

declare global {
  interface Window {
    api?: any;
  }
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

window.api.ipcRenderer
  .invoke('list-devices')
  .then((ports) => {
    return console.log(ports);
  })
  .catch((err) => {
    console.log(err);
  });
