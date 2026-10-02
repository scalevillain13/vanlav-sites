'use client';
import { useEffect, useRef, useState } from 'react';
import { CONTACT } from '@/lib/data';
import { Doodle, Note } from './Doodle';

/**
 * «Как это работает»: четыре шага, соединённые рисованной линией. Линия прорисовывается по мере
 * прокрутки, по ней бежит светящаяся точка; дойдя до шага, она «включает» его — и оживает его сценка.
 */
const STEPS = [
  { title: 'Пишете мне', text: `В Telegram ${CONTACT.telegram} или через форму. Обсуждаем задачу, сроки и бюджет — бесплатно и без обязательств.` },
  { title: 'Выбираем путь', text: 'Готовый сайт из каталога — быстрее и дешевле. Или дизайн с нуля — полностью под вашу компанию.' },
  { title: 'Собираю сайт', text: 'Ставлю ваш логотип, цвета, фото, услуги, цены и контакты. Показываю промежуточный результат.' },
  { title: 'Запускаем', text: 'Подключаю домен, Яндекс и Google, настраиваю заявки в Telegram. Сайт начинает работать.' },
];
const TAGS = ['Название', 'Логотип', 'Фото', 'Услуги', 'Цены', 'Контакты', 'Цвета'];

function Chat() {
  return (
    <div className="pv pv-chat" aria-hidden="true">
      <div className="bub in">Здравствуйте! Нужен сайт для клининга, сколько стоит?</div>
      <div className="bub out">Привет! Покажу пару вариантов и назову цену</div>
      <div className="bub in typing"><i /><i /><i /></div>
    </div>
  );
}
function Paths() {
  return (
    <div className="pv pv-paths" aria-hidden="true">
      <figure className="pol p1"><img src="/shots/briz-hero.webp" alt="" loading="lazy" /><figcaption>готовый</figcaption></figure>
      <figure className="pol p2"><img src="/shots/lume-hero.webp" alt="" loading="lazy" /><figcaption>с нуля</figcaption></figure>
      <figure className="pol p3"><img src="/shots/napor-pipe.webp" alt="" loading="lazy" /><figcaption>или так</figcaption></figure>
      <span className="tape t1" /><span className="tape t2" />
    </div>
  );
}
function Build() {
  return (
    <div className="pv pv-build" aria-hidden="true">
      <div className="mini">
        <div className="mini-bar"><i className="logo" /><span /><span /><em /></div>
        <div className="mini-hero"><b /><b className="s" /><em /></div>
        <div className="mini-cards"><span /><span /><span /></div>
      </div>
      <div className="fly">{TAGS.map((t, i) => <span key={t} style={{ ['--k' as string]: i }}>{t}</span>)}</div>
    </div>
  );
}
function Launch() {
  return (
    <div className="pv pv-launch" aria-hidden="true">
      <div className="url"><span className="lock" /><span className="typed">ваш-сайт.ru</span><i className="caret" /></div>
      <div className="ok"><Doodle kind="check" /> Сайт в сети</div>
      <div className="tgping"><i />Новая заявка с сайта</div>
      <Doodle kind="burst" className="b1" />
      <Doodle kind="sparkle" className="b2" />
      <Doodle kind="star" className="b3" />
    </div>
  );
}
const VIS = [Chat, Paths, Build, Launch];

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const progRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const root = rootRef.current, svg = svgRef.current, base = baseRef.current, prog = progRef.current, dot = dotRef.current;
    if (!root || !svg || !base || !prog || !dot) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let len = 0, nodeAt: number[] = [], raf = 0, last = -2;

    // путь строится через центры кружков-шагов: мягкие «рукописные» изгибы с выносом в сторону
    const build = () => {
      const r = root.querySelector('.proc-track')!.getBoundingClientRect();
      const nodes = Array.from(root.querySelectorAll<HTMLElement>('.proc-node')).map((n) => { const b = n.getBoundingClientRect(); return [b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top]; });
      svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
      const mobile = r.width < 700;
      let d = `M ${nodes[0][0]} ${Math.max(0, nodes[0][1] - 120)} L ${nodes[0][0]} ${nodes[0][1]}`;
      const seg: string[] = [];
      for (let i = 1; i < nodes.length; i++) {
        const [x0, y0] = nodes[i - 1], [x1, y1] = nodes[i], dy = y1 - y0;
        const sw = mobile ? 34 * (i % 2 ? 1 : -1) : (x1 - x0) * 0.15 + (i % 2 ? 170 : -170);
        const s = ` C ${x0 + sw} ${y0 + dy * 0.42}, ${x1 - sw * 0.6} ${y1 - dy * 0.5}, ${x1} ${y1}`;
        seg.push(s); d += s;
      }
      base.setAttribute('d', d); prog.setAttribute('d', d);
      len = prog.getTotalLength();
      // длина пути до каждого шага
      const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'path'); svg.appendChild(tmp);
      let acc = `M ${nodes[0][0]} ${Math.max(0, nodes[0][1] - 120)} L ${nodes[0][0]} ${nodes[0][1]}`;
      tmp.setAttribute('d', acc); nodeAt = [tmp.getTotalLength()];
      seg.forEach((s) => { acc += s; tmp.setAttribute('d', acc); nodeAt.push(tmp.getTotalLength()); });
      tmp.remove();
      prog.style.strokeDasharray = `${len} ${len}`;
      last = -2; update();
    };
    const update = () => {
      raf = 0;
      if (!len) return;
      const b = root.getBoundingClientRect();
      const t = root.querySelector('.proc-track')!.getBoundingClientRect();
      const p = still ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.62 - t.top) / Math.max(1, t.height)));
      const L = p * len;
      prog.style.strokeDashoffset = String(len - L);
      const pt = prog.getPointAtLength(Math.max(0.01, L));
      dot.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
      dot.style.opacity = p > 0.003 && p < 0.999 ? '1' : '0';
      let k = -1; nodeAt.forEach((n, i) => { if (L >= n - 2) k = i; });
      if (k !== last) { last = k; setReached(k); }
      void b;
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    build();
    const ro = new ResizeObserver(() => build()); ro.observe(root);
    window.addEventListener('scroll', req, { passive: true });
    return () => { ro.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('scroll', req); };
  }, []);

  return (
    <section id="process" ref={rootRef} className="section proc" aria-labelledby="proc-h">
      <div className="sec-head">
        <div>
          <span className="label">Процесс</span>
          <h2 id="proc-h" className="h2">Как это работает</h2>
        </div>
        <p className="lead">Четыре шага от первого сообщения до заявок с нового сайта. Вы всегда знаете, что сейчас происходит.</p>
      </div>

      <div className="proc-track">
        <svg ref={svgRef} className="proc-svg" aria-hidden="true">
          <defs>
            <filter id="proc-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
          </defs>
          <path ref={baseRef} className="proc-base" />
          <path ref={progRef} className="proc-prog" />
          <g ref={dotRef} className="proc-dot"><circle r="16" className="halo" filter="url(#proc-glow)" /><circle r="7" /></g>
        </svg>
        <ol className="proc-steps">
          {STEPS.map((s, i) => {
            const V = VIS[i];
            return (
              <li key={s.title} className={'proc-step' + (i % 2 ? ' right' : '') + (reached >= i ? ' on' : '')}>
                <span className="proc-node"><b>{i + 1}</b></span>
                <div className="proc-text">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <div className="proc-vis"><V /></div>
              </li>
            );
          })}
        </ol>
        <Note className="proc-n1 hide-m" rot={-6}>это бесплатно</Note>
        <Note className="proc-n2 hide-m" rot={5}>вы всё видите в процессе</Note>
      </div>
    </section>
  );
}
