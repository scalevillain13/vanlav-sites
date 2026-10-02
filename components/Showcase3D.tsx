'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SITES } from '@/lib/data';
import SitePreview from './SitePreview';

export default function Showcase3D() {
  const sites = SITES;
  const n = sites.length || 1;
  const rootRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1280);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  // карточки витрины монтируем, только когда секция подъезжает к экрану
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = rootRef.current; if (!el) return;
    if (!('IntersectionObserver' in window) || location.hash) { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: '120% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cw = w < 700 ? 230 : w < 1100 ? 320 : 420;
  const R = Math.round((cw / 2 + 18) / Math.tan(Math.PI / n));
  const h = (cw * 11) / 16 + 24;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = rootRef.current, rig = rigRef.current; if (!root || !rig) return;
        const b = root.getBoundingClientRect();
        const span = root.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -b.top / Math.max(1, span)));
        const pos = p * (n - 1);
        const cww = window.innerWidth < 700 ? 230 : window.innerWidth < 1100 ? 320 : 420;
        const RR = Math.round((cww / 2 + 18) / Math.tan(Math.PI / n));
        rig.style.transform = `translateZ(${-RR}px) rotateX(-4deg) rotateY(${-pos * (360 / n)}deg)`;
        if (barRef.current) barRef.current.style.width = p * 100 + '%';
        const a = Math.round(pos);
        if (a !== activeRef.current) { activeRef.current = a; setActive(a); }
      });
    };
    const onResize = () => { setW(window.innerWidth); onScroll(); };
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, [n]);

  const cur = sites[active] || sites[0];

  return (
    <section ref={rootRef} className="showcase" style={{ height: n * 34 + 60 + 'vh' }}>
      <div className="showcase-sticky">
        <div className="showcase-head">
          <div>
            <span className="label">3D-витрина · прокручивайте</span>
            <h2 className="h2">Все шаблоны на одной витрине</h2>
          </div>
          <div className="sc-count"><b>{String(active + 1).padStart(2, '0')}</b><span>/ {n}</span></div>
        </div>

        <div className="sc-stage" style={{ perspective: (w < 700 ? 1100 : 2200) + 'px' }}>
          <div ref={rigRef} className="sc-rig">
            {sites.map((site, i) => (
              <Link key={site.id} href={site.url} className="sc-panel" tabIndex={-1}
                style={{ left: -cw / 2, top: -h / 2, width: cw, transform: `rotateY(${(i * 360) / n}deg) translateZ(${R}px)` }}>
                <div className="browser">
                  <div className="browser-bar">
                    <span className="dots"><i /><i /><i /></span>
                    <small>{site.domain}</small>
                  </div>
                  <div className="shot">{near && <SitePreview site={site} thumb />}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="sc-fade" />
        </div>

        <div className="sc-foot">
          <div className="nm">
            <small>{cur.niche}{cur.live && <span className="live-dot" style={{ marginLeft: 10 }}>Живой сайт</span>}</small>
            <b>{cur.title}</b>
          </div>
          <div className="act">
            <span className="price-pill">{cur.priceLabel}</span>
            <Link href={cur.url} className="btn btn-accent sc-open">Открыть →</Link>
          </div>
          <div className="sc-bar"><div ref={barRef} /></div>
        </div>
      </div>
    </section>
  );
}
