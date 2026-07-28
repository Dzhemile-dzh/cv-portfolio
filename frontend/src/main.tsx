import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log(
  '%cLooking under the hood?',
  'color: #ff4d3a; font-size: 14px; font-weight: bold; background: #141414; padding: 4px 8px;',
);
console.log(
  '%cIf you like what you see, send an email. Dzhemile is open to good opportunities.',
  'color: #0f9d8a; font-size: 12px;',
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
