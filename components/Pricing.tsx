import { PLANS } from '@/lib/data';

export default function Pricing({ base = '' }: { base?: string }) {
  return (
    <section id="pricing" className="section">
      <div className="sec-head">
        <div>
          <span className="label">Цены</span>
          <h2 className="h2">Две понятные модели</h2>
        </div>
        <p className="lead" style={{ maxWidth: 480 }}>Итоговая цена зависит от объёма изменений. Обсудим задачу и назовём стоимость до начала работ.</p>
      </div>
      <div className="plans">
        {PLANS.map((p, i) => (
          <div key={p.id} className={'plan' + (i === 1 ? ' light' : '')}>
            <div className="plan-top"><b>{p.name}</b><span>{i === 1 ? 'С нуля' : 'Из каталога'}</span></div>
            <span className="plan-price">{p.priceLabel}</span>
            <div className="plan-feats">
              {p.features.map((f) => <div key={f}><i>✓</i><span>{f}</span></div>)}
            </div>
            <a href={base + p.href} className="plan-btn">{p.button} →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
