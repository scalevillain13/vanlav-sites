import type { MetadataRoute } from 'next';
import { SITES } from '@/lib/data';
import { SERVICE_PAGES } from '@/lib/services-content';
import { abs } from '@/lib/seo';
import { NICHES } from '@/lib/niche-content';
import { ARTICLES } from '@/lib/blog-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: abs('/uslugi'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...SERVICE_PAGES.map((p) => ({ url: abs('/uslugi/' + p.slug), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: abs('/sajt-dlya'), lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    ...NICHES.map((n) => ({ url: abs('/sajt-dlya/' + n.slug), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: abs('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    ...ARTICLES.map((a) => ({ url: abs('/blog/' + a.slug), lastModified: new Date(a.date), changeFrequency: 'yearly' as const, priority: 0.6 })),
    ...SITES.map((s) => ({
      url: abs(s.url), lastModified: now, changeFrequency: 'monthly' as const, priority: s.live ? 0.7 : 0.5,
      images: s.cover || s.image ? [abs(s.cover || s.image)] : undefined,
    })),
  ];
}
