import type React from 'react';
import { preload } from 'react-dom';
import Devices3D from './Devices3D';
import { AUTHOR, SITES, SCREEN_SITES, PRICES, formatPrice } from '@/lib/data';
import { ArrowRight } from './Icons';
import { Doodle, Note } from './Doodle';
import { Orbit, Sparkles } from './Glow';

const ic = (d: React.ReactNode) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const TRUST: [React.ReactNode, string][] = [
  [ic(<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>), 'Сайты с нуля под ключ'],
  [ic(<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18" /><path d="M8 21h8" /></>), 'Готовые решения'],
  [ic(<><path d="M5 19c4-1 7-4 9-9l3-5 2 2-5 3c-5 2-8 5-9 9Z" /><path d="M9 15l-3 3" /></>), 'Быстрый запуск'],
];

export default function Hero() {
  // постер 3D-сцены — самый крупный элемент первого экрана (LCP): грузим с высоким приоритетом
  preload('/brand/hero-poster-m.webp', { as: 'image', fetchPriority: 'high', media: '(max-width: 799px)' });
  preload('/brand/hero-poster.webp', { as: 'image', fetchPriority: 'high', media: '(min-width: 800px)' });
  const count = SITES.length;
  return (
    <section id="top" className="hero">
      <div className="hero-grid-bg" aria-hidden="true"><div /></div>
      <div className="hero-inner">
        <div className="hero-top">
          <span className="pill-tag">Студия разработки сайтов</span>
          <span>Сайты с нуля на заказ · {count} готовых решений</span>
        </div>
        <h1 className="h1">
          <span className="line"><span>Разработка сайтов для бизнеса.</span></span>{' '}
          <span className="line"><span>С нуля или на готовой основе.</span></span>
        </h1>

        <div className="hero-cols">
          <div className="hero-left">
            <p className="hero-sub">Делаю сайты полностью с нуля на заказ — от идеи и дизайна до запуска. Нужно быстрее и дешевле — адаптирую готовый сайт из каталога под вашу компанию.</p>
            <div className="btn-row">
              <a href="#contact" className="btn btn-accent btn-icon">Заказать сайт <span className="ic"><ArrowRight /></span></a>
              <a href="#catalog" className="btn btn-outline">Смотреть готовые сайты</a>
            </div>
            <a href="#about" className="author-pill">
              <span className="av">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {AUTHOR.photo ? <img src={AUTHOR.photo} alt={AUTHOR.name} /> : 'А'}
              </span>
              <span className="t">
                <b>{AUTHOR.name} — автор студии</b>
                <small>Сайты, Telegram-боты, админ-панели · {AUTHOR.city}</small>
              </span>
              <span style={{ color: 'var(--accent)', marginLeft: 6 }}>↓</span>
            </a>
          </div>

          <div className="hero-stage">
            <Devices3D mode="hero" sites={SCREEN_SITES} startId="briz" priority
              poster={{ desktop: '/brand/hero-poster.webp', mobile: '/brand/hero-poster-m.webp', alt: '3D-ноутбук с сайтами из каталога студии Ванлав' }} />
            <Note className="hero-note hide-m" rot={-7} arrow="arrow" arrowStyle={{ width: 70, transform: 'rotate(-75deg) scaleY(-1)' }}>это живые сайты —<br />листаются сами</Note>
            <Orbit className="hero-orbit" />
            <Sparkles className="hero-sparkles" items={[[6, 14, 18], [97, 4, 24], [99, 62, 14, true], [3, 58, 20], [42, 1, 12, true], [74, 98, 16]]} />
            <a href="#catalog" className="hero-float">
              <span className="t"><b>На экране — живые сайты и шаблоны</b><small>{count} готовых решений</small></span>
              <span className="p">{formatPrice(PRICES.ready.from)}</span>
            </a>
          </div>
        </div>

        <div className="trust">
          {TRUST.map(([ic, t]) => (
            <div key={t as string}><span className="ic">{ic}</span><span className="tx">{t}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
