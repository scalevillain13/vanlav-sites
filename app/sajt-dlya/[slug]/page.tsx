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
import { PRICES, SITES, formatPrice } from '@/lib/data';
import { NICHES, nicheBySlug } from '@/lib/niche-content';
import { ARTICLES } from '@/lib/blog-content';
import { CITY, nicheLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return NICHES.map((n) => ({ slug: n.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const n = nicheBySlug(slug);
  if (!n) return {};
  const path = '/sajt-dlya/' + n.slug;
  const site = SITES.find((s) => s.id === n.templates[0]);
  const img = site?.cover || '/og.jpg';
  return {
    title: { absolute: n.metaTitle },
    description: n.metaDescription,
    keywords: n.keywords,
    alternates: { canonical: path },
    openGraph: { title: n.metaTitle, description: n.metaDescription, url: path, type: 'website', images: [{ url: img }] },
    twitter: { card: 'summary_large_image', title: n.metaTitle, description: n.metaDescription, images: [img] },
  };
}

export default async function NichePage({ params }: Params) {
  const { slug } = await params;
  const n = nicheBySlug(slug);
  if (!n) notFound();
  const path = '/sajt-dlya/' + n.slug;
  const examples = n.templates.map((id) => SITES.find((s) => s.id === id)).filter(Boolean) as typeof SITES;
  const more = SITES.filter((s) => !n.templates.includes(s.id)).sort((a, b) => Number(b.live) - Number(a.live)).slice(0, Math.max(0, 3 - examples.length));
  const others = NICHES.filter((x) => x.slug !== n.slug);

  return (
    <div id="top" style={{ minHeight: '100vh' }}>
      <JsonLd data={nicheLd(n, path)} />
      <HomeEffects />
      <Header base="/" ctaHref="#order" />
      <main>
        <section className="container" style={{ paddingTop: 'clamp(28px,4vw,48px)' }}>
          <nav className="crumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link><span>/</span><Link href="/sajt-dlya">Сайты по нишам</Link><span>/</span><b>{n.name}</b>
          </nav>
          <div className="svc-hero">
            <div>
              <span className="eyebrow">Студия Ванлав · {CITY} и вся Россия</span>
              <h1 className="tpl-h1" style={{ fontSize: 'clamp(32px,5vw,68px)' }}>{n.h1}</h1>
              <p className="svc-lead">{n.lead}</p>
            </div>
            <div>
              <div className="tpl-price"><b>{formatPrice(PRICES.ready.from)}</b><span>готовый сайт с адаптацией · с нуля — {formatPrice(PRICES.custom.from)}</span></div>
              <div className="btn-row" style={{ gap: 12 }}>
                <a href="#order" className="btn btn-accent btn-icon">Обсудить сайт <span className="ic">→</span></a>
                {examples[0] && <Link href={examples[0].url} className="btn btn-outline">Смотреть пример</Link>}
              </div>
            </div>
          </div>
        </section>

        <section className="tpl-sec">
          <div className="niche-why card">
            <h2>Зачем сайт, если есть соцсети и карты</h2>
            <p>{n.why}</p>
          </div>
        </section>

        <section className="tpl-sec">
          <div className="related-head"><h2>Что должно быть на сайте: {n.name.toLowerCase()}</h2></div>
          <div className="niche-must">
            {n.must.map((m, i) => (
              <div key={m.t} className="card">
                <span className="nm-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tpl-sec">
          <div className="related-head">
            <h2>{examples.some((e) => e.live) ? 'Живой пример и готовые сайты' : 'Готовые сайты для ниши'}</h2>
            <Link href="/#catalog">Весь каталог →</Link>
          </div>
          <div className="related-grid">
            {examples.concat(more).map((s) => <SiteCard key={s.id} site={s} />)}
          </div>
        </section>

        <Faq items={n.faq} title={`Вопросы о сайте: ${n.name.toLowerCase()}`} label="Частые вопросы" />

        <CTA anchor="order" title={n.h1} button="Обсудить проект"
          text="Расскажите о компании — предложу структуру сайта, покажу примеры и назову точную цену." presetNiche={n.name} />

        <section className="container" style={{ paddingBottom: 'clamp(72px,10vw,128px)' }}>
          <div className="related-head"><h2>Сайты для других ниш</h2><Link href="/uslugi">Все услуги →</Link></div>
          <div className="niche-links">
            {others.map((o) => <Link key={o.slug} href={'/sajt-dlya/' + o.slug}>{o.h1}</Link>)}
          </div>
          <div className="related-head" style={{ marginTop: 48 }}><h2>Полезно почитать</h2><Link href="/blog">Блог →</Link></div>
          <div className="niche-links">
            {ARTICLES.slice(0, 4).map((a) => <Link key={a.slug} href={'/blog/' + a.slug}>{a.title}</Link>)}
          </div>
        </section>
      </main>
      <Footer base="/" />
    </div>
  );
}
