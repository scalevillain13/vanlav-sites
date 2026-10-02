import { PRICES, SERVICES, formatPrice } from '@/lib/data';
import { Doodle, Note } from './Doodle';
import { ArrowRight } from './Icons';

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const ADDONS = ['logo', 'seo', 'tgbot', 'security', 'design', 'admin'];

/** Цены: готовый сайт — как чек, сайт с нуля — как чертёж на миллиметровке. Ниже — допы с реальными ценами. */
export default function Pricing({ base = '' }: { base?: string }) {
  const r = PRICES.ready, c = PRICES.custom;
  const addons = ADDONS.map((id) => SERVICES.find((s) => s.id === id)).filter(Boolean) as typeof SERVICES;
  return (
    <section id="pricing" className="section">
      <div className="sec-head">
        <div>
          <span className="label">Цены</span>
          <h2 className="h2">Две понятные модели</h2>
        </div>
        <p className="lead" style={{ maxWidth: 480 }}>Итоговая цена зависит от объёма работы. Обсуждаем задачу — и я называю стоимость до начала работ, без доплат по ходу.</p>
      </div>

      <div className="price-duo">
        {/* Готовый сайт — чек */}
        <article className="receipt">
          <div className="rc-paper">
            <header className="rc-head">
              <span>Ванлав · студия сайтов</span>
              <span>Чек № 001</span>
            </header>
            <h3>{r.name}</h3>
            <p className="rc-sub">Берём сайт из каталога и адаптируем под вашу компанию</p>
            <ul className="rc-lines">
              {r.features.map((f) => <li key={f}><span>{f}</span><i /><b>включено</b></li>)}
            </ul>
            <div className="rc-need">
              <small>Что нужно от вас</small>
              <div>{['Название', 'Логотип', 'Фото', 'Услуги и цены', 'Контакты'].map((t) => <span key={t}>{t}</span>)}</div>
            </div>
            <div className="rc-total"><span>Итого</span><b>от {fmt(r.from)} ₽</b></div>
            <p className="rc-fit"><b>Подходит, если</b> нужен сайт быстро, а бюджет ограничен</p>
            <div className="rc-code" aria-hidden="true" />
            <a href={base + r.href} className="rc-btn">{r.button} <ArrowRight /></a>
            <span className="stamp" aria-hidden="true">быстрый<br />старт</span>
          </div>
        </article>

        {/* Сайт с нуля — чертёж */}
        <article className="blueprint">
          <header className="bp-head">
            <span>Лист 01 · индивидуальный проект</span>
            <span>М 1:1</span>
          </header>
          <h3>{c.name}</h3>
          <div className="bp-sketch" aria-hidden="true">
            <div className="sk-nav"><i /><span /><span /><span /><em /></div>
            <div className="sk-hero"><b /><b className="s" /><em /></div>
            <div className="sk-cards"><span /><span /><span /></div>
            <Note className="bp-n1" rot={-6} arrow="arrow" arrowStyle={{ width: 52, transform: 'rotate(10deg)' }}>ваш стиль</Note>
            <Note className="bp-n2" rot={5}>структура под задачу</Note>
          </div>
          <span className="bp-price">{formatPrice(c.from)}</span>
          <ul className="bp-feats">
            {c.features.map((f, i) => <li key={f}><Doodle kind="check" delay={i * 0.08} />{f}</li>)}
          </ul>
          <p className="bp-fit"><b>Подходит, если</b> нужен уникальный дизайн и структура под ваш бизнес</p>
          <a href={base + c.href} className="btn btn-accent btn-icon bp-btn">{c.button} <span className="ic"><ArrowRight /></span></a>
        </article>
      </div>

      <div className="addons">
        <div className="addons-h">
          <b>Можно добавить к любому сайту</b>
          <span>цены «от», точная — после обсуждения</span>
        </div>
        <div className="addons-list">
          {addons.map((s, i) => (
            <a key={s.id} href={base + '#services'} className="tag-price" style={{ ['--r' as string]: (i % 2 ? 1.5 : -1.5) + 'deg' }}>
              <i aria-hidden="true" />
              <span>{s.title}</span>
              <b>{s.priceLabel}</b>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
