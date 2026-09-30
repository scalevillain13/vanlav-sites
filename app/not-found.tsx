import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--head)', fontSize: 'clamp(80px,16vw,180px)', fontWeight: 700, color: '#FF5A1F', lineHeight: 1, letterSpacing: '-0.06em' }}>404</span>
        <p style={{ margin: 0, fontSize: 18, color: 'var(--muted)' }}>Такой страницы нет. Зато можно заказать сайт или посмотреть готовые.</p>
        <Link href="/" className="btn btn-accent">На главную →</Link>
      </div>
    </div>
  );
}
