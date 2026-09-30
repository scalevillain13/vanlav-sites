import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND} — студия разработки сайтов`,
    short_name: BRAND,
    description: 'Разработка сайтов с нуля на заказ и готовые сайты для бизнеса',
    start_url: '/',
    display: 'standalone',
    background_color: '#0C0C0B',
    theme_color: '#0C0C0B',
    lang: 'ru',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
