import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import HomeEffects from '@/components/HomeEffects';
import { ARTICLES } from '@/lib/blog-content';
import { abs, breadcrumbsLd, organizationLd, BRAND } from '@/lib/seo';

const TITLE = 'Блог о сайтах для бизнеса: цены, заявки, SEO | Ванлав';
const DESC = 'Практичные статьи для владельцев малого бизнеса: сколько стоит сайт, какой формат выбрать, почему нет заявок и как получать их в Telegram.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: '/blog' },
  openGraph: { title: TITLE, description: DESC, url: '/blog', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
};

const date = (iso: string) => new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Blog() {
  return (
    <div id="top" style={{ minHeight: '100vh' }}>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'Blog', name: `Блог студии ${BRAND}`, url: abs('/blog'), inLanguage: 'ru-RU', blogPost: ARTICLES.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: abs('/blog/' + a.slug), datePublished: a.date })) },
        breadcrumbsLd([{ name: 'Главная', path: '/' }, { name: 'Блог', path: '/blog' }]),
        organizationLd(),
      ] }} />
      <HomeEffects />
      <Header base="/" />
      <main className="container" style={{ paddingTop: 'clamp(28px,4vw,48px)', paddingBottom: 'clamp(72px,10vw,128px)' }}>
        <nav className="crumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><b>Блог</b></nav>
        <div className="svc-hero">
          <div>
            <span className="eyebrow">Блог</span>
            <h1 className="tpl-h1" style={{ fontSize: 'clamp(32px,5vw,68px)' }}>О сайтах — простыми словами</h1>
            <p className="svc-lead">{DESC}</p>
          </div>
        </div>
        <div className="blog-grid">
          {ARTICLES.map((a) => (
            <Link key={a.slug} href={'/blog/' + a.slug} className="card blog-card">
              <span className="bc-meta"><time dateTime={a.date}>{date(a.date)}</time> · {a.read} мин чтения</span>
              <h2>{a.title}</h2>
              <p>{a.lead}</p>
              <span className="more">Читать →</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer base="/" />
    </div>
  );
}
