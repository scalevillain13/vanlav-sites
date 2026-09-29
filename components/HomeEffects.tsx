'use client';
import { useEffect, useRef } from 'react';

/** Прогресс-бар прокрутки, кастомный курсор, появление секций [data-reveal] */
export default function HomeEffects({ cursor = true }: { cursor?: boolean }) {
  const barRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const b = barRef.current; if (!b) return;
      const H = document.documentElement.scrollHeight - window.innerHeight;
      b.style.width = (H > 0 ? (window.scrollY / H) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let craf = 0;
    let onMouse: ((e: MouseEvent) => void) | undefined;
    if (cursor && window.matchMedia('(pointer:fine)').matches) {
      let tx = -100, ty = -100, x = -100, y = -100;
      const loop = () => {
        x += (tx - x) * 0.18; y += (ty - y) * 0.18;
        const c = curRef.current; if (c) c.style.transform = `translate(${x}px,${y}px)`;
        craf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
      };
      onMouse = (e: MouseEvent) => {
        tx = e.clientX; ty = e.clientY;
        if (!craf) craf = requestAnimationFrame(loop);
        const c = curRef.current; if (!c) return;
        c.style.opacity = '1';
        const t = e.target as Element | null;
        const hot = t && t.closest && t.closest('a,button,select,input,textarea,[role=tab]');
        c.classList.toggle('hot', !!hot);
      };
      window.addEventListener('mousemove', onMouse);
    }

    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter((el) => el.getBoundingClientRect().top > window.innerHeight);
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('reveal-in'); io!.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      els.forEach((el) => { el.classList.add('reveal-init'); io!.observe(el); });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (onMouse) window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(craf);
      io?.disconnect();
    };
  }, [cursor]);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="progress" aria-hidden="true"><div ref={barRef} /></div>
      <div ref={curRef} className="cursor" aria-hidden="true" />
    </>
  );
}
