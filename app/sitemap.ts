import type { MetadataRoute } from 'next';
import { SITES } from '@/lib/data';
import { SERVICE_PAGES } from '@/lib/services-content';
import { abs } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: abs('/uslugi'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...SERVICE_PAGES.map((p) => ({ url: abs('/uslugi/' + p.slug), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...SITES.map((s) => ({
      url: abs(s.url), lastModified: now, changeFrequency: 'monthly' as const, priority: s.live ? 0.7 : 0.5,
      images: s.cover || s.image ? [abs(s.cover || s.image)] : undefined,
    })),
  ];
}
