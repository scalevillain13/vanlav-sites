'use client';
import { useSeen } from './useSeen';

// Замер этого сайта в Google Lighthouse (десктоп). Пороги «хорошо» — официальные значения Google.
const SCORES = [
  { v: 100, label: 'Производительность' },
  { v: 100, label: 'Доступность' },
  { v: 100, label: 'Лучшие практики' },
  { v: 100, label: 'SEO' },
];
const VITALS = [
  { name: 'Первая отрисовка', hint: 'FCP — когда появляется первый текст', value: 0.5, shown: '0,5 с', good: 1.8, goodL: '≤ 1,8 с', max: 3 },
  { name: 'Главный экран', hint: 'LCP — когда виден главный блок', value: 0.7, shown: '0,7 с', good: 2.5, goodL: '≤ 2,5 с', max: 4 },
  { name: 'Отклик', hint: 'TBT — сколько страница «подвисает»', value: 0, shown: '0 мс', good: 200, goodL: '≤ 200 мс', max: 600 },
  { name: 'Сдвиг вёрстки', hint: 'CLS — прыгает ли текст при загрузке', value: 0, shown: '0', good: 0.1, goodL: '≤ 0,1', max: 0.25 },
];

export default function Speed() {
  const [ref, seen] = useSeen<HTMLElement>(0.25);
  return (
    <section id="speed" ref={ref} className={'section' + (seen ? ' seen' : '')}>
      <div className="sec-head">
        <div>
          <span className="label">Скорость</span>
          <h2 className="h2">Скорость, которую можно проверить</h2>
        </div>
        <p className="lead">Так этот сайт проходит Google Lighthouse. Ваш собираю по тем же правилам: картинки в WebP, шрифты без задержки, тяжёлое 3D — только когда оно нужно.</p>
      </div>

      <div className="speed-grid">
        {SCORES.map((s) => (
          <div key={s.label} className="gauge">
            <div className="gauge-n">
              <svg viewBox="0 0 100 100" aria-hidden="true"><circle className="track" cx="50" cy="50" r="46" /><circle className="val" cx="50" cy="50" r="46" style={{ strokeDashoffset: seen ? 289 * (1 - s.v / 100) : 289 }} /></svg>
              <b>{s.v}</b>
            </div>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="vitals">
        <div className="vitals-head">
          <span>Ключевые метрики загрузки</span>
          <span><i />зона «хорошо» по Google</span>
        </div>
        {VITALS.map((m) => (
          <div key={m.name} className="vital">
            <div><b>{m.name}</b><small>{m.hint}</small></div>
            <div className="vital-bar" role="img" aria-label={`${m.name}: ${m.shown}, норма ${m.goodL}`}>
              <div className="ok" style={{ width: (m.good / m.max) * 100 + '%' }} data-l={m.goodL} />
              <div className="me" style={{ left: (seen ? Math.max(1.5, (m.value / m.max) * 100) : 100) + '%' }} />
            </div>
            <b>{m.shown}</b>
          </div>
        ))}
      </div>
      <p className="speed-note">Замер десктопной версии этой страницы в Google Lighthouse.</p>
    </section>
  );
}
