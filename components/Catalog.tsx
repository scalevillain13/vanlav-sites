'use client';
import { useState } from 'react';
import { CATEGORIES, SITES } from '@/lib/data';
import SiteCard from './SiteCard';
import { Note } from './Doodle';
import { GlowArrow, Sparkle } from './Glow';
import Link from 'next/link';

const FIRST = 6;
// сначала живые сайты, потом демо-шаблоны
const ORDERED = [...SITES].sort((a, b) => Number(b.live) - Number(a.live));

const plural = (n: number) =>
  n % 10 === 1 && n % 100 !== 11 ? 'шаблон' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'шаблона' : 'шаблонов';

export default function Catalog({ niches = [] }: { niches?: { slug: string; name: string }[] }) {
  const [active, setActive] = useState('Все');
  const [all, setAll] = useState(false);
  const list = active === 'Все' ? ORDERED : ORDERED.filter((s) => s.group === active);
  const shown = all ? list : list.slice(0, FIRST);
  const rest = list.length - shown.length;
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
              <button key={c} type="button" role="tab" aria-selected={c === active} onClick={() => { setActive(c); }} className={'filter' + (c === active ? ' on' : '')}>
                <span>{c}</span><span className="n">{count}</span>
              </button>
            );
          })}
        </div>
        <span>Показано: {shown.length} из {list.length} {plural(list.length)}</span>
      </div>
      <div className="catalog-grid">
        {shown.map((s, i) => (
          <div key={s.id} className="cat-cell" style={{ animationDelay: (all && i >= FIRST ? (i - FIRST) * 0.06 : 0) + 's' }}>
            {i === 0 && s.live && <Note className="cat-note hide-m" rot={-5} arrow="arrowDown" arrowStyle={{ width: 22, marginTop: 0, transform: "rotate(25deg)" }}>живые — можно потыкать</Note>}
            <SiteCard site={s} />
          </div>
        ))}
      </div>
      {(rest > 0 || all) && list.length > FIRST && (
        <div className="cat-more">
          <GlowArrow kind="curve" className="cat-arrow" />
          <Sparkle size={18} style={{ position: 'relative' }} />
          <button type="button" className={'cat-more-btn' + (all ? ' open' : '')} aria-expanded={all} onClick={() => {
            if (all) document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            setAll(!all);
          }}>
            <span>{all ? 'Свернуть витрину' : `Показать всю витрину — ещё ${rest}`}</span>
            <i aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></svg></i>
          </button>
        </div>
      )}
      <div className="cat-niches">
        <span>Сайты для ниш:</span>
        {niches.map((n) => <Link key={n.slug} href={'/sajt-dlya/' + n.slug}>{n.name}</Link>)}
      </div>
    </section>
  );
}
