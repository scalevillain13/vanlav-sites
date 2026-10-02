'use client';
import { useState, type FormEvent } from 'react';
import { CONTACT, NICHES } from '@/lib/data';
import { Doodle, Note } from './Doodle';

type Props = {
  anchor?: string; title?: string; text?: string; button?: string;
  presetTemplate?: string; presetNiche?: string;
};

export default function CTA({
  anchor = 'contact', title = 'Вашему бизнесу нужен сайт?', text = 'Разработаю сайт с нуля под вашу задачу или подберу готовое решение.',
  button = 'Обсудить проект', presetTemplate = '', presetNiche = '',
}: Props) {
  const empty = { name: '', contact: '', niche: presetNiche, comment: '', website: '' };
  const [form, setForm] = useState(empty);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent-bot' | 'sent-tg'>('idle');

  const message = () =>
    ['Здравствуйте! Заявка с сайта студии Ванлав.', presetTemplate ? 'Шаблон: ' + presetTemplate : '',
      'Имя: ' + form.name, 'Контакт: ' + form.contact, form.niche ? 'Ниша: ' + form.niche : '', form.comment ? 'Комментарий: ' + form.comment : '']
      .filter(Boolean).join('\n');
  const tgLink = CONTACT.telegramUrl + '?text=' + encodeURIComponent(message());
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => { setForm({ ...form, [k]: e.target.value }); setError(false); };
  const bad = (v: string) => error && !v.trim();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) { setError(true); return; }
    setStatus('sending');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, template: presetTemplate, page: typeof location !== 'undefined' ? location.pathname : '' }),
      });
      if (r.ok) { setStatus('sent-bot'); return; }
    } catch {}
    // Бот не настроен или недоступен — открываем Telegram с текстом заявки
    try { await navigator.clipboard?.writeText(message()); } catch {}
    window.open(tgLink, '_blank', 'noopener');
    setStatus('sent-tg');
  };

  const reset = () => { setForm(empty); setStatus('idle'); };
  const sent = status === 'sent-bot' || status === 'sent-tg';

  return (
    <section id={anchor} className="cta">
      <div className="cta-box">
        <div className="cta-left">
          <h2>{title}</h2>
          <p>{text}</p>
          <a href={CONTACT.telegramUrl} target="_blank" rel="noopener" className="cta-tg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21.5 4.5L2.8 11.6c-.9.4-.9 1.5.1 1.8l4.6 1.5 1.8 5.4c.2.7 1.1.9 1.6.4l2.6-2.4 4.7 3.4c.6.4 1.4.1 1.6-.6l3.2-15.3c.2-.9-.7-1.6-1.5-1.3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
            <span><small>Пишите в Telegram</small><b>{CONTACT.telegram}</b></span>
          </a>
        </div>
        <span className="cta-hand hand" aria-hidden="true">отвечу сегодня</span>
        <Doodle kind="star" className="cta-star" />
        <div className="cta-form-wrap">
          {!sent ? (
            <form onSubmit={submit} className="cta-form" noValidate>
              <label>Как к вам обращаться
                <input className={'field' + (bad(form.name) ? ' bad' : '')} value={form.name} onChange={set('name')} placeholder="Имя" autoComplete="name" maxLength={100} />
              </label>
              <label>Телефон или Telegram
                <input className={'field' + (bad(form.contact) ? ' bad' : '')} value={form.contact} onChange={set('contact')} placeholder="+7 … или @username" autoComplete="tel" maxLength={100} />
              </label>
              <label>Ниша бизнеса
                <select className="field" value={form.niche} onChange={set('niche')}>
                  <option value="">Выберите нишу</option>
                  {NICHES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label>Комментарий
                <textarea className="field" rows={3} value={form.comment} onChange={set('comment')} placeholder="Необязательно" maxLength={1000} />
              </label>
              <label className="hp" aria-hidden="true">Сайт
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
              </label>
              {error && <span className="form-err">Укажите имя и способ связи.</span>}
              <button type="submit" className="cta-submit" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : button}</button>
              <span className="form-note">Отвечу в Telegram или перезвоню — обычно в течение дня.</span>
            </form>
          ) : (
            <div className="sent">
              <span className="ok"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3 3 7-7" stroke="#0C0C0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              {status === 'sent-bot' ? (
                <>
                  <b>Заявка отправлена</b>
                  <span>Спасибо! Я получил заявку и скоро свяжусь с вами. Если удобнее — напишите сразу в Telegram {CONTACT.telegram}.</span>
                </>
              ) : (
                <>
                  <b>Заявка готова</b>
                  <span>Telegram открыт с текстом заявки. Если окно не открылось, текст уже скопирован — отправьте его на {CONTACT.telegram}.</span>
                </>
              )}
              <div className="row">
                <a href={tgLink} target="_blank" rel="noopener" className="btn btn-accent">Открыть Telegram</a>
                <button type="button" onClick={reset} className="btn btn-outline">Новая заявка</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
