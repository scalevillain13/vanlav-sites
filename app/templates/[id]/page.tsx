import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import SiteCard from '@/components/SiteCard';
import SitePreview from '@/components/SitePreview';
import HomeEffects from '@/components/HomeEffects';
import { PRICES, SITES, findSite } from '@/lib/data';

export const dynamicParams = false;
export function generateStaticParams() {
  return SITES.map((s) => ({ id: s.id }));
}

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const site = findSite(id);
  if (!site) return {};
  return {
    title: `${site.title} — ${site.tagline.toLowerCase()} | Ванлав Сайты`,
    description: `${site.description} Адаптация под ваш бизнес ${site.priceLabel.replace(/ /g, ' ')}.`,
  };
}

const EDITABLE = [
  { title: 'Название и логотип', text: 'Ваш бренд в шапке, подвале и на всех страницах' },
  { title: 'Цвета', text: 'Фирменные цвета компании' },
  { title: 'Тексты', text: 'Заголовки, описания, информация о компании' },
  { title: 'Фотографии', text: 'Ваши работы, команда, объекты' },
  { title: 'Услуги и цены', text: 'Список услуг и прайс' },
  { title: 'Контакты', text: 'Телефон, мессенджеры, адрес, график' },
  { title: 'Разделы', text: 'Порядок и набор блоков на странице' },
  { title: 'Форма заявки', text: 'Поля и способ получения заявок' },
];
const LAUNCH = [
  { num: '01', title: 'Заявка', text: 'Вы оставляете заявку на этот шаблон, мы уточняем задачу.' },
  { num: '02', title: 'Материалы', text: 'Присылаете логотип, тексты, фотографии, услуги и контакты.' },
  { num: '03', title: 'Адаптация', text: 'Заменяем контент и настраиваем шаблон под вашу компанию.' },
  { num: '04', title: 'Запуск', text: 'Согласовываем результат и публикуем сайт.' },
];

export default async function TemplatePage({ params }: Params) {
  const { id } = await params;
  const site = findSite(id);
  if (!site) notFound();
  const same = SITES.filter((s) => s.id !== site.id && s.group === site.group);
  const rest = SITES.filter((s) => s.id !== site.id && s.group !== site.group);
  const related = same.concat(rest).slice(0, 3);

  return (
    <div id="top" style={{ minHeight: '100vh' }}>
      <HomeEffects />
      <Header base="/" ctaHref="#order" />

      <section className="container" style={{ paddingTop: 'clamp(28px,4vw,48px)' }}>
        <div className="crumbs"><Link href="/#catalog">Каталог</Link><span>/</span><b>{site.niche}</b></div>
        <div className="tpl-head">
          <div>
            <span className="eyebrow">{site.niche}{site.live && <span className="live-dot" style={{ textTransform: 'none', letterSpacing: 0 }}>Живой сайт</span>}</span>
            <h1 className="tpl-h1">{site.title}</h1>
            <p className="tpl-tagline">{site.tagline}</p>
          </div>
          <div>
            <div className="tpl-price"><b>{site.priceLabel}</b><span>с адаптацией под ваш бизнес</span></div>
            <div className="btn-row" style={{ gap: 12 }}>
              <a href="#order" className="btn btn-accent tpl-btn">Заказать адаптацию <span>→</span></a>
              <a href={site.demo} target="_blank" rel="noopener" className="btn btn-outline tpl-btn">Посмотреть демо <span>↗</span></a>
            </div>
          </div>
        </div>

        <div className="big-browser">
          <div className="bar">
            <span className="dots"><i /><i /><i /></span>
            <span className="url">
              {site.live ? <a href={site.demoUrl} target="_blank" rel="noopener">{site.domain} ↗</a> : <span>{site.domain}</span>}
            </span>
            <span style={{ width: 48 }} />
          </div>
          <SitePreview site={site} eager />
        </div>
      </section>

      <section className="tpl-sec">
        <div className="tpl-two">
          <div className="tpl-box">
            <span className="k">Входит в адаптацию</span>
            <h2>Что входит в адаптацию</h2>
            <div className="incl">
              {PRICES.ready.features.map((f) => (
                <div key={f}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flex: 'none' }} aria-hidden="true"><path d="M3 8.5l3 3 7-7" stroke="#FF5A1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="tpl-box light">
            <span className="k">Под вашу компанию</span>
            <h2>Что можно изменить</h2>
            <div className="editable">
              {EDITABLE.map((e) => <div key={e.title}><b>{e.title}</b><span>{e.text}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="tpl-sec">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="eyebrow" style={{ color: 'var(--muted)' }}>Запуск</span>
          <h2 className="h2" style={{ fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1 }}>Как проходит запуск</h2>
        </div>
        <div className="launch">
          {LAUNCH.map((s) => <div key={s.num}><small>{s.num}</small><b>{s.title}</b><span>{s.text}</span></div>)}
        </div>
      </section>

      <CTA anchor="order" title="Заказать этот сайт" button="Заказать адаптацию"
        text={`Оставьте заявку — обсудим детали и адаптируем «${site.title}» под вашу компанию.`}
        presetTemplate={site.title} presetNiche={site.niche} />

      <section className="container" style={{ paddingBottom: 'clamp(72px,10vw,128px)' }}>
        <div className="related-head">
          <h2>Другие шаблоны</h2>
          <Link href="/#catalog">Весь каталог →</Link>
        </div>
        <div className="related-grid">
          {related.map((r) => <SiteCard key={r.id} site={r} />)}
        </div>
      </section>

      <Footer base="/" />
    </div>
  );
}
