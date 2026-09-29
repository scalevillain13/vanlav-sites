import Link from 'next/link';
import type { Site } from '@/lib/data';
import SitePreview from './SitePreview';

export default function SiteCard({ site }: { site: Site }) {
  return (
    <Link href={site.url} className="site-card">
      <div className="frame">
        <div className="bar">
          <span className="dots"><i /><i /><i /></span>
          <small>{site.domain}</small>
          {site.live && <span className="live-dot">Живой сайт</span>}
        </div>
        <div className="shot">
          <div className="scroll"><SitePreview site={site} /></div>
          <span className="open-pill">Открыть шаблон <i>→</i></span>
        </div>
      </div>
      <div className="meta">
        <div className="meta-top">
          <span>{site.niche}</span>
          <span className="pp">{site.priceLabel}</span>
        </div>
        <span className="ttl">{site.title}</span>
        <p>{site.description}</p>
        <span className="more">Смотреть <i>→</i></span>
      </div>
    </Link>
  );
}
