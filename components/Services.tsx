'use client';
import { SERVICES } from '@/lib/data';
import { useSeen } from './useSeen';

export default function Services() {
  const [ref, seen] = useSeen<HTMLElement>(0.2);
  const max = Math.max(1, ...SERVICES.map((s) => s.from));
  return (
    <section id="services" ref={ref} className="section">
      <div className="sec-head">
        <div>
          <span className="label">Другие услуги</span>
          <h2 className="h2">Не только готовые сайты</h2>
        </div>
        <p className="lead">Делаю сайты и дизайн с нуля, логотипы, настраиваю SEO и защиту сайта, разрабатываю админ-панели и Telegram-ботов. Цены стартовые — итог зависит от задачи.</p>
      </div>
      <div className="srv-list">
        {SERVICES.map((s, i) => (
          <div key={s.id} className="srv">
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <div className="t"><b>{s.title}</b><span>{s.text}</span></div>
            <div className="bar"><div style={{ width: seen ? Math.max(6, Math.round((s.from / max) * 100)) + '%' : '0%', transitionDelay: 0.1 + i * 0.08 + 's' }} /></div>
            <span className="p">{s.priceLabel}</span>
          </div>
        ))}
      </div>
      <div className="srv-foot">
        <span>Шкала показывает стартовую стоимость относительно самой крупной услуги.</span>
        <a href="#contact" className="btn-ghost">Обсудить задачу →</a>
      </div>
    </section>
  );
}
