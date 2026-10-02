'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

// Кадры — фрагменты реальных экранов живых сайтов из каталога
const SHOTS = [
  { src: 'lume-hero', site: 'lume', title: 'Lumé Studio', what: 'Первый экран', w: 580, h: 776 },
  { src: 'napor-pipe', site: 'napor', title: 'НАПОР', what: 'Если течёт прямо сейчас', w: 862, h: 708, kind: 'wide' },
  { src: 'briz-hero', site: 'briz', title: 'Бриз', what: 'Первый экран', w: 256, h: 290, kind: 'tall' },
  { src: 'lume-master', site: 'lume', title: 'Lumé Studio', what: 'Мастера', w: 554, h: 738 },
  { src: 'napor-master', site: 'napor', title: 'НАПОР', what: 'Мастера в штате', w: 800, h: 626, kind: 'wide' },
  { src: 'briz-room', site: 'briz', title: 'Бриз', what: 'Объекты за месяц', w: 340, h: 382, kind: 'tall' },
  { src: 'lume-before', site: 'lume', title: 'Lumé Studio', what: 'Слайдер «до и после»', w: 866, h: 981 },
  { src: 'napor-tools', site: 'napor', title: 'НАПОР', what: 'Оборудование мастера', w: 668, h: 596, kind: 'wide' },
  { src: 'briz-team', site: 'briz', title: 'Бриз', what: 'Команда', w: 260, h: 320, kind: 'tall' },
  { src: 'lume-mask', site: 'lume', title: 'Lumé Studio', what: 'Галерея студии', w: 423, h: 530 },
  { src: 'lume-oil', site: 'lume', title: 'Lumé Studio', what: 'Косметика', w: 422, h: 315, kind: 'wide' },
];

export default function Shots() {
  const trackRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.shot-card'));
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    // наклон и параллакс внутри кадра зависят от положения карточки относительно центра ленты
    const update = () => {
      raf = 0;
      const vw = track.clientWidth, c = vw / 2;
      if (!still) cards.forEach((el) => {
        const r = el.offsetLeft - track.scrollLeft + el.offsetWidth / 2;
        const d = Math.max(-1.2, Math.min(1.2, (r - c) / vw));
        el.style.setProperty('--ry', (-d * 10).toFixed(2) + 'deg');
        el.style.setProperty('--px', (-d * 7).toFixed(2) + '%');
      });
      const max = track.scrollWidth - vw;
      footRef.current?.style.setProperty('--p', String(max > 0 ? track.scrollLeft / max : 0));
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };

    // мышью ленту можно тянуть (на телефоне она листается пальцем сама)
    let down = false, moved = false, sx = 0, sl = 0;
    const onDown = (e: PointerEvent) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('drag'); }
      if (moved) track.scrollLeft = sl - dx;
    };
    const onUp = () => { if (!down) return; down = false; track.classList.remove('drag'); };
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };

    track.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    track.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    track.addEventListener('click', onClick, true);
    update();
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', req); window.removeEventListener('resize', req);
      track.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp);
      track.removeEventListener('click', onClick, true);
    };
  }, []);

  return (
    <section id="shots" className="shots" aria-labelledby="shots-h">
      <div className="shots-head sec-head">
        <div>
          <span className="label">Кадры из проектов</span>
          <h2 id="shots-h" className="h2">Живые сайты крупным планом</h2>
        </div>
        <p className="lead">Фрагменты трёх сайтов, которые уже работают. Листайте ленту — каждый кадр ведёт на страницу проекта.</p>
      </div>
      <div ref={trackRef} className="shots-track">
        {SHOTS.map((s) => (
          <Link key={s.src} href={'/templates/' + s.site} className={'shot-card' + (s.kind ? ' ' + s.kind : '')} draggable={false}>
            <figure style={{ margin: 0 }}>
              <div className="shot-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={'/shots/' + s.src + '.webp'} alt={`${s.title}: ${s.what.toLowerCase()}`} width={s.w} height={s.h} loading="lazy" decoding="async" draggable={false} />
              </div>
              <figcaption><b>{s.title}</b><span>{s.what}</span></figcaption>
            </figure>
          </Link>
        ))}
      </div>
      <div ref={footRef} className="shots-foot"><span>{SHOTS.length} кадров</span><div className="shots-bar"><i /></div></div>
    </section>
  );
}
