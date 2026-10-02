'use client';
import { useEffect, useRef, useState } from 'react';
import { Doodle, Note, Mark } from './Doodle';
import { ArrowRight } from './Icons';

/** «Узнаёте свой сайт?» — почему людям вообще нужен новый сайт. Разные по форме блоки-боли. */
export default function Pains() {
  const [modern, setModern] = useState(false);
  const [touched, setTouched] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // пока посетитель сам не нажал переключатель — сайт «2015 → 2026» перещёлкивается сам, когда виден
  useEffect(() => {
    const el = boxRef.current; if (!el || touched) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = window.setInterval(() => setModern((m) => !m), 3200);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(id); };
  }, [touched]);

  return (
    <section id="why" className="section pains" aria-labelledby="why-h">
      <div className="sec-head">
        <div>
          <span className="label">Зачем это вам</span>
          <h2 id="why-h" className="h2">Узнаёте <Mark kind="underline">свой</Mark> сайт?</h2>
        </div>
        <p className="lead">Если хоть один пункт ниже про вас — сайт не помогает бизнесу, а тихо отдаёт клиентов конкурентам.</p>
      </div>

      <div className="pain-grid">
        {/* 1. Сайт из 2015-го: переключатель старое/новое */}
        <article ref={boxRef} className="pain p-old">
          <div className="p-copy">
            <h3>Сайт застрял в 2015-м</h3>
            <p>Мелкий шрифт, синие ссылки, кнопка «Отправить» в сером квадрате. Человек заходит, думает «они вообще ещё работают?» — и уходит к соседу.</p>
            <div className="era" role="group" aria-label="Сравнить старый и новый сайт">
              <button type="button" aria-pressed={!modern} className={!modern ? 'on' : ''} onClick={() => { setTouched(true); setModern(false); }}>2015</button>
              <button type="button" aria-pressed={modern} className={modern ? 'on' : ''} onClick={() => { setTouched(true); setModern(true); }}>2026</button>
              <i style={{ transform: modern ? 'translateX(100%)' : 'none' }} />
            </div>
          </div>
          <div className={'p-screens' + (modern ? ' modern' : '')}>
            <div className="old-site" aria-hidden="true">
              <div className="os-bar">Добро пожаловать на официальный сайт компании!!!</div>
              <div className="os-body">
                <div className="os-nav"><u>Главная</u><u>О нас</u><u>Прайс (doc)</u><u>Контакты</u><u>Гостевая</u></div>
                <div className="os-main">
                  <b>Наши услуги</b>
                  <p>Компания &laquo;СтройСервисПлюс&raquo; работает на рынке с 2009 года и оказывает весь спектр услуг. Звоните!!!</p>
                  <table><tbody><tr><td>Услуга</td><td>Цена</td></tr><tr><td>Ремонт</td><td>договорная</td></tr><tr><td>Монтаж</td><td>звоните</td></tr></tbody></table>
                  <span className="os-btn">Отправить</span>
                  <span className="os-count">Вы 004213-й посетитель</span>
                </div>
              </div>
              <Note className="n1 hide-m" rot={-6}>шрифт из Word</Note>
              <Note className="n2 hide-m" rot={5}>цены «звоните»?</Note>
              <Doodle kind="circle" className="c-btn" color="#FF4D3A" />
            </div>
            <div className="new-site" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sites/briz/cover.webp" alt="" width={1280} height={702} loading="lazy" decoding="async" />
              <Note className="n3" rot={-4}>а вот так — сейчас</Note>
            </div>
          </div>
        </article>

        {/* 2. Медленно грузится */}
        <article className="pain p-slow">
          <div className="slow-num"><b>53%</b><span>посетителей уходят с мобильного сайта, если он грузится дольше 3 секунд</span></div>
          <div className="loadbar" aria-hidden="true"><i /><span>3 с</span></div>
          <small className="src">Google, исследование «The Need for Mobile Speed»</small>
        </article>

        {/* 7. Доверие */}
        <article className="pain p-trust">
          <b className="big">75%</b>
          <p>людей судят о надёжности компании по дизайну её сайта</p>
          <small className="src">Stanford Web Credibility Research</small>
          <Doodle kind="burst" className="burst" />
        </article>
        {/* 3. Не открывается на телефоне */}
        <article className="pain p-phone">
          <div className="phone-mock" aria-hidden="true">
            <div className="pm-screen">
              <div className="pm-page">
                <div className="os-bar">Добро пожаловать на официальный сайт!!!</div>
                <p>Компания работает на рынке с 2009 года и оказывает весь спектр услуг по низким ценам. Звоните прямо сейчас по телефону…</p>
                <p>Наши преимущества: качество, надёжность, опыт, индивидуальный подход к каждому клиенту.</p>
                <div className="pm-img" />
                <p>Прайс-лист можно скачать в формате .doc. Для просмотра требуется Microsoft Word.</p>
                <div className="pm-row"><span /><span /><span /></div>
              </div>
              <span className="pinch" />
            </div>
          </div>
          <div>
            <h3>На телефоне всё мелко</h3>
            <p>Большинство клиентов открывают сайт со смартфона. Если приходится растягивать текст двумя пальцами — вкладку закрывают.</p>
          </div>
          <Note className="n-pinch hide-m" rot={-7} arrow="arrow" arrowStyle={{ width: 58, marginTop: 14 }}>приходится зумить</Note>
        </article>

        {/* 4. Нет в поиске */}
        <article className="pain p-search">
          <div className="serp" aria-hidden="true">
            <div className="serp-q"><span>ремонт квартир сочи</span><i /></div>
            {['Конкурент №1 — ремонт под ключ', 'Конкурент №2 — цены и отзывы', 'Конкурент №3 — бесплатный замер'].map((t, i) => (
              <div key={t} className="serp-r"><small>competitor-{i + 1}.ru</small><b>{t}</b></div>
            ))}
            <div className="serp-r you"><small>ваш-сайт.ru</small><b>Ваш сайт — где-то на 5-й странице</b></div>
          </div>
          <h3>Клиенты ищут — и находят конкурентов</h3>
          <p>Без нормальной структуры, мета-тегов и скорости Яндекс просто не показывает сайт тем, кто уже готов заказать.</p>
        </article>

        {/* 5. Заявки теряются */}
        <article className="pain p-leads">
          <div className="inbox" aria-hidden="true">
            <div className="ib-row old"><i /><span><b>Заявка с сайта</b><small>info@… · 3 дня назад · не прочитано</small></span></div>
            <div className="ib-row old"><i /><span><b>Заявка с сайта</b><small>info@… · 5 дней назад · спам?</small></span></div>
            <div className="ib-row tg"><i /><span><b>Новая заявка · Ирина</b><small>Telegram · только что</small></span><em>Принять</em></div>
          </div>
          <h3>Заявки тонут в почте</h3>
          <p>Форма отправляет письма на ящик, который никто не открывает. Клиент ждёт звонка день — и звонит другим.</p>
        </article>

        {/* 6. Как у всех */}
        <article className="pain p-same">
          <div className="clones" aria-hidden="true">
            {[0, 1, 2].map((i) => <div key={i} className="clone"><i /><b /><span /><span /><em /></div>)}
            <Note className="n-same" rot={-3}>найди 10 отличий</Note>
          </div>
          <h3>Сайт как у сотни конкурентов</h3>
          <p>Шаблон из конструктора за выходные — и вас не отличить от других. Клиент выбирает по цене, а не по вам.</p>
        </article>

      </div>

      <div className="pain-cta">
        <p><span className="hand">Всё это лечится</span> одним хорошим сайтом: быстрым, понятным с телефона, заметным в поиске и с заявками прямо в Telegram.</p>
        <a href="#contact" className="btn btn-accent btn-icon">Обсудить новый сайт <span className="ic"><ArrowRight /></span></a>
      </div>
    </section>
  );
}
