'use client';
import { useEffect, useRef } from 'react';
import type { Site } from '@/lib/data';

type Props = { mode: 'hero' | 'automation'; sites: Site[]; startId?: string; className?: string };

export default function Devices3D({ mode, sites, startId, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('@/lib/devices3d').then(({ mountDevices }) => {
      if (!cancelled) cleanup = mountDevices(host, { mode, sites, startId });
    });
    return () => { cancelled = true; cleanup?.(); };
  }, [mode, sites, startId]);
  return <div ref={ref} className={'devices ' + (className || '')} aria-hidden="true" />;
}
