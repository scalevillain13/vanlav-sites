import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import SitePreview from '@/components/SitePreview';
import { SITES, findSite } from '@/lib/data';

export const dynamicParams = false;
export function generateStaticParams() {
  return SITES.map((s) => ({ id: s.id }));
}

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const site = findSite(id);
  return site ? { title: `Демо · ${site.title} — Ванлав Сайты`, robots: { index: false } } : {};
}

export default async function DemoPage({ params }: Params) {
  const { id } = await params;
  const site = findSite(id);
  if (!site) notFound();
  if (site.live) redirect(site.demoUrl);
  return (
    <div className="demo-page">
      <div className="demo-bar">
        <Link href={site.url}>← <b>Ванлав <span>Сайты</span></b></Link>
        <span className="mid">Демо · {site.title}</span>
        <Link href={site.url + '#order'} className="order">Заказать</Link>
      </div>
      <SitePreview site={site} eager />
    </div>
  );
}
