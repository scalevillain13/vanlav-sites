import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import JsonLd from '@/components/JsonLd';
import HomeEffects from '@/components/HomeEffects';
import { SITES } from '@/lib/data';
import { NICHES } from '@/lib/niche-content';
import { abs, breadcrumbsLd, organizationLd } from '@/lib/seo';

const TITLE = 'Сайты для бизнеса по нишам: клининг, сантехника, салоны красоты и другие | Ванлав';
const DESC = 'Готовые решения и сайты с нуля для конкретных ниш: клининг, сантехника, салоны красоты, автосервисы, ремонт, электрика, кондиционеры, недвижимость, мебель. От 9 900 ₽.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: '/sajt-dlya' },
  openGraph: { title: TITLE, description: DESC, url: '/sajt-dlya', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
};

export default function NichesIndex() {
  return (
    <div id="top" style={{ minHeight: '100vh' }}>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'CollectionPage', name: 'Сайты для бизнеса по нишам', url: abs('/sajt-dlya'), hasPart: NICHES.map((n) => ({ '@type': 'WebPage', name: n.h1, url: abs('/sajt-dlya/' + n.slug) })) },
        breadcrumbsLd([{ name: 'Главная', path: '/' }, { name: 'Сайты по нишам', path: '/sajt-dlya' }]),
        organizationLd(),
      ] }} />
      <HomeEffects />
      <Header base="/" ctaHref="#order" />
      <main>
        <section className="container" style={{ paddingTop: 'clamp(28px,4vw,48px)' }}>
          <nav className="crumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><b>Сайты по нишам</b></nav>
          <div className="svc-hero">
            <div>
              <span className="eyebrow">Под вашу сферу</span>
              <h1 className="tpl-h1" style={{ fontSize: 'clamp(32px,5vw,68px)' }}>Сайты для бизнеса по нишам</h1>
              <p className="svc-lead">У каждой ниши свои вопросы клиентов и свои блоки, которые продают. Выберите свою сферу — покажу, что должно быть на сайте, и живые примеры.</p>
            </div>
          </div>
          <div className="svc-grid">
            {NICHES.map((n) => {
              const ex = SITES.find((s) => s.id === n.templates[0]);
              return (
                <Link key={n.slug} href={'/sajt-dlya/' + n.slug} className="svc-card">
                  <div className="top"><span>{n.name}</span><b>{ex?.live ? 'есть живой пример' : 'есть шаблон'}</b></div>
                  <h2>{n.h1}</h2>
                  <p>{n.lead}</p>
                  <span className="more">Подробнее →</span>
                </Link>
              );
            })}
          </div>
        </section>
        <CTA anchor="order" title="Не нашли свою нишу?" text="Сделаю сайт с нуля под любую сферу — от структуры и текстов до запуска." button="Обсудить проект" />
      </main>
      <Footer base="/" />
    </div>
  );
}
