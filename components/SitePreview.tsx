import type { CSSProperties } from 'react';
import type { Site } from '@/lib/data';

const dark = (hex?: string) => {
  const h = (hex || '#fff').replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
};

/** Макет сайта-шаблона (или скриншот, если задан site.image). Масштабируется по ширине контейнера (cqw). */
export default function SitePreview({ site, eager = false, thumb = false }: { site: Site; eager?: boolean; thumb?: boolean }) {
  const p = { panel: '#111214', panelInk: '#FFFFFF', ...site.preview };

  if (site.image) {
    return (
      <div style={{ width: '100%', background: p.bg, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={(thumb && site.cover) || site.image} alt={site.title} loading={eager ? 'eager' : 'lazy'} decoding="async" style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
    );
  }

  const isStack = p.variant === 'stack';
  const serif = !!p.serif;
  const headFont = serif ? "'IBM Plex Serif', Georgia, serif" : "'Commissioner', sans-serif";
  const weight = p.weight || 700;
  const headTracking = serif ? '-0.02em' : '-0.035em';
  const caseT: CSSProperties['textTransform'] = p.upper ? 'uppercase' : 'none';
  const navBg = isStack ? p.heroBg : p.bg;
  const navInk = isStack ? p.heroInk : p.ink;
  const navLine = isStack ? p.heroLine || p.line : p.line;
  const markRadius = serif ? '50%' : '0.3cqw';
  const btnRadius = serif ? '0' : p.upper ? '0.3cqw' : '10cqw';
  const panelRadius = serif ? '0' : '1.4cqw';
  const cardRadius = serif ? '0' : p.upper ? '0.3cqw' : '0.7cqw';
  const hatch = dark(p.panel) ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const fieldBg = dark(p.accent) ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)';
  const sendBg = dark(p.accent) ? '#FFFFFF' : '#111111';
  const sendInk = dark(p.accent) ? '#111111' : '#FFFFFF';
  const btn = (extra: CSSProperties): CSSProperties => ({ padding: '1.3cqw 2.2cqw', whiteSpace: 'nowrap', borderRadius: btnRadius, fontSize: '1.15cqw', ...extra });

  return (
    <div style={{ containerType: 'inline-size', width: '100%', background: p.bg, color: p.ink, fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1.3, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.9cqw 4cqw', background: navBg, color: navInk, borderBottom: `1px solid ${navLine}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8cqw', fontFamily: headFont, fontWeight: 700, fontSize: '1.55cqw', letterSpacing: '-0.01em' }}>
          <span style={{ width: '1.5cqw', height: '1.5cqw', borderRadius: markRadius, background: p.accent, display: 'block' }} />
          <span>{p.brand}</span>
        </div>
        <div style={{ display: 'flex', gap: '2.4cqw', fontSize: '1.08cqw' }}>
          {p.nav.map((n) => <span key={n}>{n}</span>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4cqw' }}>
          <span style={{ fontSize: '1.1cqw', fontWeight: 600 }}>{p.phone}</span>
          <span style={{ background: p.accent, color: p.accentInk, padding: '0.8cqw 1.4cqw', whiteSpace: 'nowrap', borderRadius: btnRadius, fontSize: '1cqw', fontWeight: 600 }}>{p.cta}</span>
        </div>
      </div>

      {!isStack ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3cqw', padding: '5cqw 4cqw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2cqw' }}>
            <span style={{ fontSize: '1cqw', letterSpacing: '0.12em', textTransform: 'uppercase', color: p.accent, fontWeight: 600 }}>{p.eyebrow}</span>
            <div style={{ fontFamily: headFont, fontSize: '4.5cqw', lineHeight: 1.02, fontWeight: weight, letterSpacing: headTracking, textTransform: caseT }}>{p.headline}</div>
            <div style={{ fontSize: '1.35cqw', color: p.muted, maxWidth: '36cqw' }}>{p.sub}</div>
            <div style={{ display: 'flex', gap: '1cqw', marginTop: '0.6cqw' }}>
              <span style={btn({ background: p.accent, color: p.accentInk, fontWeight: 600 })}>{p.cta}</span>
              <span style={btn({ border: `1px solid ${p.line}`, fontWeight: 500 })}>{p.cta2}</span>
            </div>
            <div style={{ display: 'flex', gap: '2cqw', marginTop: '1.4cqw', fontSize: '1cqw', color: p.muted }}>
              {p.points.map((pt) => (
                <span key={pt} style={{ display: 'flex', alignItems: 'center', gap: '0.6cqw' }}>
                  <span style={{ width: '0.6cqw', height: '0.6cqw', borderRadius: '50%', background: p.accent, display: 'block' }} />{pt}
                </span>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: '34cqw', borderRadius: panelRadius, background: p.panel, color: p.panelInk, overflow: 'hidden', padding: '2.6cqw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(135deg, ${hatch} 0 1px, transparent 1px 1.3cqw)` }} />
            <span style={{ position: 'relative', fontSize: '1cqw', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{p.panelLabel}</span>
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: headFont, fontSize: '10.5cqw', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.05em' }}>{p.badge}</div>
              <div style={{ fontSize: '1.3cqw', marginTop: '1.2cqw', maxWidth: '24cqw' }}>{p.badgeCaption}</div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '6cqw 4cqw 4cqw', background: p.heroBg, color: p.heroInk }}>
          <span style={{ fontSize: '1cqw', letterSpacing: '0.12em', textTransform: 'uppercase', color: p.accent, fontWeight: 600 }}>{p.eyebrow}</span>
          <div style={{ fontFamily: headFont, fontSize: '6.2cqw', lineHeight: 0.98, fontWeight: weight, letterSpacing: headTracking, textTransform: caseT, maxWidth: '78cqw', marginTop: '1.8cqw' }}>{p.headline}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '4cqw', marginTop: '3cqw' }}>
            <div style={{ fontSize: '1.4cqw', color: p.heroMuted, maxWidth: '40cqw' }}>{p.sub}</div>
            <div style={{ display: 'flex', gap: '1cqw' }}>
              <span style={btn({ background: p.accent, color: p.accentInk, fontWeight: 600 })}>{p.cta}</span>
              <span style={btn({ border: `1px solid ${p.heroLine}`, fontWeight: 500 })}>{p.cta2}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.4cqw', marginTop: '4.5cqw' }}>
            {p.points.map((pt, i) => (
              <div key={pt} style={{ borderTop: `1px solid ${p.heroLine}`, paddingTop: '1.3cqw', display: 'flex', gap: '1.2cqw', fontSize: '1.2cqw' }}>
                <span style={{ color: p.accent, fontWeight: 600 }}>{'0' + (i + 1)}</span><span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '5cqw 4cqw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.4cqw' }}>
          <div style={{ fontFamily: headFont, fontSize: '3cqw', fontWeight: weight, letterSpacing: headTracking, textTransform: caseT }}>Услуги</div>
          <span style={{ fontSize: '1.1cqw', color: p.muted }}>Все услуги →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.2cqw' }}>
          {p.services.map((s, i) => (
            <div key={s} style={{ background: p.surface, border: `1px solid ${p.line}`, borderRadius: cardRadius, padding: '1.8cqw', minHeight: '14cqw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1cqw', color: p.accent, fontWeight: 600 }}>{'0' + (i + 1)}</span>
              <div>
                <div style={{ fontFamily: headFont, fontSize: '1.6cqw', fontWeight: 600, lineHeight: 1.15 }}>{s}</div>
                <div style={{ fontSize: '1cqw', color: p.muted, marginTop: '0.8cqw' }}>Подробнее →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '0 4cqw 4cqw', padding: '3.4cqw', borderRadius: panelRadius, background: p.accent, color: p.accentInk, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '3cqw' }}>
        <div>
          <div style={{ fontFamily: headFont, fontSize: '2.8cqw', fontWeight: weight, letterSpacing: headTracking, lineHeight: 1.05 }}>{p.contactTitle}</div>
          <div style={{ fontSize: '1.2cqw', marginTop: '0.8cqw' }}>{p.contactSub}</div>
        </div>
        <div style={{ display: 'flex', gap: '1cqw' }}>
          <span style={{ background: fieldBg, padding: '1.3cqw 2cqw', whiteSpace: 'nowrap', borderRadius: btnRadius, fontSize: '1.1cqw', width: '14cqw', color: '#555' }}>Ваше имя</span>
          <span style={{ background: fieldBg, padding: '1.3cqw 2cqw', whiteSpace: 'nowrap', borderRadius: btnRadius, fontSize: '1.1cqw', width: '14cqw', color: '#555' }}>Телефон</span>
          <span style={{ background: sendBg, color: sendInk, padding: '1.3cqw 2cqw', whiteSpace: 'nowrap', borderRadius: btnRadius, fontSize: '1.1cqw', fontWeight: 600 }}>Отправить</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2cqw 4cqw', borderTop: `1px solid ${p.line}`, fontSize: '1cqw', color: p.muted }}>
        <span>{p.brand}</span><span>{p.phone}</span><span>{site.domain}</span>
      </div>
    </div>
  );
}
