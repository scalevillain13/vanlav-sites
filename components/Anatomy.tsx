'use client';
import { useEffect, useRef, useState } from 'react';
import { Doodle, Note } from './Doodle';

/**
 * «Анатомия сайта»: при прокрутке живой сайт Lumé Studio поворачивается в изометрию и раскладывается
 * на слои — каркас, дизайн, код, контент. На каждом шаге рядом появляется «улика» этого этапа:
 * палитра и шрифты, успешная сборка, фото, поисковая выдача и Lighthouse, заявка в Telegram.
 * Чистый CSS 3D: текст чёткий, работает в Safari, без WebGL.
 */
const STEPS = [
  { title: 'Каркас', text: 'Сначала структура: какие блоки нужны, в каком порядке их читают и где кнопка записи.' },
  { title: 'Дизайн', text: 'Палитра, шрифты, сетка и фото-подача — под нишу и характер студии, а не из шаблона.' },
  { title: 'Вёрстка и код', text: 'Собираю на React и Next.js: адаптив под все экраны, анимации, формы записи.' },
  { title: 'Контент', text: 'Тексты, фото, цены и контакты — всё, что убеждает клиента записаться.' },
  { title: 'SEO и скорость', text: 'Мета-теги и разметка для Яндекса и Google, загрузка меньше секунды.' },
  { title: 'Заявки', text: 'Каждая запись с сайта сразу приходит вам в Telegram — с кнопками «Принять» и «Перезвонить».' },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const VB = '0 0 1901 1199';

// координаты повторяют первый экран beauty-chi-ochre.vercel.app (1901×1199)
function Wire() {
  const s = { fill: 'none', stroke: '#A4A095', strokeWidth: 3, strokeDasharray: '12 9' } as const;
  return (
    <svg viewBox={VB} aria-hidden="true">
      <rect x="50" y="18" width="1800" height="78" rx="39" {...s} />
      <rect x="80" y="38" width="140" height="38" {...s} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={665 + i * 115} y="48" width="90" height="20" {...s} />)}
      <rect x="1670" y="31" width="168" height="52" rx="26" {...s} />
      <rect x="70" y="170" width="500" height="18" {...s} />
      <rect x="72" y="250" width="555" height="130" {...s} />
      <rect x="230" y="440" width="547" height="100" {...s} />
      <rect x="70" y="595" width="602" height="95" {...s} />
      <rect x="70" y="765" width="442" height="120" {...s} />
      <rect x="70" y="931" width="346" height="86" rx="43" {...s} />
      <rect x="433" y="931" width="285" height="86" rx="43" {...s} />
      {[0, 1, 2].map((i) => <rect key={i} x={70 + i * 248} y="1095" width="150" height="80" {...s} />)}
      <path d="M1252 1018 V 530 A 290 290 0 0 1 1832 530 V 1018 Z" {...s} />
      <line x1="1252" y1="1018" x2="1832" y2="242" {...s} /><line x1="1832" y1="1018" x2="1252" y2="242" {...s} />
      <rect x="965" y="300" width="317" height="400" rx="20" transform="rotate(-6 1123 500)" {...s} />
      <circle cx="1195" cy="957" r="150" {...s} />
      <circle cx="1251" cy="312" r="84" {...s} />
      <rect x="1557" y="957" width="281" height="119" rx="24" {...s} />
    </svg>
  );
}

function Design() {
  const ink = '#1A1614', br = '#6E4A33', bg = '#F5EFE7', mu = '#8A8174';
  return (
    <svg viewBox={VB} aria-hidden="true">
      <rect width="1901" height="1199" fill={bg} />
      <rect x="50" y="18" width="1800" height="78" rx="39" fill="#F1EBE2" stroke="#E3DBCF" strokeWidth="2" />
      <text x="80" y="72" fontFamily="Georgia, serif" fontStyle="italic" fontSize="40" fill={ink}>Lumé</text>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={665 + i * 115} y="52" width="88" height="12" rx="6" fill="#B9B0A3" />)}
      <rect x="1670" y="31" width="168" height="52" rx="26" fill={ink} />
      <rect x="70" y="174" width="420" height="10" rx="5" fill="#B9B0A3" />
      <text x="70" y="370" fontFamily="Georgia, serif" fontSize="150" fill={ink}>Красота,</text>
      <text x="228" y="530" fontFamily="Georgia, serif" fontSize="150" fill={ink}>которую</text>
      <text x="70" y="680" fontFamily="Georgia, serif" fontStyle="italic" fontSize="150" fill={br}>замечают</text>
      {[0, 1, 2, 3].map((i) => <rect key={i} x="70" y={770 + i * 32} width={i === 3 ? 170 : 430} height="13" rx="6" fill={mu} />)}
      <rect x="70" y="931" width="346" height="86" rx="43" fill={br} />
      <rect x="433" y="931" width="285" height="86" rx="43" fill="#FFFFFF" />
      {[0, 1, 2].map((i) => <g key={i}><rect x={70 + i * 248} y="1100" width="120" height="40" rx="6" fill={ink} /><rect x={70 + i * 248} y="1155" width="150" height="10" rx="5" fill={mu} /></g>)}
      <path d="M1252 1018 V 530 A 290 290 0 0 1 1832 530 V 1018 Z" fill="#C58B5C" />
      <path d="M1252 1018 V 700 C 1400 640, 1600 720, 1832 640 V 1018 Z" fill="#8E5634" />
      <rect x="965" y="300" width="317" height="400" rx="20" transform="rotate(-6 1123 500)" fill="#E9E3DA" />
      <circle cx="1195" cy="957" r="150" fill="#D9A27C" stroke={bg} strokeWidth="12" />
      <circle cx="1251" cy="312" r="84" fill={bg} stroke="#E3DBCF" strokeWidth="2" />
      <circle cx="1251" cy="312" r="32" fill={br} />
      <rect x="1565" y="535" width="230" height="63" rx="31" fill={ink} />
      <rect x="1557" y="957" width="281" height="119" rx="24" fill="#FBF8F3" />
      {[0, 1, 2].map((i) => <rect key={i} x={1582 + i * 80} y="1012" width="70" height="40" rx="20" fill={i === 0 ? ink : '#EDE7DE'} />)}
    </svg>
  );
}

function Code() {
  return (
    <pre className="anat-code" aria-hidden="true">
      <code>
        <i className="k">export default function</i> <i className="f">Hero</i>() {'{'}{'\n'}
        {'  '}<i className="k">return</i> ({'\n'}
        {'    '}<i className="t">&lt;section</i> <i className="a">className</i>=<i className="s">&quot;hero&quot;</i><i className="t">&gt;</i>{'\n'}
        {'      '}<i className="t">&lt;h1&gt;</i>Красота, <i className="t">&lt;em&gt;</i>которую замечают<i className="t">&lt;/em&gt;&lt;/h1&gt;</i>{'\n'}
        {'      '}<i className="t">&lt;Button</i> <i className="a">href</i>=<i className="s">&quot;#booking&quot;</i><i className="t">&gt;</i>Выбрать время<i className="t">&lt;/Button&gt;</i>{'\n'}
        {'      '}<i className="t">&lt;Slots</i> <i className="a">today</i>={'{'}[<i className="s">&apos;14:30&apos;</i>, <i className="s">&apos;17:00&apos;</i>, <i className="s">&apos;19:30&apos;</i>]{'}'} <i className="t">/&gt;</i>{'\n'}
        {'      '}<i className="t">&lt;Rating</i> <i className="a">value</i>={'{'}<i className="n">4.9</i>{'}'} <i className="a">reviews</i>={'{'}<i className="n">2340</i>{'}'} <i className="t">/&gt;</i>{'\n'}
        {'    '}<i className="t">&lt;/section&gt;</i>{'\n'}
        {'  '});{'\n'}
        {'}'}{'\n'}
        {'\n'}
        <i className="f">.hero em</i> {'{'} <i className="a">font-style</i>: italic; <i className="a">color</i>: <i className="n">#6E4A33</i>; {'}'}{'\n'}
        <i className="c">@media</i> (<i className="a">max-width</i>: <i className="n">700px</i>) {'{'} <i className="f">.hero</i> {'{'} <i className="a">grid</i>: auto / 1fr; {'}'} {'}'}
      </code>
    </pre>
  );
}

function Gauge({ label }: { label: string }) {
  return (
    <span className="lh-g">
      <svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18" className="tr" /><circle cx="22" cy="22" r="18" className="v" /></svg>
      <b>100</b><small>{label}</small>
    </span>
  );
}

export default function Anatomy() {
  const rootRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);
  // тяжёлые иллюстрации монтируем, только когда секция подъезжает к экрану
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = rootRef.current; if (!el) return;
    if (!('IntersectionObserver' in window) || location.hash) { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: '150% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const stepRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current, rig = rigRef.current;
    if (!root || !rig) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true); setStep(5); stepRef.current = 5;
      rig.style.setProperty('--tilt', '1'); rig.style.setProperty('--s', '1'); rig.parentElement?.classList.add('split');
      return;
    }
    let raf = 0, visible = false;
    const update = () => {
      raf = 0;
      const b = root.getBoundingClientRect();
      const span = root.offsetHeight - window.innerHeight;
      const p = clamp(-b.top / Math.max(1, span));
      rig.style.setProperty('--tilt', ease(clamp(p / 0.12)).toFixed(4));
      const sep = ease(clamp((p - 0.03) / 0.4));
      rig.style.setProperty('--s', sep.toFixed(4));
      rig.style.setProperty('--spin', (p * 10 - 5).toFixed(2) + 'deg');
      rig.parentElement?.classList.toggle('split', sep > 0.3);
      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
      const st = Math.min(5, Math.floor(p * 6.2));
      if (st !== stepRef.current) { stepRef.current = st; setStep(st); }
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); }, { rootMargin: '200px 0px' });
    io.observe(root);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const layers = [
    { key: 'wire', name: 'Каркас', el: <Wire /> },
    { key: 'design', name: 'Дизайн', el: <Design /> },
    { key: 'code', name: 'Код', el: <Code /> },
    // eslint-disable-next-line @next/next/no-img-element
    { key: 'content', name: 'Контент', el: <img src="/sites/lume/hero.webp" alt="" width={1901} height={1199} loading="lazy" decoding="async" /> },
  ];
  const on = (i: number) => (step === i ? ' on' : '');

  return (
    <section id="anatomy" ref={rootRef} className={'anat' + (still ? ' still' : '')} aria-labelledby="anat-h">
      <div className="anat-sticky">
        <div className="anat-copy">
          <span className="label">Что внутри сайта</span>
          <h2 id="anat-h" className="h2">Один сайт — шесть слоёв работы</h2>
          <p className="anat-sub">Разбираю на примере живого сайта <b>Lumé Studio</b> — листайте вниз.</p>
          <div className="anat-list">
            <span className="anat-rail"><span ref={barRef} /></span>
            <ol className="anat-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className={i === step ? 'on' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>
                  <b><span>{String(i + 1).padStart(2, '0')}</span>{s.title}{i < step && <Doodle kind="check" className="done-ck" />}</b>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="anat-stage" data-step={step}>
          <div className="anat-floor" aria-hidden="true" />
          <div ref={rigRef} className="anat-rig">
            {layers.map((l, i) => (
              <div key={l.key} className={'anat-layer L-' + l.key + (step <= 3 && step !== i ? ' dim' : '') + (step === i ? ' cur' : '')} style={{ ['--i' as string]: i }}>
                {near && l.el}
                <span className="anat-tag">{String(i + 1).padStart(2, '0')} · {l.name}</span>
              </div>
            ))}
          </div>

          {/* улики каждого этапа */}
          <div className={'anat-sat sat-wire' + on(0)} aria-hidden="true"><Note rot={-5} className="static">сначала — структура,<br />потом красота</Note><Doodle kind="arrowDown" className="sat-arr" /></div>
          <div className={'anat-sat sat-pal' + on(1)} aria-hidden="true">
            <div className="sw">{['#F5EFE7', '#1A1614', '#6E4A33', '#C58B5C'].map((c) => <i key={c} style={{ background: c }}><small>{c}</small></i>)}</div>
            <div className="ty"><b>Аа</b><span>Антиква в заголовках<br /><small>курсив — для акцентов</small></span></div>
          </div>
          <div className={'anat-sat sat-build' + on(2)} aria-hidden="true">
            <code><i>$</i> npm run build</code>
            <code className="ok">✓ Compiled successfully</code>
            <code className="ok">✓ Адаптив: 320–1920 px</code>
          </div>
          <div className={'anat-sat sat-photo' + on(3)} aria-hidden="true">
            <figure className="pol"><img src="/shots/lume-master.webp" alt="" loading="lazy" /><figcaption>реальные фото</figcaption></figure>
            <figure className="pol"><img src="/shots/lume-mask.webp" alt="" loading="lazy" /><figcaption>и цены</figcaption></figure>
          </div>
          <div className={'anat-sat sat-seo' + (step >= 4 ? ' on' : '')} aria-hidden="true">
            <div className="yx"><i>Я</i><span>студия косметологии</span></div>
            <small>beauty-chi-ochre.vercel.app</small>
            <b>Lumé Studio — эстетика и косметология</b>
            <span>Авторские уходы для лица и тела, архитектура бровей. Онлайн-запись 24/7.</span>
          </div>
          <div className={'anat-sat sat-lh' + (step >= 4 ? ' on' : '')} aria-hidden="true">
            <div className="lh-h"><span className="lh-ico" />Google Lighthouse<em>цель для каждого сайта</em></div>
            <div className="lh-row"><Gauge label="Скорость" /><Gauge label="Доступность" /><Gauge label="Практики" /><Gauge label="SEO" /></div>
          </div>
          <div className={'anat-sat sat-tg' + (step >= 5 ? ' on' : '')} aria-hidden="true">
            <div className="tg-head"><span className="tg-ava">В</span><span><b>Ванлав · заявки</b><small>бот</small></span></div>
            <div className="tg-msg">
              <b>Новая запись с сайта</b>
              <span>Имя: Ирина</span>
              <span>Услуга: Уход «Сияние»</span>
              <span>Время: сегодня, 14:30</span>
              <span>Телефон: +7 9•• •••-12-40</span>
              <time>14:32</time>
            </div>
            <div className="tg-kb"><span>Принять</span><span>Перезвонить</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
