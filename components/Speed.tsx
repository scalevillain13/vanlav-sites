'use client';
import { useEffect, useRef } from 'react';
import { useSeen } from './useSeen';
import { Note } from './Doodle';
import LazyVis from './LazyVis';
import SPEED from '@/lib/speed.json';

// Замер этой страницы в Google Lighthouse (десктоп): баллы, метрики и кадры загрузки — из отчёта.
// Пороги «хорошо» — официальные значения Google для Core Web Vitals / Lighthouse.
const LABELS: Record<string, string> = { performance: 'Производительность', accessibility: 'Доступность', 'best-practices': 'Лучшие практики', seo: 'SEO' };
const VITALS = [
  { key: 'fcp', name: 'Первая отрисовка', hint: 'FCP — когда появляется первый текст', good: 1.8, max: 3, unit: 'с', goodL: '≤ 1,8 с' },
  { key: 'lcp', name: 'Главный экран', hint: 'LCP — когда виден главный блок', good: 2.5, max: 4, unit: 'с', goodL: '≤ 2,5 с' },
  { key: 'tbt', name: 'Отклик', hint: 'TBT — сколько страница «подвисает»', good: 200, max: 600, unit: 'мс', goodL: '≤ 200 мс' },
  { key: 'cls', name: 'Сдвиг вёрстки', hint: 'CLS — прыгает ли текст при загрузке', good: 0.1, max: 0.25, unit: '', goodL: '≤ 0,1' },
] as const;
const fmt = (v: number, unit: string) => (unit === 'мс' ? Math.round(v) + ' мс' : unit === 'с' ? v.toFixed(1).replace('.', ',') + ' с' : v.toFixed(2).replace('.', ',').replace(/,?0+$/, '') || '0');

export default function Speed() {
  const [ref, seen] = useSeen<HTMLElement>(0.2);
  const numRefs = useRef<(HTMLElement | null)[]>([]);
  const vitRefs = useRef<(HTMLElement | null)[]>([]);
  const scores = Object.entries(SPEED.scores) as [string, number][];
  const vit = SPEED.vitals as Record<string, number>;

  // счётчики: баллы растут от 0, метрики «падают» от максимума шкалы к реальному значению
  useEffect(() => {
    if (!seen) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0; const t0 = performance.now();
    const step = (t: number) => {
      const x = still ? 1 : Math.min(1, (t - t0) / 1800), k = 1 - Math.pow(1 - x, 4);
      scores.forEach(([, v], i) => { const el = numRefs.current[i]; const kk = Math.max(0, Math.min(1, k * 1.12 - i * 0.04)); if (el) el.textContent = String(Math.round(v * kk)); });
      VITALS.forEach((m, i) => { const el = vitRefs.current[i]; if (el) el.textContent = fmt(m.max + (vit[m.key] - m.max) * k, m.unit); });
      if (x < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="speed" ref={ref} className={'section speed' + (seen ? ' seen' : '')}>
      <div className="sec-head">
        <div>
          <span className="label">Скорость</span>
          <h2 className="h2">Скорость, которую можно проверить</h2>
        </div>
        <p className="lead">Так эта страница проходит Google Lighthouse. Ваш сайт собираю по тем же правилам: картинки в WebP, шрифты без задержки, тяжёлое 3D — только когда оно нужно.</p>
      </div>

      <div className="speed-grid">
        {scores.map(([k, v], i) => (
          <div key={k} className="gauge" style={{ ['--i' as string]: i }}>
            <div className="gauge-n">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <defs><linearGradient id={'gg' + i} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8BF0B0" /><stop offset="1" stopColor="#2FB566" /></linearGradient></defs>
                <circle className="track" cx="50" cy="50" r="44" />
                <circle className="ticks" cx="50" cy="50" r="48.5" />
                <circle className="val" cx="50" cy="50" r="44" stroke={`url(#gg${i})`} style={{ strokeDashoffset: seen ? 276.5 * (1 - v / 100) : 276.5 }} />
              </svg>
              <b ref={(el) => { numRefs.current[i] = el; }}>{v}</b>
              <span className="pulse" aria-hidden="true" />
            </div>
            <span>{LABELS[k] || k}</span>
          </div>
        ))}
      </div>

      <div className="speed-row">
        <div className="vitals">
          <div className="vitals-head">
            <span>Ключевые метрики загрузки</span>
            <span><i />зона «хорошо» по Google</span>
          </div>
          {VITALS.map((m, i) => {
            const v = vit[m.key];
            const pos = Math.max(1.5, (v / m.max) * 100);
            return (
              <div key={m.key} className="vital" style={{ ['--i' as string]: i }}>
                <div><b>{m.name}</b><small>{m.hint}</small></div>
                <div className="vital-bar" role="img" aria-label={`${m.name}: ${fmt(v, m.unit)}, норма ${m.goodL}`}>
                  <div className="ok" style={{ width: (m.good / m.max) * 100 + '%' }} data-l={m.goodL} />
                  <div className="trail" style={{ left: pos + '%' }} />
                  <div className="me" style={{ left: (seen ? pos : 100) + '%' }} />
                </div>
                <b ref={(el) => { vitRefs.current[i] = el; }}>{fmt(v, m.unit)}</b>
              </div>
            );
          })}
        </div>

        <div className="film">
          <div className="film-head"><span>Как загружается эта страница</span><small>кадры из отчёта Lighthouse</small></div>
          <LazyVis className="film-strip" ariaHidden={false}>
            {SPEED.frames.map((f, i) => (
              <figure key={f.src} style={{ ['--i' as string]: i }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={`Кадр загрузки на ${f.t} мс`} width={250} height={174} loading="lazy" decoding="async" />
                <figcaption>{(f.t / 1000).toFixed(1).replace('.', ',')} с</figcaption>
              </figure>
            ))}
            <span className="playhead" aria-hidden="true" />
          </LazyVis>
          <Note className="film-note hide-m" rot={-4}>меньше секунды — и всё на месте</Note>
        </div>
      </div>
      <p className="speed-note">Замер десктопной версии этой страницы в Google Lighthouse.</p>
    </section>
  );
}
