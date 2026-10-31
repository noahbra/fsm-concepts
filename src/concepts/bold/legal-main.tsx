import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/josefin-sans';
import '../../styles/global.css';
import './bold.css';
import { legalDocs } from '../../content/legal';
import { LegalPage } from './LegalPage';

// bold/terms/index.html and bold/privacy/index.html name their document on the root element; the text is content/legal.ts.
const root = document.getElementById('root')!;
const id = root.dataset.doc as keyof typeof legalDocs | undefined;
const doc = id && legalDocs[id];
if (!doc) throw new Error(`Unknown legal document "${root.dataset.doc}"`);
document.title = `${doc.title} | Full School Marketing`;

createRoot(root).render(
  <StrictMode>
    <LegalPage doc={doc} />
  </StrictMode>,
);
