import type { Metadata, Viewport } from 'next';
import './fonts';
import './globals.css';
import YandexMetrika from '@/components/YandexMetrika';
import { BRAND, HOME_DESCRIPTION, HOME_TITLE, KEYWORDS, SITE_URL } from '@/lib/seo';

const verification: Metadata['verification'] = {};
if (process.env.NEXT_PUBLIC_YANDEX_VERIFICATION) verification.yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
if (process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION) verification.google = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${BRAND}` },
  description: HOME_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: BRAND,
  authors: [{ name: 'Александр', url: SITE_URL }],
  creator: BRAND,
  publisher: BRAND,
  category: 'business',
  formatDetection: { telephone: false },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: BRAND,
    url: '/',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${BRAND} — студия разработки сайтов` }],
  },
  twitter: { card: 'summary_large_image', title: HOME_TITLE, description: HOME_DESCRIPTION, images: ['/og.png'] },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon-96.png', sizes: '96x96', type: 'image/png' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  verification,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0C0C0B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
