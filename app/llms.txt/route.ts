// /llms.txt — краткое описание сайта для ИИ-ассистентов и поисковых ИИ (Яндекс Нейро, ChatGPT, Perplexity)
import { SERVICES, SITES, CONTACT, AUTHOR } from '@/lib/data';
import { NICHES } from '@/lib/niche-content';
import { ARTICLES } from '@/lib/blog-content';
import { SERVICE_PAGES } from '@/lib/services-content';
import { abs } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const lines = [
    '# Ванлав — студия разработки сайтов',
    '',
    `> Разработка сайтов для малого бизнеса с нуля и на готовой основе. ${AUTHOR.city} и вся Россия. Fullstack-разработчик ${AUTHOR.name}. Связь: Telegram ${CONTACT.telegram}, телефон ${CONTACT.phone}.`,
    '',
    '## Услуги',
    ...SERVICES.map((s) => { const p = SERVICE_PAGES.find((x) => x.id === s.id); return `- [${s.title}](${abs('/uslugi/' + (p?.slug || ''))}): ${s.text} ${s.priceLabel}.`; }),
    '',
    '## Сайты для ниш',
    ...NICHES.map((n) => `- [${n.h1}](${abs('/sajt-dlya/' + n.slug)}): ${n.metaDescription}`),
    '',
    '## Живые сайты и шаблоны',
    ...SITES.map((s) => `- [${s.title}](${abs(s.url)}): ${s.description}${s.live ? ` Живой сайт: ${s.demoUrl}` : ''}`),
    '',
    '## Блог',
    ...ARTICLES.map((a) => `- [${a.title}](${abs('/blog/' + a.slug)}): ${a.description}`),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
