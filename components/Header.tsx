'use client';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { CONTACT } from '@/lib/data';

export default function Header({ base = '', ctaHref }: { base?: string; ctaHref?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 980) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  // пока открыто меню, страница под ним не скроллится (блокируем на <html>: так работает и в iOS Safari)
  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle('menu-open', open);
    return () => el.classList.remove('menu-open');
  }, [open]);

  const links = [
    { label: 'Каталог', href: base + '#catalog' },
    { label: 'Услуги', href: base + '#services' },
    { label: 'Как это работает', href: base + '#process' },
    { label: 'Цены', href: base + '#pricing' },
    { label: 'Обо мне', href: base + '#about' },
  ];
  const cta = ctaHref || base + '#contact';
  // снимаем блокировку сразу, до перехода по якорю — иначе браузер не сможет прокрутить к секции
  const close = () => { document.documentElement.classList.remove('menu-open'); setOpen(false); };

  return (
    <header className="header">
      <div className="container header-row">
        <a href={base || '#top'} onClick={close} className="logo" aria-label="Ванлав — на главную"><Logo /></a>
        <nav className="nav-pill" aria-label="Основное меню">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <a href={cta} className="btn btn-accent header-cta">Заказать сайт <span>→</span></a>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Меню" aria-expanded={open} className={'burger' + (open ? ' open' : '')}>
          <span style={{ position: 'relative', width: 18, height: 12, display: 'block', background: 'none' }}>
            <span className="b1" /><span className="b2" />
          </span>
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {links.map((l) => <a key={l.href} href={l.href} onClick={close} className="mm-link">{l.label}<span>↗</span></a>)}
          <a href={cta} onClick={close} className="btn btn-accent mm-cta">Заказать сайт</a>
          <a href={CONTACT.telegramUrl} target="_blank" rel="noopener" className="mm-tg">Telegram {CONTACT.telegram}</a>
        </div>
      )}
    </header>
  );
}
