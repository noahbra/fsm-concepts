import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/josefin-sans';
import '@fontsource-variable/inter';
import '../../styles/global.css';
import './clean.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
