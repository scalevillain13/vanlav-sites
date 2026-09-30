import Logo from './Logo';
import { CONTACT } from '@/lib/data';

export default function Footer({ base = '' }: { base?: string }) {
  const links = [
    { label: 'Каталог', href: base + '#catalog' },
    { label: 'Услуги', href: base + '#services' },
    { label: 'Как это работает', href: base + '#process' },
    { label: 'Цены', href: base + '#pricing' },
    { label: 'Контакты', href: base + '#contact' },
  ];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <span className="logo" style={{ color: 'var(--text)' }}><Logo /></span>
            <span>Студия разработки сайтов</span>
          </div>
          <nav aria-label="Навигация в подвале">
            {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <a href={CONTACT.telegramUrl} target="_blank" rel="noopener" className="footer-tg">
            <small>Основной способ связи — Telegram</small>
            <b>{CONTACT.telegram} ↗</b>
          </a>
        </div>
        <div aria-hidden="true" className="wordmark">Ванлав<span className="dot-accent">.</span>Сайты</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ванлав Сайты · Сочи</span>
          <a href="#top">Наверх ↑</a>
        </div>
      </div>
    </footer>
  );
}
