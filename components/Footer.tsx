import Link from 'next/link';
import { CONTACT, SERVICES } from '@/lib/data';
import { SERVICE_PAGES } from '@/lib/services-content';

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Ванлав — студия разработки сайтов" width={240} height={146} className="footer-logo" loading="lazy" />
          </div>
          <nav aria-label="Навигация в подвале">
            {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <nav aria-label="Услуги">
            {SERVICE_PAGES.slice(0, 6).map((p) => <Link key={p.slug} href={'/uslugi/' + p.slug}>{SERVICES.find((s) => s.id === p.id)?.title}</Link>)}
            <Link href="/uslugi">Все услуги →</Link>
          </nav>
          <a href={CONTACT.telegramUrl} target="_blank" rel="noopener" className="footer-tg">
            <small>Основной способ связи — Telegram</small>
            <b>{CONTACT.telegram} ↗</b>
          </a>
        </div>
        <div aria-hidden="true" className="wordmark">ВАН<span style={{ color: '#2A1409' }}>ЛАВ</span></div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ванлав — студия разработки сайтов · Сочи</span>
          <a href="#top">Наверх ↑</a>
        </div>
      </div>
    </footer>
  );
}
