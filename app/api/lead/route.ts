import { NextResponse } from 'next/server';

// Заявки с формы → Telegram через Bot API.
// Нужны переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (Vercel → Settings → Environment Variables).
// Без них возвращаем 501 — форма сама откроет Telegram с текстом заявки.

const hits = new Map<string, number[]>();
const LIMIT = 5; // заявок
const WINDOW = 10 * 60 * 1000; // за 10 минут с одного IP

const clean = (v: unknown, max = 500) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max);

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 501 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  // honeypot — бот заполнил скрытое поле
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (list.length >= LIMIT) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });
  list.push(now); hits.set(ip, list);

  const name = clean(body.name, 100), contact = clean(body.contact, 100);
  if (!name || !contact) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });

  const text = [
    '🟠 Новая заявка — Ванлав Сайты',
    clean(body.template, 100) && 'Шаблон: ' + clean(body.template, 100),
    'Имя: ' + name,
    'Контакт: ' + contact,
    clean(body.niche, 100) && 'Ниша: ' + clean(body.niche, 100),
    clean(body.comment, 1000) && 'Комментарий: ' + clean(body.comment, 1000),
    clean(body.page, 200) && 'Страница: ' + clean(body.page, 200),
  ].filter(Boolean).join('\n');

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    if (!r.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
