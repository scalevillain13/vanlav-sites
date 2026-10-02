'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SITES } from '@/lib/data';
import { Doodle, Note } from './Doodle';
import { ArrowUpRight } from './Icons';
import { Brackets } from './Glow';

// Что реально есть на каждом живом сайте (по их экранам)
const FEATURES: Record<string, { lead: string; items: string[]; note: string }> = {
  briz: {
    lead: 'Клининг в Сочи и Адлере. Свежий светлый сайт с акцентом на цены и реальные объекты.',
    items: ['Цены по видам уборки', 'Слайдер «до и после»', 'Объекты за месяц и команда', 'Сертификаты и отзывы', 'Карта и контакты'],
    note: 'цена — сразу на первом экране',
  },
  lume: {
    lead: 'Студия эстетики. Спокойная премиальная подача, много фото и запись в пару кликов.',
    items: ['Направления с прайсом', 'Подбор ухода за 3 вопроса', 'Слайдер «до и после»', 'Абонементы', 'Онлайн-запись: процедура, мастер, дата'],
    note: 'квиз сам подбирает процедуру',
  },
  napor: {
    lead: 'Аварийная сантехника. Строгий «инженерный» стиль и всё, чтобы вызвать мастера за минуту.',
    items: ['Интерактивный план квартиры', 'Цены до выезда мастера', 'Мастера и оборудование', 'Гарантийный талон', 'Зона выезда на карте'],
    note: 'нажимаешь на точку — видишь цену',
  },
};
const ORDER = ['briz', 'lume', 'napor'];

export default function Shots() {
  const rootRef = useRef<HTMLElement>(null);
  // прокрутка скриншотов идёт только пока окно видно на экране
  useEffect(() => {
    const els = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('.lw-view') || []);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('run', e.isIntersecting)), { rootMargin: '0px 0px -10% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const sites = ORDER.map((id) => SITES.find((s) => s.id === id)).filter(Boolean) as typeof SITES;

  return (
    <section id="shots" ref={rootRef} className="section live" aria-labelledby="shots-h">
      <div className="sec-head">
        <div>
          <span className="label">Портфолио</span>
          <h2 id="shots-h" className="h2">Живые сайты крупным планом</h2>
        </div>
        <p className="lead">Три сайта, которые уже работают. Окна прокручиваются сами — наведите курсор, чтобы остановить и рассмотреть.</p>
      </div>

      <div className="live-list">
        {sites.map((s, i) => {
          const f = FEATURES[s.id];
          const dur = Math.round(((s.imageH || 4000) / 1280) * 5.2);
          return (
            <article key={s.id} className={'live-row' + (i % 2 ? ' flip' : '')}>
              <div className="lw">
                <Brackets className="lw-br" />
                <div className="lw-bar">
                  <span className="dots"><i /><i /><i /></span>
                  <span className="lw-url"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>{s.domain}</span>
                  <span />
                </div>
                <div className="lw-view" style={{ ['--dur' as string]: dur + 's', ['--bg' as string]: s.preview.bg }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <picture>
                    <source media="(max-width: 760px)" srcSet={s.image.replace(/full\.jpe?g$/, 'full-sm.webp')} />
                    <img src={s.image.replace(/\.jpe?g$/, '.webp')} alt={`${s.title} — сайт целиком`} width={1280} height={s.imageH} loading="lazy" decoding="async" />
                  </picture>
                </div>
                <Note className={'lw-note hide-m ' + (i % 2 ? 'l' : 'r')} rot={i % 2 ? -5 : 4} arrow={i % 2 ? 'arrow' : 'loop'} arrowStyle={{ width: 76, transform: i % 2 ? 'scaleX(-1) rotate(-20deg)' : 'scaleX(-1) rotate(40deg)' }}>{f.note}</Note>
              </div>
              <div className="lw-info">
                <span className="lw-n">{String(i + 1).padStart(2, '0')}<small>/ 0{sites.length}</small></span>
                <span className="lw-niche">{s.niche}</span>
                <h3>{s.title}</h3>
                <p>{f.lead}</p>
                <ul>{f.items.map((it, k) => <li key={it}><Doodle kind="check" delay={k * 0.08} />{it}</li>)}</ul>
                <div className="lw-act">
                  <a href={s.demoUrl} target="_blank" rel="noopener" className="btn btn-accent btn-icon">Открыть сайт <span className="ic"><ArrowUpRight /></span></a>
                  <Link href={s.url} className="btn btn-outline">Подробнее</Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
