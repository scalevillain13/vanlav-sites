'use client';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AUTHOR, CONTACT, SITES, SERVICES } from '@/lib/data';

const ROLES = ['Дизайн', 'Вёрстка и код', 'Тексты', 'SEO', 'Безопасность', 'Боты и админки'];
const COLORS = ['#FF5A1F', '#FF7843', '#FF9A70', '#F1EEE7', '#C9C5BB', '#8E8A80'];
const SKILLS = ['Сайты-визитки', 'Лендинги с нуля', 'Сайты на заказ', 'Дизайн сайтов', 'Логотипы', 'SEO', 'Веб-безопасность', 'Админ-панели', 'Telegram-боты'];

export default function Author() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [k, setK] = useState(0);

  useEffect(() => {
    let raf = 0;
    const go = () => {
      setSeen(true);
      const t0 = performance.now();
      const step = (t: number) => { const x = Math.min(1, (t - t0) / 1600); setK(1 - Math.pow(1 - x, 3)); if (x < 1) raf = requestAnimationFrame(step); };
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
  const years: number[] = []; for (let y = a.startYear; y <= a.startYear + a.experienceYears; y++) years.push(y);
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
            <p className="author-bio">Мне {a.age} лет, живу в {a.city}, в веб-разработке {a.experienceYears} года. Ванлав — моя студия разработки сайтов: делаю сайты с нуля на заказ и готовые решения, и всем в ней я занимаюсь один: дизайн, вёрстка, тексты, SEO, защита, запуск, а также админ-панели и Telegram-боты для заявок. Вы общаетесь напрямую с тем, кто делает ваш сайт.</p>
            <div className="skills">
              <span>Что делаю:</span>
              <div>
                {SKILLS.map((s, i) => <span key={s} className="chip skill" style={{ transitionDelay: (0.4 + i * 0.07) + 's' }}><i>✦</i>{s}</span>)}
              </div>
            </div>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener" className="btn btn-accent btn-icon">Написать {CONTACT.telegram} <span className="ic">↗</span></a>
              <a href="#services" className="btn btn-outline">Услуги и цены</a>
            </div>
          </div>
        </div>

        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="card stat"><b style={{ color: s.color }}>{Math.round(s.value * k)}</b><span>{s.label}</span></div>
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
              {years.map((y, i) => (
                <div key={y}><b>{y}</b><small>{i === 0 ? 'Начало в веб-разработке' : i === years.length - 1 ? 'Студия Ванлав' : ''}</small></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
