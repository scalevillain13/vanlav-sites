'use client';
import { useEffect } from 'react';

/**
 * Рукописный шрифт Caveat (пометки, аннотации) — чисто декоративный, поэтому грузится после
 * загрузки страницы и не мешает первой отрисовке. До этого пометки показываются системным
 * рукописным/курсивным шрифтом.
 */
const FACES = [
  { file: 'caveat-cyrillic-700', range: 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116' },
  { file: 'caveat-latin-700', range: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD' },
];

export default function LazyFonts() {
  useEffect(() => {
    if (typeof FontFace === 'undefined' || !document.fonts) return;
    let done = false;
    const go = () => {
      if (done) return; done = true;
      FACES.forEach(({ file, range }) => {
        const f = new FontFace('Caveat', `url(/fonts/${file}.woff2) format('woff2')`, { weight: '700', style: 'normal', display: 'swap', unicodeRange: range });
        f.load().then((ff) => document.fonts.add(ff)).catch(() => {});
      });
    };
    const start = () => setTimeout(go, 300);
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
    // если человек начал листать раньше — грузим сразу
    window.addEventListener('scroll', go, { once: true, passive: true });
    return () => window.removeEventListener('scroll', go);
  }, []);
  return null;
}
