'use client';
import { useEffect, useRef } from 'react';

/** Прогресс-бар прокрутки, кастомный курсор, появление секций [data-reveal] */
export default function HomeEffects({ cursor = true }: { cursor?: boolean }) {
  const barRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sraf = 0;
    const onScroll = () => {
      if (sraf) return;
      sraf = requestAnimationFrame(() => {
        sraf = 0;
        const b = barRef.current; if (!b) return;
        const H = document.documentElement.scrollHeight - window.innerHeight;
        b.style.transform = `scaleX(${H > 0 ? Math.min(1, window.scrollY / H) : 0})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let craf = 0;
    let onMouse: ((e: MouseEvent) => void) | undefined;
    if (cursor && window.matchMedia('(pointer: fine) and (hover: hover)').matches) {
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
      window.addEventListener('mousemove', onMouse, { passive: true });
    }

    // Ленивый рендер секций (content-visibility) ускоряет первую отрисовку. Чтобы переходы по якорям
    // были точными, после загрузки в простое (или сразу при клике по ссылке-якорю) дорендериваем всё.
    const root = document.documentElement;
    const cvDone = () => root.classList.add('cv-done');
    const onAnchor = (e: MouseEvent) => { const a = (e.target as Element | null)?.closest?.('a[href*="#"]'); if (a) cvDone(); };
    document.addEventListener('click', onAnchor, true);
    let idleId = 0;
    const idle = () => { const w = window as Window; idleId = typeof w.requestIdleCallback === 'function' ? w.requestIdleCallback(cvDone, { timeout: 4000 }) : setTimeout(cvDone, 2500) as unknown as number; };
    if (document.readyState === 'complete') setTimeout(idle, 1500); else window.addEventListener('load', () => setTimeout(idle, 1500), { once: true });
    if (location.hash) cvDone();

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
      cancelAnimationFrame(sraf);
      io?.disconnect();
      document.removeEventListener('click', onAnchor, true);
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
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
