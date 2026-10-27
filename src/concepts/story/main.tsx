import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/josefin-sans';
import '@fontsource-variable/nunito';
import '../../styles/global.css';
import './story.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
