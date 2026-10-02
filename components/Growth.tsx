'use client';
import { useEffect, useRef } from 'react';
import { useSeen } from './useSeen';
import { Sparkle, GlowArrow, Circuit } from './Glow';

/**
 * «Сайт, который продаёт»: что меняет современный сайт — заявки, конверсия, средний чек,
 * посещаемость. Цифры — из исследования Deloitte и Google «Milliseconds Make Millions» (2020):
 * эффект ускорения мобильного сайта всего на 0,1 секунды. График — иллюстрация динамики.
 */
const METRICS = [
  { v: 21.6, label: 'больше заявок', hint: 'доходят до отправки формы — сайты услуг' },
  { v: 8.4, label: 'выше конверсия', hint: 'покупок из тех же посетителей — магазины' },
  { v: 9.2, label: 'выше средний чек', hint: 'средняя сумма заказа — магазины' },
  { v: 8.3, label: 'меньше отказов', hint: 'уходов с первой страницы — сайты услуг, телефон', minus: true },
];
const REASONS = [
  { t: 'Больше посетителей', d: 'Яндекс и Google выше показывают быстрые, удобные с телефона сайты с понятной структурой.', icon: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></> },
  { t: 'Больше заявок', d: 'Цены на виду, кнопка всегда под рукой, форма в два поля. Человек не ищет, как заказать.', icon: <><path d="M4 4h16v12H8l-4 4Z" /><path d="M8 9h8M8 12h5" /></> },
  { t: 'Выше чек', d: 'Сайту, который выглядит дорого, доверяют — и спокойнее выбирают услугу подороже.', icon: <><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></> },
  { t: 'Меньше потерь', d: 'Заявка приходит в Telegram за секунду — вы перезваниваете, пока клиент не ушёл к другим.', icon: <><path d="M21 4 10.5 14.5" /><path d="M21 4 14.5 21l-4-6.5L4 10.5z" /></> },
];
const fmt = (n: number) => n.toFixed(1).replace('.', ',');

// иллюстративные точки графика: до запуска — ровно, после — рост
const OLD = [62, 60, 64, 61, 63, 59, 62, 60, 61, 63, 60, 62];
const NEW = [62, 60, 64, 61, 63, 59, 70, 84, 101, 118, 131, 146];
const W = 640, H = 300, PAD = 24;
const xy = (arr: number[]) => arr.map((v, i) => [PAD + (i * (W - PAD * 2)) / (arr.length - 1), H - PAD - (v / 160) * (H - PAD * 2)] as const);
const smooth = (pts: readonly (readonly [number, number])[]) => pts.reduce((d, [x, y], i, a) => {
  if (!i) return `M ${x} ${y}`;
  const [px, py] = a[i - 1]; const mx = (px + x) / 2;
  return d + ` C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`;
}, '');

export default function Growth() {
  const [ref, seen] = useSeen<HTMLElement>(0.2);
  const numRefs = useRef<(HTMLElement | null)[]>([]);
  const pOld = smooth(xy(OLD)), pNew = smooth(xy(NEW));
  const last = xy(NEW)[NEW.length - 1];
  const launchX = xy(NEW)[5][0];

  useEffect(() => {
    if (!seen) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const x = still ? 1 : Math.min(1, (t - t0) / 1800), k = 1 - Math.pow(1 - x, 3);
      METRICS.forEach((m, i) => { const el = numRefs.current[i]; if (el) el.textContent = fmt(m.v * k); });
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen]);

  return (
    <section id="growth" ref={ref} className={'section growth' + (seen ? ' seen' : '')} aria-labelledby="growth-h">
      <div className="sec-head">
        <div>
          <span className="label">Результат</span>
          <h2 id="growth-h" className="h2">Сайт, который продаёт, а не просто висит</h2>
        </div>
        <p className="lead">Современный сайт — это продавец, который работает круглосуточно. Он приводит людей из поиска, убеждает и превращает посетителей в заявки.</p>
      </div>

      <div className="gr-top">
        <div className="gr-chart">
          <div className="gc-head">
            <span>Заявки с сайта по месяцам</span>
            <span className="gc-leg"><i className="o" />старый сайт <i className="n" />новый сайт</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="gc-svg" role="img" aria-label="Иллюстрация: после запуска нового сайта число заявок растёт, старый сайт остаётся на одном уровне">
            <defs>
              <linearGradient id="gc-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF5A1F" stopOpacity=".38" /><stop offset="1" stopColor="#FF5A1F" stopOpacity="0" /></linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => <line key={i} x1={PAD} x2={W - PAD} y1={PAD + i * ((H - PAD * 2) / 3)} y2={PAD + i * ((H - PAD * 2) / 3)} className="gc-grid" />)}
            <line x1={launchX} x2={launchX} y1={PAD - 6} y2={H - PAD} className="gc-launch" />
            <path d={pNew + ` L ${W - PAD} ${H - PAD} L ${PAD} ${H - PAD} Z`} className="gc-area" fill="url(#gc-fill)" />
            <path d={pOld} className="gc-old" pathLength={1} />
            <path d={pNew} className="gc-new" pathLength={1} />
            <circle cx={last[0]} cy={last[1]} r="6" className="gc-dot" />
            <circle cx={last[0]} cy={last[1]} r="6" className="gc-ping" />
          </svg>
          <div className="gc-months" aria-hidden="true">{['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'].map((m) => <span key={m}>{m}</span>)}</div>
          <span className="gc-note hand" style={{ left: `calc(${(launchX / W) * 100}% + 10px)` }}>запустили новый сайт</span>
          <GlowArrow kind="curve" className="gc-arrow" />
          <Sparkle size={26} style={{ left: `calc(${(last[0] / W) * 100}% - 13px)`, top: `calc(${(last[1] / H) * 100}% + 18px)` }} />
          <small className="gc-cap">Иллюстрация типичной динамики. Реальный рост зависит от ниши, рекламы и спроса.</small>
        </div>

        <div className="gr-metrics">
          {METRICS.map((m, i) => (
            <div key={m.label} className="gm" style={{ ['--i' as string]: i }}>
              <b><span className="sg">{m.minus ? '−' : '+'}</span><span ref={(el) => { numRefs.current[i] = el; }}>{fmt(m.v)}</span>%</b>
              <span>{m.label}</span>
              <small>{m.hint}</small>
              <i className="gm-bar"><i style={{ width: seen ? Math.min(100, m.v * 4.2) + '%' : '0%' }} /></i>
            </div>
          ))}
          <p className="gm-src">…если ускорить мобильный сайт всего на <b>0,1 секунды</b>. Deloitte и Google, «Milliseconds Make Millions», 2020: замеры мобильных сайтов в Европе и США.</p>
        </div>
      </div>

      <div className="gr-reasons">
        <Circuit className="gr-circuit" variant={3} />
        {REASONS.map((r, i) => (
          <div key={r.t} className="gr-r" style={{ ['--i' as string]: i }}>
            <span className="gr-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{r.icon}</svg></span>
            <b>{r.t}</b>
            <p>{r.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
