'use client';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AUTHOR, CONTACT, SITES, SERVICES, EXPERIENCE, STACK } from '@/lib/data';
import { ArrowUpRight } from './Icons';

const ROLES = ['Дизайн', 'Вёрстка и код', 'Тексты', 'SEO', 'Безопасность', 'Боты и админки'];
const COLORS = ['#FF5A1F', '#FF7843', '#FF9A70', '#F1EEE7', '#C9C5BB', '#8E8A80'];
const SKILLS = ['Сайты-визитки', 'Лендинги с нуля', 'Сайты на заказ', 'Дизайн сайтов', 'Логотипы', 'SEO', 'Веб-безопасность', 'Админ-панели', 'Telegram-боты'];

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.05 3.29 9.33 7.85 10.84.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.79.55A10.53 10.53 0 0 0 23.5 12c0-6.3-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

export default function Author() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const statRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    // в HTML — итоговые числа (для поисковиков и без JS), анимация стартует с нуля
    statRefs.current.forEach((el) => { if (el && el.getBoundingClientRect().top > window.innerHeight) el.textContent = '0'; });
    const go = () => {
      setSeen(true);
      const t0 = performance.now();
      // счётчики обновляем напрямую в DOM — без перерисовки всего блока 60 раз в секунду
      const step = (t: number) => { const x = Math.min(1, (t - t0) / 1600); const k = 1 - Math.pow(1 - x, 3); statRefs.current.forEach((el) => { if (el) el.textContent = String(Math.round(Number(el.dataset.v) * k)); }); if (x < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    };
    const el = rootRef.current;
    let io: IntersectionObserver | undefined;
    if (!el || !('IntersectionObserver' in window)) go();
    else { io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { go(); io!.disconnect(); } }, { threshold: 0.2 }); io.observe(el); }

    let sraf = 0;
    const onScroll = () => {
      cancelAnimationFrame(sraf);
      sraf = requestAnimationFrame(() => {
        const r = ringRef.current, root = rootRef.current; if (!r || !root) return;
        const b = root.getBoundingClientRect();
        r.style.transform = `rotate(${(window.innerHeight - b.top) * 0.12}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { io?.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(sraf); window.removeEventListener('scroll', onScroll); };
  }, []);

  const onMove = (e: MouseEvent) => {
    const s = stageRef.current, r = rigRef.current; if (!s || !r) return;
    const b = s.getBoundingClientRect();
    const dx = (e.clientX - b.left) / b.width - 0.5, dy = (e.clientY - b.top) / b.height - 0.5;
    r.style.transform = `rotateX(${-dy * 16}deg) rotateY(${dx * 16}deg)`;
  };
  const onLeave = () => { if (rigRef.current) rigRef.current.style.transform = 'none'; };

  const a = AUTHOR;
  const C = 2 * Math.PI * 96, seg = C / ROLES.length;
  const chips = [
    { value: a.age + ' лет', label: 'возраст', x: '-2%', y: '12%', z: 120, acc: false },
    { value: a.experienceYears + ' года', label: 'в веб-разработке', x: '68%', y: '4%', z: 160, acc: true },
    { value: a.city, label: 'живу и работаю', x: '64%', y: '80%', z: 100, acc: false },
  ];
  const stats = [
    { value: a.experienceYears, label: 'года в веб-разработке', color: '#FF5A1F' },
    { value: a.age, label: 'лет', color: '#F1EEE7' },
    { value: SITES.length, label: 'готовых шаблонов', color: '#F1EEE7' },
    { value: SERVICES.length + 1, label: 'направлений услуг', color: '#F1EEE7' },
  ];
  const ringText = `${a.name} • веб-разработчик • ${a.city} • студия Ванлав • `.toUpperCase();

  return (
    <section id="about" ref={rootRef} className={'author' + (seen ? ' seen' : '')}>
      <div className="container" style={{ paddingTop: 'var(--sec-top)' }}>
        <div className="author-grid">
          <div ref={stageRef} className="author-stage" onMouseMove={onMove} onMouseLeave={onLeave}>
            <div ref={rigRef} className="author-rig">
              <div className="o1" /><div className="o2" />
              <div ref={ringRef} className="author-ring">
                <svg viewBox="0 0 400 400" aria-hidden="true">
                  <defs><path id="vl-ring" d="M200,200 m-172,0 a172,172 0 1,1 344,0 a172,172 0 1,1 -344,0" /></defs>
                  <text><textPath href="#vl-ring">{ringText}</textPath></text>
                  <circle cx="372" cy="200" r="7" fill="#FF5A1F" />
                </svg>
              </div>
              <div className="author-photo">
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {a.photo ? <img src={a.photo} alt={a.name} /> : <span className="ph">{a.name[0]}</span>}
                </div>
              </div>
              {chips.map((c, i) => (
                <span key={c.label} className={'author-chip' + (c.acc ? ' acc' : '')}
                  style={{ left: c.x, top: c.y, transform: `translateZ(${seen ? c.z : 0}px) scale(${seen ? 1 : 0.6})`, opacity: seen ? 1 : 0, transitionDelay: (0.3 + i * 0.15) + 's' }}>
                  <b>{c.value}</b><small>{c.label}</small>
                </span>
              ))}
            </div>
          </div>

          <div className="author-text">
            <span className="label">Обо мне</span>
            <h2 className="author-h">Привет, я <span>{a.name}</span></h2>
            <p className="author-bio">Мне {a.age} лет, живу в {a.city}, в веб-разработке {a.experienceYears} года. Начинал в 2022 с фронтенда, с 2024 освоил бэкенд и стал fullstack-разработчиком. Ванлав — моя студия разработки сайтов: делаю сайты с нуля на заказ и готовые решения, и всем в ней я занимаюсь один: дизайн, вёрстка, тексты, SEO, защита, запуск, а также админ-панели и Telegram-боты для заявок. Вы общаетесь напрямую с тем, кто делает ваш сайт.</p>
            <p className="author-bio" style={{ color: 'var(--muted)' }}>Заодно этот сайт — моё небольшое портфолио: ниже стек, которым пользуюсь, и ссылка на GitHub с кодом.</p>
            <div className="skills">
              <span>Что делаю:</span>
              <div>
                {SKILLS.map((s, i) => <span key={s} className="chip skill" style={{ transitionDelay: (0.4 + i * 0.07) + 's' }}><i>✦</i>{s}</span>)}
              </div>
            </div>
            <div className="skills">
              <span>Стек:</span>
              <div>
                {STACK.map((s, i) => <span key={s} className="chip skill" style={{ transitionDelay: (0.4 + i * 0.05) + 's' }}><i>✦</i>{s}</span>)}
              </div>
            </div>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener" className="btn btn-accent btn-icon">Написать {CONTACT.telegram} <span className="ic"><ArrowUpRight /></span></a>
              <a href={a.githubUrl} target="_blank" rel="noopener" className="btn btn-outline"><GithubIcon /> GitHub</a>
              <a href={CONTACT.phoneHref} className="btn btn-outline">{CONTACT.phone}</a>
            </div>
          </div>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <div key={s.label} className="card stat"><b ref={(el) => { statRefs.current[i] = el; }} data-v={s.value} style={{ color: s.color }}>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>

        <div className="author-bottom">
          <div className="card donut-card">
            <div className="donut">
              <svg viewBox="0 0 240 240" aria-hidden="true">
                <circle cx="120" cy="120" r="96" fill="none" stroke="#1C1C19" strokeWidth="22" />
                {ROLES.map((r, i) => (
                  <circle key={r} className="seg" cx="120" cy="120" r="96" fill="none" stroke={COLORS[i]} strokeWidth="22"
                    strokeDasharray={seen ? `${seg - 4} ${C}` : `0 ${C}`} strokeDashoffset={-i * seg} style={{ transitionDelay: i * 0.12 + 's' }} />
                ))}
              </svg>
              <div className="c"><b>1</b><span>человек на всех этапах</span></div>
            </div>
            <div className="roles">
              <b>Кто делает ваш сайт</b>
              {ROLES.map((r, i) => (
                <div key={r}><span><i style={{ background: COLORS[i] }} />{r}</span><small>{a.name}</small></div>
              ))}
            </div>
          </div>
          <div className="card timeline">
            <div className="timeline-head"><b>{a.experienceYears} года в веб-разработке</b><span>{a.city}</span></div>
            <div className="tl-bar"><div /></div>
            <div className="tl-years">
              {EXPERIENCE.map((e) => (
                <div key={e.year}><b>{e.year}</b><small>{e.title}</small></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
