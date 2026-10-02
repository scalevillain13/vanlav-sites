import Link from 'next/link';
import Image from 'next/image';
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
            <Image src="/brand/logo.png" alt="Ванлав — студия разработки сайтов" width={240} height={146} className="footer-logo" sizes="240px" />
            <div className="footer-tag" aria-hidden="true"><span className="hand">Делаем красиво. Делаем с умом.</span><svg viewBox="0 0 260 20"><path d="M4 12 C 70 4, 150 4, 256 10" /></svg></div>
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
        <svg aria-hidden="true" focusable="false" className="wordmark" viewBox="0 0 1000 170" preserveAspectRatio="xMinYMid meet">
          <text x="0" y="150" textLength="1000" lengthAdjust="spacingAndGlyphs" fontFamily="Unbounded, 'Unbounded Fallback', sans-serif" fontWeight="700" fontSize="190">
            <tspan fill="#161614">ВАН</tspan><tspan fill="#2A1409">ЛАВ</tspan>
          </text>
        </svg>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ванлав — студия разработки сайтов · Сочи</span>
          <a href="#top">Наверх ↑</a>
        </div>
      </div>
    </footer>
  );
}
