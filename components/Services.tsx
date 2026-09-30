'use client';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import { servicePageById } from '@/lib/services-content';
import { useSeen } from './useSeen';

export default function Services() {
  const [ref, seen] = useSeen<HTMLElement>(0.2);
  const max = Math.max(1, ...SERVICES.map((s) => s.from));
  return (
    <section id="services" ref={ref} className="section">
      <div className="sec-head">
        <div>
          <span className="label">Услуги</span>
          <h2 className="h2">Сайты полностью с нуля на заказ</h2>
        </div>
        <p className="lead">Разрабатываю сайты с нуля под вашу задачу: структура, уникальный дизайн, вёрстка, тексты и запуск — без шаблонов. Также логотипы, SEO, защита сайта, админ-панели и Telegram-боты. Цены стартовые — итог зависит от задачи.</p>
      </div>
      <div className="srv-list">
        {SERVICES.map((s, i) => (
          <Link key={s.id} href={'/uslugi/' + (servicePageById(s.id)?.slug || '')} className="srv srv-link">
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <div className="t"><h3 style={{ margin: 0, font: 'inherit' }}><b>{s.title}</b></h3><span>{s.text}</span></div>
            <div className="bar"><div style={{ width: seen ? Math.max(6, Math.round((s.from / max) * 100)) + '%' : '0%', transitionDelay: 0.1 + i * 0.08 + 's' }} /></div>
            <span className="p">{s.priceLabel}</span>
            <span className="go" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
      <div className="srv-foot">
        <span>Шкала показывает стартовую стоимость относительно самой крупной услуги.</span>
        <span style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/uslugi" className="btn-ghost">Все услуги →</Link>
          <a href="#contact" className="btn-ghost">Обсудить задачу →</a>
        </span>
      </div>
    </section>
  );
}
