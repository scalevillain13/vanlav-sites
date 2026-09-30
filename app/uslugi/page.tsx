import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import JsonLd from '@/components/JsonLd';
import HomeEffects from '@/components/HomeEffects';
import { PRICES, SERVICES, formatPrice } from '@/lib/data';
import { SERVICE_PAGES } from '@/lib/services-content';
import { breadcrumbsLd, organizationLd } from '@/lib/seo';

const TITLE = 'Услуги и цены на разработку сайтов в Сочи';
const DESC = 'Разработка сайтов с нуля: визитки, лендинги, многостраничные сайты под ключ. Дизайн, логотипы, SEO, защита сайта, Telegram-боты и админ-панели. Цены от 4 900 ₽.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/uslugi' },
  openGraph: { title: TITLE, description: DESC, url: '/uslugi', images: [{ url: '/og.png', width: 1200, height: 630 }] },
};

export default function ServicesHub() {
  return (
    <div id="top" style={{ minHeight: '100vh' }}>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [breadcrumbsLd([{ name: 'Главная', path: '/' }, { name: 'Услуги', path: '/uslugi' }]), organizationLd()] }} />
      <HomeEffects />
      <Header base="/" />
      <main>
        <section className="container" style={{ paddingTop: 'clamp(28px,4vw,48px)' }}>
          <nav className="crumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><b>Услуги</b></nav>
          <div className="svc-hero">
            <div>
              <span className="eyebrow">Студия Ванлав</span>
              <h1 className="tpl-h1" style={{ fontSize: 'clamp(32px,5vw,72px)' }}>Услуги и цены на разработку сайтов</h1>
            </div>
            <p className="svc-lead">Делаю сайты полностью с нуля на заказ и адаптирую готовые решения. Всё, что нужно сайту для заявок: дизайн, SEO, защита, Telegram-бот и админ-панель — в одних руках.</p>
          </div>
          <div className="svc-grid">
            <Link href="/#catalog" className="svc-card">
              <div className="top"><span>Быстрый старт</span><b>{formatPrice(PRICES.ready.from)}</b></div>
              <h2>Готовый сайт под вашу нишу</h2>
              <p>Проверенная основа из каталога, адаптированная под вашу компанию: контент, контакты, цвета, мобильная версия.</p>
              <span className="more">Смотреть каталог →</span>
            </Link>
            {SERVICE_PAGES.map((p) => {
              const s = SERVICES.find((x) => x.id === p.id)!;
              return (
                <Link key={p.slug} href={'/uslugi/' + p.slug} className="svc-card">
                  <div className="top"><span>Услуга</span><b>{s.priceLabel}</b></div>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                  <span className="more">Подробнее →</span>
                </Link>
              );
            })}
          </div>
        </section>
        <CTA />
      </main>
      <Footer base="/" />
    </div>
  );
}
