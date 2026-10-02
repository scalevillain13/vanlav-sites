import type { ReactNode } from 'react';
import { SERVICES, SITES } from '@/lib/data';
import Link from 'next/link';
import Devices3D from './Devices3D';
import { servicePageById } from '@/lib/services-content';
import { ArrowRight } from './Icons';

const svg = (children: ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
// Бумажный самолётик (заявки прилетают в Telegram), значок бота, панель администратора
const ICONS: Record<string, ReactNode> = {
  tgbot: svg(<><path d="M21 4 10.5 14.5" /><path d="M21 4 14.5 21l-4-6.5L4 10.5z" /></>),
  bots: svg(<><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 8V4" /><circle cx="12" cy="3" r="1.3" fill="currentColor" stroke="none" /><circle cx="9" cy="14" r="1.3" fill="currentColor" stroke="none" /><circle cx="15" cy="14" r="1.3" fill="currentColor" stroke="none" /><path d="M8 19v1.5" /><path d="M16 19v1.5" /></>),
  admin: svg(<><rect x="3.5" y="4" width="17" height="16" rx="2.5" /><path d="M3.5 9.5h17" /><path d="M8 14h2" /><path d="M8 17h5" /></>),
};

export default function Automation() {
  const list = SERVICES.filter((s) => s.auto);
  const nodes = [
    { label: 'Заявка на сайте', icon: '1', acc: false, line: true, flex: '1 1 260px', delay: 0 },
    { label: 'Telegram-бот', icon: '2', acc: true, line: true, flex: '1 1 240px', delay: 1.2 },
    { label: 'Админ-панель', icon: '3', acc: false, line: false, flex: '0 0 auto', delay: 0 },
  ];
  return (
    <section id="automation" className="section">
      <div className="sec-head">
        <div>
          <span className="label">Автоматизация</span>
          <h2 className="h2">Админ-панели и Telegram-боты</h2>
        </div>
        <p className="lead">Сайт — только начало. Настрою, чтобы заявки сразу приходили вам в Telegram, а заявками, услугами и контентом можно было управлять в удобной админ-панели.</p>
      </div>

      <div className="auto-box">
        <div className="grid" aria-hidden="true" />
        <div className="auto-stage"><Devices3D mode="automation" sites={SITES} startId="napor"
          poster={{ desktop: '/brand/auto-poster.webp', mobile: '/brand/auto-poster-m.webp', alt: 'Админ-панель заявок, Telegram-бот и ноутбук' }} /></div>
        <div className="flow">
          {nodes.map((n) => (
            <div key={n.label} className="flow-node" style={{ flex: n.flex }}>
              <span className="pill"><i className={n.acc ? 'acc' : ''}>{n.icon}</i><span>{n.label}</span></span>
              {n.line && <div className="flow-line"><span style={{ animationDelay: n.delay + 's' }} /></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="auto-cards">
        {list.map((c) => (
          <Link key={c.id} href={'/uslugi/' + (servicePageById(c.id)?.slug || '')} className="card auto-card" style={{ color: 'var(--text)' }}>
            <div className="top"><i>{ICONS[c.id] || '✦'}</i><b>{c.priceLabel}</b></div>
            <b>{c.title}</b>
            <span>{c.text}</span>
            <div className="pts">{(c.points || []).map((p) => <span key={p}><i>✓</i>{p}</span>)}</div>
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <a href="#contact" className="btn btn-accent btn-icon">Обсудить бота или админку <span className="ic"><ArrowRight /></span></a>
      </div>
    </section>
  );
}
