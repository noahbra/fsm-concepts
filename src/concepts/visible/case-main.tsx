import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/josefin-sans';
import '../../styles/global.css';
import './visible.css';
import { caseStudies } from '../../content/caseStudies';
import { CasePage } from './CasePage';

// Each visible/work/<case>/index.html names its case on the root element; the content comes from content/caseStudies.ts.
const root = document.getElementById('root')!;
const c = caseStudies.find((x) => x.id === root.dataset.case);
if (!c) throw new Error(`Unknown case "${root.dataset.case}"`);
document.title = `${c.school} | Full School Marketing`;

createRoot(root).render(
  <StrictMode>
    <CasePage c={c} />
  </StrictMode>,
);
