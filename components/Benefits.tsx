'use client';
import type { ReactNode } from 'react';
import { useSeen } from './useSeen';

const STAGES = ['Структура', 'Дизайн', 'Вёрстка', 'Адаптив', 'Контент', 'Запуск'];
const ICON = { new: '○', ready: '✓', adapt: '↺' } as const;

const svg = (children: ReactNode) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const ITEMS = [
  { title: 'Быстрее', text: 'Готовая структура и дизайн уже разработаны.', icon: svg(<><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5" /><path d="M9.5 2h5" /><path d="M19 6l1.5-1.5" /></>) },
  { title: 'Дешевле', text: 'Не нужно оплачивать разработку сайта с нуля.', icon: svg(<><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18" /><path d="M16 14.5h2" /><path d="M7 3.5h10" /></>) },
  { title: 'Под вашу компанию', text: 'Готовый шаблон адаптируется под конкретный бизнес.', icon: svg(<><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" /><path d="M9 11h.01" /><path d="M15 11h.01" /></>) },
  { title: 'Современно', text: 'Сайты создаются с учётом мобильных устройств и современных стандартов.', icon: svg(<><rect x="2.5" y="4" width="13" height="10" rx="1.8" /><path d="M6 18h6" /><path d="M9 14v4" /><rect x="16.5" y="8" width="5" height="12" rx="1.4" /><path d="M19 17.5h.01" /></>) },
];

export default function Benefits() {
  const [ref, seen] = useSeen<HTMLElement>(0.25);
  const rows = [
    { label: 'Сайт с нуля', note: 'Все этапы разработки', kinds: STAGES.map(() => 'new' as const) },
    { label: 'Готовый сайт', note: 'Только адаптация и запуск', kinds: STAGES.map((_, i) => (i < 4 ? ('ready' as const) : ('adapt' as const))) },
  ];
  return (
    <section id="benefits" ref={ref} className={'section' + (seen ? ' seen' : '')}>
      <div className="sec-head">
        <div>
          <span className="label">Преимущества</span>
          <h2 className="h2">Почему не нужно делать сайт с нуля?</h2>
        </div>
        <p className="lead" style={{ maxWidth: 480 }}>В готовом сайте большая часть этапов уже пройдена. Остаётся наполнить его вашим контентом и запустить.</p>
      </div>

      <div className="card compare">
        {rows.map((r, ri) => (
          <div key={r.label} className="cmp-row">
            <div><b>{r.label}</b><small>{r.note}</small></div>
            <div className="cmp-cells">
              {STAGES.map((s, i) => (
                <div key={s} className={'cmp-cell ' + r.kinds[i]}>
                  <div className="fill" style={{ transitionDelay: ri * 0.5 + i * 0.1 + 's' }} />
                  <span className="tx"><span style={{ flex: 'none' }}>{ICON[r.kinds[i]]}</span><span>{s}</span></span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="legend">
          <span><i style={{ background: 'repeating-linear-gradient(135deg,#2A2925 0 2px,transparent 2px 6px)', border: '1px solid #3A3934' }} />Разрабатывается с нуля</span>
          <span><i style={{ background: '#2A2925' }} />Уже готово в шаблоне</span>
          <span><i style={{ background: '#FF5A1F' }} />Адаптируется под вас</span>
        </div>
      </div>

      <div className="benefits-grid">
        {ITEMS.map((it) => (
          <div key={it.title} className="card benefit">
            <span className="ic">{it.icon}</span>
            <b>{it.title}</b>
            <span>{it.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
