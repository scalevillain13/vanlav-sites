import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Ванлав Сайты — готовые сайты для бизнеса',
  description: 'Студия готовых сайтов: выберите дизайн под свою нишу — адаптирую его под вашу компанию, услуги и контакты. От 9 900 ₽. Также сайты с нуля, SEO, Telegram-боты и админ-панели.',
  openGraph: {
    title: 'Ванлав Сайты — готовые сайты для бизнеса',
    description: 'Готовый сайт для бизнеса. Без разработки с нуля. От 9 900 ₽.',
    locale: 'ru_RU',
    type: 'website',
    siteName: 'Ванлав Сайты',
  },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0C0C0B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&family=Onest:wght@400;500;600;700&family=Commissioner:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Serif:wght@400;500;600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
