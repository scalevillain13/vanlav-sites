'use client';
import { useEffect, useState } from 'react';
import Devices3D from './Devices3D';
import { AUTHOR, SITES, PRICES, formatPrice } from '@/lib/data';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  const count = SITES.length;
  return (
    <section id="top" className={'hero' + (mounted ? ' mounted' : '')}>
      <div className="hero-grid-bg" aria-hidden="true"><div /></div>
      <div className="hero-inner">
        <div className="hero-top">
          <span className="pill-tag">Студия готовых сайтов</span>
          <span>{count} шаблонов под разные ниши</span>
        </div>
        <h1 className="h1">
          <span className="line"><span>Готовый сайт для бизнеса.</span></span>
          <span className="line"><span>Без разработки с нуля.</span></span>
        </h1>

        <div className="hero-cols">
          <div className="hero-left">
            <p className="hero-sub">Выберите готовый дизайн под свою нишу — я адаптирую его под вашу компанию, услуги и контакты.</p>
            <div className="btn-row">
              <a href="#catalog" className="btn btn-accent btn-icon">Смотреть сайты <span className="ic">↓</span></a>
              <a href="#custom" className="btn btn-outline">Нужен сайт под другую нишу</a>
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
            <Devices3D mode="hero" sites={SITES} startId="napor" />
            <a href="#catalog" className="hero-float">
              <span className="t"><b>На экране — шаблоны из каталога</b><small>{count} готовых сайтов</small></span>
              <span className="p">{formatPrice(PRICES.ready.from)}</span>
            </a>
          </div>
        </div>

        <div className="trust">
          {[['◧', 'Готовые решения'], ['✎', 'Адаптация под ваш бизнес'], ['↗', 'Быстрый запуск']].map(([ic, t]) => (
            <div key={t}><span className="ic">{ic}</span><span className="tx">{t}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
