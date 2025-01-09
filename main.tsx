// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Główny komponent aplikacji

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement); // Sprawdzamy, czy element o id "app" istnieje w HTML
root.render(<App />);
