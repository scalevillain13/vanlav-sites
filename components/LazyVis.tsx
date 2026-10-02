'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Обёртка для тяжёлых декоративных иллюстраций ниже первого экрана: сам контейнер (с размерами из CSS)
 * есть в HTML сразу, а содержимое монтируется, только когда блок подъезжает к экрану.
 * Так первый экран на телефоне не тратит время на сотни невидимых элементов и их стили.
 * Текст секций остаётся в HTML — для поисковиков ничего не теряется.
 */
export default function LazyVis({ children, className, style, margin = '120% 0px', ariaHidden = true }: { children: ReactNode; className?: string; style?: CSSProperties; margin?: string; ariaHidden?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window) || location.hash) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return <div ref={ref} className={className} style={style} aria-hidden={ariaHidden || undefined}>{on ? children : null}</div>;
}
