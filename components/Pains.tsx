'use client';
import { useEffect, useRef, useState } from 'react';
import { Sparkle, GlowArrow, GlowBlob } from './Glow';
import { ArrowRight } from './Icons';

/**
 * «Узнаёте свой сайт?» — диагностика при прокрутке. Сканер проходит по типичному устаревшему
 * сайту и по очереди подсвечивает шесть проблем, из-за которых уходят клиенты. В финале
 * старый сайт «стирается» и под ним проявляется современный.
 */
type Pain = { tag: string; title: string; text: string; stat?: { n: string; t: string; src: string }; box: [number, number, number, number] };
const PAINS: Pain[] = [
  { tag: 'Дизайн', title: 'Выглядит как в 2015-м', text: 'Мелкий шрифт, синие ссылки, восклицательные знаки. Человек думает «они вообще ещё работают?» — и закрывает вкладку.',
    stat: { n: '75%', t: 'людей судят о надёжности компании по дизайну её сайта', src: 'Stanford Web Credibility Research' }, box: [0, 0, 100, 25] },
  { tag: 'Скорость', title: 'Грузится целую вечность', text: 'Тяжёлые картинки и старый код. Пока страница открывается, клиент уже нашёл другого.',
    stat: { n: '53%', t: 'посетителей уходят с мобильного сайта, если он грузится дольше 3 секунд', src: 'Google, «The Need for Mobile Speed»' }, box: [27, 27, 72, 37] },
  { tag: 'Телефон', title: 'На телефоне — мелко и криво', text: 'Большинство клиентов открывают сайт со смартфона. Если текст приходится растягивать пальцами — уходят.', box: [58, 4, 40, 92] },
  { tag: 'Цены', title: 'Вместо цен — «звоните»', text: 'Клиент хочет понять стоимость сразу. Нет цены — идёт считать к конкуренту, у которого она есть.', box: [27, 65, 44, 22] },
  { tag: 'Заявки', title: 'Заявки тонут в почте', text: 'Форма шлёт письма на ящик, который открывают раз в неделю. Клиент ждёт звонка день — и звонит другим.', box: [73, 65, 26, 22] },
  { tag: 'Поиск', title: 'Его нет в Яндексе', text: 'Без нормальной структуры, мета-тегов и скорости сайт не показывают тем, кто уже готов заказать.', box: [0, 0, 100, 100] },
];
const N = PAINS.length;

function OldSite() {
  return (
    <div className="os" aria-hidden="true">
      <div className="os-top">
        <div className="os-logo">СтройСервис<b>Плюс</b></div>
        <div className="os-marq"><span>!!! Добро пожаловать на официальный сайт компании !!! Работаем с 2009 года !!! Звоните !!!</span></div>
      </div>
      <div className="os-nav"><u>Главная</u><u>О компании</u><u>Прайс (.doc)</u><u>Фотогалерея</u><u>Гостевая книга</u><u>Контакты</u></div>
      <div className="os-grid">
        <div className="os-side">
          <b>Наши услуги:</b>
          {['Ремонт', 'Отделка', 'Сантехника', 'Электрика', 'Прочее'].map((t) => <u key={t}>» {t}</u>)}
          <div className="os-counter">Вы <span>004213</span>-й посетитель</div>
        </div>
        <div className="os-main">
          <h4>Добро пожаловать!</h4>
          <div className="os-img"><span className="os-spin" /><small>Загрузка изображения… 7,8 с</small></div>
          <p>Компания «СтройСервисПлюс» работает на рынке с 2009 года и оказывает весь спектр услуг по низким ценам. Индивидуальный подход к каждому клиенту!!!</p>
          <div className="os-row">
            <table><tbody><tr><th>Услуга</th><th>Цена</th></tr><tr><td>Ремонт</td><td>договорная</td></tr><tr><td>Монтаж</td><td>звоните</td></tr><tr><td>Выезд</td><td>уточняйте</td></tr></tbody></table>
            <div className="os-form"><span>Ваше имя:</span><i /><span>E-mail:</span><i /><em>Отправить</em></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pains() {
  const rootRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0); // 0 — скан, 1..6 — проблемы, 7 — новый сайт
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
    const root = rootRef.current; if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStill(true); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const b = root.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -b.top / Math.max(1, root.offsetHeight - window.innerHeight)));
      const st = Math.min(N + 1, Math.floor(p * (N + 2.2)));
      if (st !== stepRef.current) { stepRef.current = st; setStep(st); }
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', req); window.removeEventListener('resize', req); };
  }, []);

  const cur = step >= 1 && step <= N ? PAINS[step - 1] : null;
  const after = step > N;
  const found = Math.min(step, N);
  const box = cur ? cur.box : [0, 0, 100, 100];

  return (
    <section id="why" ref={rootRef} className={'diag' + (still ? ' still' : '')} aria-labelledby="why-h">
      <div className="diag-sticky">
        <div className="diag-copy">
          <span className="label">Зачем это вам</span>
          <h2 id="why-h" className="h2">Узнаёте свой сайт?</h2>
          <div className="diag-card" key={step}>
            {!cur && !after && (
              <>
                <span className="dc-tag scan">Диагностика</span>
                <h3>Проверим типичный сайт малого бизнеса</h3>
                <p>Листайте — сканер найдёт, из-за чего такой сайт теряет клиентов.</p>
              </>
            )}
            {cur && (
              <>
                <span className="dc-tag"><b>{String(step).padStart(2, '0')}</b> / 0{N} · {cur.tag}</span>
                <h3>{cur.title}</h3>
                <p>{cur.text}</p>
                {cur.stat && (
                  <div className="dc-stat"><b>{cur.stat.n}</b><span>{cur.stat.t}<small>{cur.stat.src}</small></span></div>
                )}
              </>
            )}
            {after && (
              <>
                <span className="dc-tag ok">Решение</span>
                <h3>Новый сайт закрывает все шесть</h3>
                <p>Современный дизайн, загрузка меньше секунды, удобно с телефона, цены на виду, заявки — сразу в Telegram, и всё это видно в поиске.</p>
                <a href="#contact" className="btn btn-accent btn-icon">Хочу такой сайт <span className="ic"><ArrowRight /></span></a>
              </>
            )}
          </div>
          <div className="diag-dots" aria-hidden="true">
            {PAINS.map((p, i) => <i key={p.tag} className={after ? 'ok' : i < found ? 'bad' : ''}><span>{p.tag}</span></i>)}
          </div>
        </div>

        <div className="diag-stage">
          <GlowBlob className="diag-blob" />
          <div className="diag-win">
            <div className="dw-bar">
              <span className="dots"><i /><i /><i /></span>
              <span className="dw-url">{after ? 'ваш-новый-сайт.ru' : 'stroyservis-plus.narod.ru'}</span>
              <span className={'dw-count' + (after ? ' ok' : '')}>{after ? 'Проблем: 0' : `Найдено: ${found} из ${N}`}</span>
            </div>
            <div className="dw-view">
              {near && <OldSite />}
              <div className={'dw-new' + (after ? ' on' : '')}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sites/briz/cover.webp" alt="" width={1280} height={702} loading="lazy" decoding="async" />
                <span className="dw-seam" />
              </div>
              {!after && <span className="dw-beam" key={'b' + step} />}
              <div className={'dw-hot' + (cur ? ' on' : '')} style={{ left: box[0] + '%', top: box[1] + '%', width: box[2] + '%', height: box[3] + '%' }}>
                <i /><i /><i /><i />
                {cur && <span className="dw-label">#{step} {cur.tag}</span>}
              </div>
              {/* сценки отдельных проблем */}
              <div className={'dw-phone' + (step === 3 ? ' on' : '')} aria-hidden="true">
                <div className="dp-scr">{near && <OldSite />}<span className="pinch" /></div>
              </div>
              <div className={'dw-serp' + (step === 6 ? ' on' : '')} aria-hidden="true">
                <div className="ds-q"><b>Я</b>ремонт квартир под ключ</div>
                {['Ремонт под ключ — цены и сроки', 'Бесплатный замер за 1 день', 'Ремонт с гарантией 3 года'].map((t, i) => (
                  <div key={t} className="ds-r" style={{ transitionDelay: 0.15 + i * 0.12 + 's' }}><small>konkurent-{i + 1}.ru</small><b>{t}</b></div>
                ))}
                <div className="ds-r you"><small>stroyservis-plus.narod.ru</small><b>…страница 5</b></div>
              </div>
            </div>
          </div>
          {after && (
            <>
              <Sparkle size={30} style={{ right: '4%', top: '8%' }} />
              <Sparkle size={18} white style={{ left: '6%', bottom: '14%' }} />
              <Sparkle size={22} style={{ right: '18%', bottom: '4%' }} />
            </>
          )}
          <GlowArrow kind="swoosh" className={'diag-arrow' + (after ? ' on' : '')} />
        </div>
      </div>
    </section>
  );
}
