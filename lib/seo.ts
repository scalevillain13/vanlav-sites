import { AUTHOR, CONTACT, PRICES, SERVICES, SITES } from './data';
import { HOME_FAQ, SERVICE_PAGES, type Faq } from './services-content';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000')
).replace(/\/$/, '');

export const BRAND = 'Ванлав';
export const CITY = AUTHOR.city;
export const abs = (path: string) => SITE_URL + (path.startsWith('/') ? path : '/' + path);

export const HOME_TITLE = `Разработка сайтов в ${CITY} под ключ — студия «${BRAND}»`;
export const HOME_DESCRIPTION =
  'Студия разработки сайтов: сайты с нуля на заказ, лендинги, визитки и многостраничные сайты под ключ, а также готовые сайты для бизнеса от 9 900 ₽. Уникальный дизайн, SEO, Telegram-боты. Сочи и вся Россия.';
export const KEYWORDS = [
  'разработка сайтов', 'создание сайтов', 'разработка сайтов Сочи', 'создание сайтов Сочи', 'сайт под ключ',
  'заказать сайт', 'сайт с нуля', 'сайт для бизнеса', 'лендинг на заказ', 'сайт-визитка', 'готовые сайты',
  'веб-студия Сочи', 'SEO продвижение', 'Telegram-бот для заявок',
];

const ORG_ID = abs('/#organization');
const WEBSITE_ID = abs('/#website');

export function organizationLd() {
  return {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': ORG_ID,
    name: BRAND,
    alternateName: ['Ванлав Сайты', 'Vanlav', 'Студия Ванлав'],
    description: HOME_DESCRIPTION,
    url: abs('/'),
    logo: abs('/icon-512.png'),
    image: abs('/og.png'),
    priceRange: '₽₽',
    currenciesAccepted: 'RUB',
    address: { '@type': 'PostalAddress', addressLocality: CITY, addressRegion: 'Краснодарский край', addressCountry: 'RU' },
    areaServed: [{ '@type': 'City', name: CITY }, { '@type': 'Country', name: 'Россия' }],
    founder: { '@type': 'Person', name: AUTHOR.name, jobTitle: 'Веб-разработчик' },
    foundingDate: String(AUTHOR.startYear),
    sameAs: [CONTACT.telegramUrl],
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', url: CONTACT.telegramUrl, availableLanguage: ['ru'] },
    knowsAbout: ['Разработка сайтов', 'Веб-дизайн', 'SEO', 'Telegram-боты', 'Админ-панели', 'Веб-безопасность'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги студии',
      itemListElement: [
        { '@type': 'Offer', price: PRICES.ready.from, priceCurrency: 'RUB', itemOffered: { '@type': 'Service', name: 'Готовый сайт с адаптацией под бизнес', url: abs('/#catalog') } },
        ...SERVICES.map((s) => {
          const page = SERVICE_PAGES.find((p) => p.id === s.id);
          return {
            '@type': 'Offer', price: s.from, priceCurrency: 'RUB',
            itemOffered: { '@type': 'Service', name: s.title, description: s.text, url: page ? abs('/uslugi/' + page.slug) : abs('/#services') },
          };
        }),
      ],
    },
  };
}

export function websiteLd() {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: abs('/'), name: BRAND, inLanguage: 'ru-RU', publisher: { '@id': ORG_ID } };
}

export function faqLd(faq: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function breadcrumbsLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function catalogLd() {
  return {
    '@type': 'ItemList',
    name: 'Готовые сайты для бизнеса',
    itemListElement: SITES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(s.url), name: `${s.title} — ${s.tagline}` })),
  };
}

export function homeLd() {
  return { '@context': 'https://schema.org', '@graph': [organizationLd(), websiteLd(), faqLd(HOME_FAQ), catalogLd()] };
}

export function serviceLd(opts: { name: string; description: string; path: string; price: number; faq: Faq[]; crumbs: { name: string; path: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: opts.name,
        description: opts.description,
        url: abs(opts.path),
        serviceType: opts.name,
        provider: { '@id': ORG_ID },
        areaServed: [{ '@type': 'City', name: CITY }, { '@type': 'Country', name: 'Россия' }],
        offers: { '@type': 'Offer', price: opts.price, priceCurrency: 'RUB', url: abs(opts.path), availability: 'https://schema.org/InStock' },
      },
      breadcrumbsLd(opts.crumbs),
      faqLd(opts.faq),
      organizationLd(),
    ],
  };
}

export function templateLd(site: (typeof SITES)[number]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `${site.title} — ${site.tagline}`,
        description: site.description,
        url: abs(site.url),
        serviceType: 'Готовый сайт с адаптацией под бизнес',
        image: site.cover || site.image ? abs(site.cover || site.image) : undefined,
        provider: { '@id': ORG_ID },
        offers: { '@type': 'Offer', price: site.price, priceCurrency: 'RUB', url: abs(site.url), availability: 'https://schema.org/InStock' },
      },
      breadcrumbsLd([{ name: 'Главная', path: '/' }, { name: 'Готовые сайты', path: '/#catalog' }, { name: site.title, path: site.url }]),
      organizationLd(),
    ],
  };
}
