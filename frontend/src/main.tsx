import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log(
  '%c👀 Nice. You found the console too.',
  'color: #818cf8; font-size: 14px; font-weight: bold;',
);
console.log(
  '%cThis portfolio has 0 console errors, 0 GitHub links to private client work, and 1 developer who reads DevTools. Hire accordingly.',
  'color: #94a3b8; font-size: 12px;',
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
