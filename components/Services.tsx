import Link from 'next/link';
import type { ReactNode } from 'react';
import { SERVICES } from '@/lib/data';
import { servicePageById } from '@/lib/services-content';
import { Note } from './Doodle';
import { Sparkle, Brackets } from './Glow';
import { ArrowUpRight } from './Icons';
import LazyVis from './LazyVis';

/**
 * Услуги — «бенто»-сетка карточек разного размера. У каждой услуги своя живая мини-сценка,
 * что входит в работу, кому подходит и цена «от». Карточки ведут на подробные страницы услуг.
 */
const VIS: Record<string, ReactNode> = {
  // визитка: одна страница собирается из блоков
  card: <div className="sv-card"><i className="a" /><i className="b" /><i className="c" /><i className="d" /><span className="cur" /></div>,
  // лендинг: воронка, по которой «стекают» посетители и превращаются в заявки
  landing: (
    <div className="sv-funnel">
      <svg viewBox="0 0 200 120" aria-hidden="true"><path d="M10 10 H190 L124 70 V110 H76 V70 Z" /></svg>
      {Array.from({ length: 7 }).map((_, i) => <i key={i} style={{ ['--k' as string]: i }} />)}
      <b>заявка</b>
    </div>
  ),
  // многостраничный: дерево страниц
  multi: (
    <div className="sv-tree">
      <span className="r">Главная</span>
      <svg viewBox="0 0 220 40" aria-hidden="true"><path d="M110 0 V14 M30 40 V24 H190 V40 M110 14 V40" /></svg>
      <span>Услуги</span><span>Работы</span><span>Цены</span>
      <i className="p p1" /><i className="p p2" /><i className="p p3" /><i className="p p4" /><i className="p p5" /><i className="p p6" />
    </div>
  ),
  // дизайн: кривая Безье с точками и палитра
  design: (
    <div className="sv-design">
      <svg viewBox="0 0 200 100" aria-hidden="true"><path className="cv" d="M14 82 C 50 -6, 120 110, 186 20" /><path className="hd" d="M14 82 L50 12 M186 20 L140 92" /><circle cx="14" cy="82" r="5" /><circle cx="186" cy="20" r="5" /><circle cx="50" cy="12" r="3.5" className="h" /><circle cx="140" cy="92" r="3.5" className="h" /></svg>
      <div className="sw"><i /><i /><i /><i /></div>
    </div>
  ),
  // логотип: знак перебирает формы
  logo: <div className="sv-logo"><i /><b>Aa</b></div>,
  // SEO: позиция в выдаче поднимается
  seo: (
    <div className="sv-seo">
      {[1, 2, 3, 4].map((n) => <span key={n} className={n === 4 ? 'me' : ''}><b>{n}</b><i /></span>)}
    </div>
  ),
  // безопасность: щит со сканирующей линией
  security: (
    <div className="sv-shield">
      <svg viewBox="0 0 60 70" aria-hidden="true"><path d="M30 4 L54 14 V34 C54 50 43 61 30 66 C17 61 6 50 6 34 V14 Z" /><path className="ck" d="M19 35 L27 43 L42 27" pathLength={1} /></svg>
      <span className="scan" />
    </div>
  ),
  tgbot: <div className="sv-tg"><span className="pl"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 4 10.5 14.5" /><path d="M21 4 14.5 21l-4-6.5L4 10.5z" /></svg></span><span className="msg">Новая заявка · Ирина</span></div>,
  bots: <div className="sv-chat"><span className="in">Записаться на завтра?</span><span className="out">Свободно 11:00 и 15:30</span><span className="in s">15:30 👍</span></div>,
  admin: <div className="sv-admin">{[38, 64, 46, 82, 58, 94].map((h, i) => <i key={i} style={{ ['--h' as string]: h + '%', ['--k' as string]: i }} />)}<b>+24 заявки</b></div>,
};
const FOR: Record<string, string> = {
  card: 'специалистам и небольшим компаниям', landing: 'под рекламу и одну услугу', multi: 'компаниям с несколькими услугами',
  design: 'если вёрстка будет своя', logo: 'новым брендам и ребрендингу', seo: 'чтобы клиенты находили в поиске',
  security: 'сайтам с формами и заявками', tgbot: 'любому сайту с формой', bots: 'записи, каталогу, рассылкам', admin: 'если контент меняется часто',
};
const SIZE: Record<string, string> = { card: 'xl', landing: 'xl', multi: 'xl', design: 'm', logo: 'm', seo: 'm', security: 'm', tgbot: 's', bots: 's', admin: 's' };

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="sec-head">
        <div>
          <span className="label">Услуги</span>
          <h2 className="h2">Сайты полностью с нуля на заказ</h2>
          <Note className="svc-note hide-m" rot={-5}>цены честные — «от», без сюрпризов</Note>
        </div>
        <p className="lead">Разрабатываю сайты с нуля под вашу задачу: структура, уникальный дизайн, вёрстка, тексты и запуск — без шаблонов. А ещё логотипы, SEO, защита, админ-панели и Telegram-боты.</p>
      </div>

      <div className="sv-grid">
        {SERVICES.map((s, i) => {
          const page = servicePageById(s.id);
          const size = SIZE[s.id] || 'm';
          const inc = (page?.includes || s.points || []).slice(0, size === 'xl' ? 4 : size === 'm' ? 3 : 0);
          return (
            <Link key={s.id} href={'/uslugi/' + (page?.slug || '')} className={'card sv sv-' + size}>
              <Brackets className="sv-br" />
              <LazyVis className="sv-vis">{VIS[s.id]}</LazyVis>
              <div className="sv-body">
                <div className="sv-top">
                  <span className="sv-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sv-for">{FOR[s.id]}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {inc.length > 0 && <ul>{inc.map((t) => <li key={t}>{t}</li>)}</ul>}
                <div className="sv-foot">
                  <b>{s.priceLabel}</b>
                  <span className="sv-go">Подробнее <ArrowUpRight /></span>
                </div>
              </div>
              {i === 0 && <Sparkle size={22} style={{ right: 22, top: 20 }} />}
            </Link>
          );
        })}
      </div>
      <div className="srv-foot">
        <span>Цена «от» — стартовая. Точную стоимость называю до начала работ и не меняю её в процессе.</span>
        <span style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/uslugi" className="btn-ghost">Все услуги →</Link>
          <a href="#contact" className="btn-ghost">Обсудить задачу →</a>
        </span>
      </div>
    </section>
  );
}
