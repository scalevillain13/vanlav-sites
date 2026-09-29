'use client';
import { useState } from 'react';
import { CATEGORIES, SITES } from '@/lib/data';
import SiteCard from './SiteCard';

const plural = (n: number) =>
  n % 10 === 1 && n % 100 !== 11 ? 'шаблон' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'шаблона' : 'шаблонов';

export default function Catalog() {
  const [active, setActive] = useState('Все');
  const shown = active === 'Все' ? SITES : SITES.filter((s) => s.group === active);
  return (
    <section id="catalog" className="section" style={{ paddingTop: 'clamp(80px,10vw,140px)' }}>
      <div className="sec-head" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))' }}>
        <div>
          <span className="label">Каталог шаблонов</span>
          <h2 className="h2">Выберите готовый сайт</h2>
        </div>
        <p className="lead">Не нужно начинать с пустого экрана. Выберите основу и адаптируйте её под свой бизнес.</p>
      </div>
      <div className="catalog-bar">
        <div role="tablist" className="filters">
          {CATEGORIES.map((c) => {
            const count = c === 'Все' ? SITES.length : SITES.filter((s) => s.group === c).length;
            return (
              <button key={c} type="button" role="tab" aria-selected={c === active} onClick={() => setActive(c)} className={'filter' + (c === active ? ' on' : '')}>
                <span>{c}</span><span className="n">{count}</span>
              </button>
            );
          })}
        </div>
        <span>Показано: {shown.length} {plural(shown.length)}</span>
      </div>
      <div className="catalog-grid">
        {shown.map((s) => <SiteCard key={s.id} site={s} />)}
      </div>
    </section>
  );
}
