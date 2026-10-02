import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import JsonLd from '@/components/JsonLd';
import HomeEffects from '@/components/HomeEffects';
import { ARTICLES, articleBySlug } from '@/lib/blog-content';
import { NICHES } from '@/lib/niche-content';
import { articleLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  const path = '/blog/' + a.slug;
  return {
    title: { absolute: a.metaTitle },
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: path },
    openGraph: { title: a.metaTitle, description: a.description, url: path, type: 'article', publishedTime: a.date, authors: ['Александр'], images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: a.metaTitle, description: a.description, images: ['/og.jpg'] },
  };
}

const date = (iso: string) => new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const path = '/blog/' + a.slug;
  const others = ARTICLES.filter((x) => x.slug !== a.slug);

  return (
    <div id="top" style={{ minHeight: '100vh' }}>
      <JsonLd data={articleLd(a, path)} />
      <HomeEffects />
      <Header base="/" ctaHref="#order" />
      <main>
        <article className="container art">
          <nav className="crumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><Link href="/blog">Блог</Link><span>/</span><b>{a.title}</b></nav>
          <header className="art-head">
            <span className="bc-meta"><time dateTime={a.date}>{date(a.date)}</time> · {a.read} мин чтения · Александр, студия Ванлав</span>
            <h1>{a.title}</h1>
            <p className="art-lead">{a.lead}</p>
          </header>
          <div className="art-body">
            {a.body.map((b, i) => (
              <section key={i}>
                {b.h2 && <h2>{b.h2}</h2>}
                {b.p?.map((t) => <p key={t}>{t}</p>)}
                {b.list && <ul>{b.list.map((t) => <li key={t}>{t}</li>)}</ul>}
                {b.tip && <aside className="art-tip"><b>Совет</b>{b.tip}</aside>}
              </section>
            ))}
            <div className="art-links">
              <b>По теме</b>
              {a.links.map((l) => <Link key={l.href} href={l.href}>{l.text} →</Link>)}
            </div>
          </div>
        </article>
        <CTA anchor="order" title="Нужен сайт, который приносит заявки?" text="Расскажите о бизнесе — предложу решение и назову точную цену до начала работ." button="Обсудить проект" />
        <section className="container" style={{ paddingBottom: 'clamp(72px,10vw,128px)' }}>
          <div className="related-head"><h2>Ещё статьи</h2><Link href="/blog">Все статьи →</Link></div>
          <div className="niche-links">{others.map((o) => <Link key={o.slug} href={'/blog/' + o.slug}>{o.title}</Link>)}</div>
          <div className="related-head" style={{ marginTop: 48 }}><h2>Сайты для вашей ниши</h2><Link href="/sajt-dlya">Все ниши →</Link></div>
          <div className="niche-links">{NICHES.map((n) => <Link key={n.slug} href={'/sajt-dlya/' + n.slug}>{n.h1}</Link>)}</div>
        </section>
      </main>
      <Footer base="/" />
    </div>
  );
}
