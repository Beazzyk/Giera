import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Usuwamy .tsx, ponieważ TypeScript automatycznie rozpozna pliki .tsx
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
