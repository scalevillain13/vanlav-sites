import { preload } from 'react-dom';
import Devices3D from './Devices3D';
import { AUTHOR, SITES, PRICES, formatPrice } from '@/lib/data';

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
              <a href="#contact" className="btn btn-accent btn-icon">Заказать сайт <span className="ic">→</span></a>
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
            <Devices3D mode="hero" sites={SITES} startId="napor" priority
              poster={{ desktop: '/brand/hero-poster.webp', mobile: '/brand/hero-poster-m.webp', alt: '3D-ноутбук с сайтами из каталога студии Ванлав' }} />
            <a href="#catalog" className="hero-float">
              <span className="t"><b>На экране — шаблоны из каталога</b><small>{count} готовых сайтов</small></span>
              <span className="p">{formatPrice(PRICES.ready.from)}</span>
            </a>
          </div>
        </div>

        <div className="trust">
          {[['✎', 'Сайты с нуля под ключ'], ['◧', 'Готовые решения'], ['↗', 'Быстрый запуск']].map(([ic, t]) => (
            <div key={t}><span className="ic">{ic}</span><span className="tx">{t}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
