import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1280, 1600, 1920],
    imageSizes: [52, 64, 96, 128, 256, 320],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [75, 78, 90],
  },
  async headers() {
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }];
    return [
      { source: '/sites/:path*', headers: cache },
      { source: '/brand/:path*', headers: cache },
      { source: '/fonts/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:file(favicon.ico|icon-96.png|icon-192.png|icon-512.png|apple-touch-icon.png|og.jpg)', headers: cache },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
