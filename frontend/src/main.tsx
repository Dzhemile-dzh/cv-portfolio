import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log(
  '%cYou opened the console. Bold move.',
  'color: #ff4d3a; font-size: 14px; font-weight: bold; background: #141414; padding: 4px 8px;',
);
console.log(
  '%cThis site has personality, PHP, and exactly zero indigo glassmorphism. Hire the human, not the template.',
  'color: #0f9d8a; font-size: 12px;',
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
