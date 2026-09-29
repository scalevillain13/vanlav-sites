import type { MetadataRoute } from 'next';
import { SITES } from '@/lib/data';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE + '/', changeFrequency: 'weekly', priority: 1 },
    ...SITES.map((s) => ({ url: BASE + s.url, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
