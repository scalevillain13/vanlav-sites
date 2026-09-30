import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Ванлав Сайты — студия разработки сайтов',
  description: 'Студия разработки сайтов: сайты полностью с нуля на заказ — от идеи и дизайна до запуска, а также готовые сайты под вашу нишу от 9 900 ₽. SEO, Telegram-боты и админ-панели.',
  openGraph: {
    title: 'Ванлав Сайты — студия разработки сайтов',
    description: 'Разработка сайтов с нуля на заказ и готовые решения для бизнеса.',
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
