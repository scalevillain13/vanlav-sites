'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * «Анатомия сайта»: при прокрутке настоящий сайт (НАПОР) поворачивается в изометрию
 * и раскладывается на слои — каркас, дизайн, код, контент; затем вокруг появляются
 * поисковая выдача, замер скорости и заявка в Telegram. Чистый CSS 3D: текст чёткий,
 * работает в Safari, не нужен WebGL.
 */
const STEPS = [
  { title: 'Каркас', text: 'Сначала структура: какие блоки нужны, в каком порядке их читают и где кнопка заявки.' },
  { title: 'Дизайн', text: 'Цвета, шрифты, сетка и иконки — под нишу и характер компании, без шаблонного вида.' },
  { title: 'Вёрстка и код', text: 'Собираю на React и Next.js: адаптив под все экраны, анимации, формы.' },
  { title: 'Контент', text: 'Тексты, фото, цены и контакты. Всё, что убеждает клиента позвонить.' },
  { title: 'SEO и скорость', text: 'Мета-теги, разметка для Яндекса и Google, загрузка меньше секунды.' },
  { title: 'Заявки', text: 'Каждая заявка с сайта сразу приходит вам в Telegram.' },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);

// координаты повторяют реальный первый экран napor-landing.vercel.app (1894×1037)
function Wire() {
  const s = { fill: 'none', stroke: '#8E8A80', strokeWidth: 3, strokeDasharray: '10 8' } as const;
  return (
    <svg viewBox="0 0 1894 1037" aria-hidden="true">
      <rect x="0" y="0" width="1894" height="80" {...s} />
      <rect x="120" y="22" width="140" height="38" {...s} />
      <rect x="1574" y="14" width="207" height="52" {...s} />
      <rect x="120" y="130" width="320" height="22" {...s} />
      <rect x="120" y="260" width="590" height="110" {...s} />
      <rect x="120" y="390" width="490" height="110" {...s} />
      <rect x="120" y="515" width="770" height="110" {...s} />
      <rect x="120" y="680" width="380" height="110" {...s} />
      <rect x="546" y="676" width="385" height="76" {...s} />
      <rect x="995" y="195" width="650" height="505" {...s} />
      <line x1="995" y1="195" x2="1645" y2="700" {...s} />
      <line x1="1645" y1="195" x2="995" y2="700" {...s} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={142 + i * 332} y="880" width="290" height="110" {...s} />)}
    </svg>
  );
}

function Design() {
  const ink = '#14171A', blue = '#3BB1DF', deep = '#1E4E86';
  return (
    <svg viewBox="0 0 1894 1037" aria-hidden="true">
      <rect width="1894" height="1037" fill="#F3F3EF" />
      <rect width="1894" height="80" fill="#EFEFEB" />
      <rect x="120" y="26" width="30" height="30" fill="none" stroke={ink} strokeWidth="4" />
      <rect x="128" y="34" width="14" height="14" fill={blue} />
      <rect x="164" y="30" width="96" height="22" fill={ink} />
      <rect x="1574" y="14" width="207" height="52" fill={blue} />
      <rect x="120" y="135" width="300" height="10" fill="#9AA0A6" />
      <rect x="120" y="270" width="585" height="92" fill={ink} />
      <rect x="120" y="398" width="480" height="92" fill={ink} />
      <rect x="120" y="525" width="765" height="92" fill="#5B656C" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="120" y={688 + i * 30} width={i === 3 ? 220 : 360} height="12" fill="#6B7177" />)}
      <rect x="546" y="676" width="385" height="76" fill={ink} />
      <rect x="1000" y="365" width="640" height="335" fill={deep} />
      <rect x="1000" y="195" width="640" height="170" fill="#D9DCDD" />
      <circle cx="1490" cy="450" r="150" fill="#F3F3EF" />
      <rect x="1240" y="740" width="190" height="64" fill={ink} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={142 + i * 332} y="880" width="290" height="110" fill="#FAFAF7" />
          <rect x={142 + i * 332} y="915" width="190" height="20" fill={ink} />
          <rect x={142 + i * 332} y="955" width="90" height="12" fill="#6B7177" />
          <rect x={410 + i * 332} y="886" width="16" height="4" fill={deep} />
        </g>
      ))}
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
        {'      '}<i className="t">&lt;h1&gt;</i>Сантехник в Казани<i className="t">&lt;/h1&gt;</i>{'\n'}
        {'      '}<i className="t">&lt;Counter</i> <i className="a">to</i>={'{'}<i className="n">40</i>{'}'} <i className="a">unit</i>=<i className="s">&quot;минут&quot;</i> <i className="t">/&gt;</i>{'\n'}
        {'      '}<i className="t">&lt;a</i> <i className="a">href</i>=<i className="s">&quot;tel:+78432000000&quot;</i><i className="t">&gt;</i>{'\n'}
        {'        '}Вызвать мастера{'\n'}
        {'      '}<i className="t">&lt;/a&gt;</i>{'\n'}
        {'    '}<i className="t">&lt;/section&gt;</i>{'\n'}
        {'  '});{'\n'}
        {'}'}{'\n'}
        {'\n'}
        <i className="f">.hero</i> {'{'} <i className="a">display</i>: grid; <i className="a">gap</i>: <i className="n">24px</i>; {'}'}{'\n'}
        <i className="c">@media</i> (<i className="a">max-width</i>: <i className="n">700px</i>) {'{'} … {'}'}
      </code>
    </pre>
  );
}

export default function Anatomy() {
  const rootRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);
  const stepRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current, rig = rigRef.current;
    if (!root || !rig) return;
    // «уменьшить движение»: показываем сразу разобранный сайт без привязки к скроллу
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
      rig.style.setProperty('--tilt', ease(clamp(p / 0.14)).toFixed(4));
      const sep = ease(clamp((p - 0.04) / 0.42));
      rig.style.setProperty('--s', sep.toFixed(4));
      rig.parentElement?.classList.toggle('split', sep > 0.3);
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
    { key: 'content', name: 'Контент', el: <img src="/sites/napor/cover.webp" alt="" width={1280} height={701} loading="lazy" decoding="async" /> },
  ];

  return (
    <section id="anatomy" ref={rootRef} className={'anat' + (still ? ' still' : '')} aria-labelledby="anat-h">
      <div className="anat-sticky">
        <div className="anat-copy">
          <span className="label">Что внутри сайта</span>
          <h2 id="anat-h" className="h2">Один сайт — шесть слоёв работы</h2>
          <ol className="anat-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className={i === step ? 'on' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>
                <b><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</b>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="anat-stage" data-step={step}>
          <div ref={rigRef} className="anat-rig">
            {layers.map((l, i) => (
              <div key={l.key} className={'anat-layer L-' + l.key + (step <= 3 && step !== i ? ' dim' : '')} style={{ ['--i' as string]: i }}>
                {l.el}
                <span className="anat-tag">{String(i + 1).padStart(2, '0')} · {l.name}</span>
              </div>
            ))}
          </div>

          <div className={'anat-sat sat-seo' + (step >= 4 ? ' on' : '')} aria-hidden="true">
            <small>napor-landing.vercel.app</small>
            <b>Сантехник в Казани — приедет через 40 минут</b>
            <span>Найдём причину, назовём цену до начала работ и дадим гарантию 12 месяцев.</span>
          </div>
          <div className={'anat-sat sat-speed' + (step >= 4 ? ' on' : '')} aria-hidden="true">
            <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" /><circle cx="22" cy="22" r="19" className="v" /></svg>
            <div><b>100</b><small>скорость в Lighthouse</small></div>
          </div>
          <div className={'anat-sat sat-tg' + (step >= 5 ? ' on' : '')} aria-hidden="true">
            <i>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4 10.5 14.5" /><path d="M21 4 14.5 21l-4-6.5L4 10.5z" /></svg>
            </i>
            <div><b>Новая заявка с сайта</b><span>Засор · перезвонить через 5 минут</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
