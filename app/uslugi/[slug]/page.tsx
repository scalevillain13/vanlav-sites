import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import SiteCard from '@/components/SiteCard';
import HomeEffects from '@/components/HomeEffects';
import { SERVICES, SITES } from '@/lib/data';
import { SERVICE_PAGES, servicePageBySlug } from '@/lib/services-content';
import { CITY, serviceLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePageBySlug(slug);
  if (!page) return {};
  const path = '/uslugi/' + page.slug;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: path },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url: path, type: 'website', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.metaDescription, images: ['/og.jpg'] },
  };
}

const STEPS = [
  { num: '01', title: 'Задача', text: 'Созваниваемся или переписываемся в Telegram: цели, аудитория, примеры, сроки.' },
  { num: '02', title: 'Смета', text: 'Фиксирую состав работ и цену до старта — без доплат по ходу.' },
  { num: '03', title: 'Разработка', text: 'Показываю промежуточные результаты, вносим правки на каждом этапе.' },
  { num: '04', title: 'Запуск', text: 'Публикую, подключаю аналитику и передаю доступы. Остаюсь на связи.' },
];

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const page = servicePageBySlug(slug);
  const svc = page && SERVICES.find((s) => s.id === page.id);
  if (!page || !svc) notFound();
  const path = '/uslugi/' + page.slug;
  const others = SERVICE_PAGES.filter((p) => p.id !== page.id).slice(0, 6);
  const templates = [...SITES].sort((a, b) => Number(b.live) - Number(a.live)).slice(0, 3);

  return (
    <div id="top" style={{ minHeight: '100vh' }}>
      <JsonLd data={serviceLd({
        name: page.h1, description: page.metaDescription, path, price: svc.from, faq: page.faq,
        crumbs: [{ name: 'Главная', path: '/' }, { name: 'Услуги', path: '/uslugi' }, { name: svc.title, path }],
      })} />
      <HomeEffects />
      <Header base="/" ctaHref="#order" />

      <main>
        <section className="container" style={{ paddingTop: 'clamp(28px,4vw,48px)' }}>
          <nav className="crumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link><span>/</span><Link href="/uslugi">Услуги</Link><span>/</span><b>{svc.title}</b>
          </nav>
          <div className="svc-hero">
            <div>
              <span className="eyebrow">Студия Ванлав · {CITY} и вся Россия</span>
              <h1 className="tpl-h1" style={{ fontSize: 'clamp(32px,5vw,72px)' }}>{page.h1}</h1>
              <p className="svc-lead">{page.lead}</p>
            </div>
            <div>
              <div className="tpl-price"><b>{svc.priceLabel}</b><span>итоговую цену фиксирую до старта</span></div>
              <div className="btn-row" style={{ gap: 12 }}>
                <a href="#order" className="btn btn-accent btn-icon">Заказать <span className="ic">→</span></a>
                <Link href="/#catalog" className="btn btn-outline">Примеры работ</Link>
              </div>
            </div>
          </div>
          <div className="svc-results">
            {page.results.map((r) => <div key={r.title} className="card"><b>{r.title}</b><span>{r.text}</span></div>)}
          </div>
        </section>

        <section className="tpl-sec">
          <div className="tpl-two">
            <div className="tpl-box">
              <span className="k">Состав работ</span>
              <h2>Что входит</h2>
              <div className="incl">
                {page.includes.map((f) => (
                  <div key={f}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flex: 'none' }} aria-hidden="true"><path d="M3 8.5l3 3 7-7" stroke="#FF5A1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tpl-box light">
              <span className="k">Как работаем</span>
              <h2>Этапы</h2>
              <div className="editable">
                {STEPS.map((s) => <div key={s.num}><b>{s.num} · {s.title}</b><span>{s.text}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        {page.showTemplates && (
          <section className="tpl-sec">
            <div className="related-head">
              <h2>Примеры сайтов</h2>
              <Link href="/#catalog">Весь каталог →</Link>
            </div>
            <div className="related-grid">
              {templates.map((s) => <SiteCard key={s.id} site={s} />)}
            </div>
          </section>
        )}

        <Faq items={page.faq} title={`Вопросы: ${svc.title.toLowerCase()}`} label="Частые вопросы" />

        <CTA anchor="order" title={`Заказать: ${svc.title.toLowerCase()}`} button="Отправить заявку"
          text="Опишите задачу — отвечу в Telegram, предложу решение и назову точную цену." presetTemplate={svc.title} />

        <section className="container" style={{ paddingBottom: 'clamp(72px,10vw,128px)' }}>
          <div className="related-head">
            <h2>Другие услуги</h2>
            <Link href="/uslugi">Все услуги →</Link>
          </div>
          <div className="svc-grid" style={{ marginTop: 0 }}>
            {others.map((p) => {
              const s = SERVICES.find((x) => x.id === p.id)!;
              return (
                <Link key={p.slug} href={'/uslugi/' + p.slug} className="svc-card">
                  <div className="top"><span>Услуга</span><b>{s.priceLabel}</b></div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="more">Подробнее →</span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer base="/" />
    </div>
  );
}
