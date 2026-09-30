import type { Faq as FaqItem } from '@/lib/services-content';

/** Блок «Частые вопросы» на нативных <details> — работает без JS и индексируется целиком */
export default function Faq({ items, title = 'Частые вопросы', label = 'FAQ', id = 'faq' }: { items: FaqItem[]; title?: string; label?: string; id?: string }) {
  return (
    <section id={id} className="section">
      <div className="sec-head">
        <div>
          <span className="label">{label}</span>
          <h2 className="h2">{title}</h2>
        </div>
      </div>
      <div className="faq">
        {items.map((f, i) => (
          <details key={f.q} className="faq-item" open={i === 0}>
            <summary><h3>{f.q}</h3><i aria-hidden="true">+</i></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
