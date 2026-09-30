'use client';
import { useEffect, useRef, useState } from 'react';
import type { Site } from '@/lib/data';

type Props = {
  mode: 'hero' | 'automation';
  sites: Site[];
  startId?: string;
  className?: string;
  /** Статичный кадр сцены: показывается мгновенно, пока грузится 3D, и вместо 3D там, где WebGL выключен */
  poster?: { desktop: string; mobile: string; alt?: string };
  priority?: boolean;
};

export default function Devices3D({ mode, sites, startId, className, poster, priority }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('@/lib/devices3d').then(({ mountDevices, canRun3D }) => {
      if (cancelled || !canRun3D()) return;
      cleanup = mountDevices(host, { mode, sites, startId, onReady: () => setReady(true) });
    });
    return () => { cancelled = true; cleanup?.(); };
  }, [mode, sites, startId]);
  return (
    <div ref={ref} className={'devices ' + (className || '')}>
      {poster && (
        <picture className={'devices-poster' + (ready ? ' hide' : '')}>
          <source media="(max-width: 799px)" srcSet={poster.mobile} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster.desktop} alt={poster.alt || ''} decoding={priority ? "sync" : "async"} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
        </picture>
      )}
    </div>
  );
}
