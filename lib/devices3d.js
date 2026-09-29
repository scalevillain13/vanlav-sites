/* eslint-disable */
// @ts-nocheck
// WebGL-сцена с 3D-моделями устройств (three.js): ноутбук (hero) и планшет+телефон+ноутбук (automation).
// Модели процедурные, экраны рисуются на Canvas. Если у шаблона есть скриншот (site.image) — на экране ноутбука показывается он.

const OR = '#FF5A1F';
const HEAD = "'Unbounded', sans-serif", BODY = "'Onest', sans-serif";

const rr = (c, x, y, w, h, r) => { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
const wrap = (c, text, x, y, maxW, lh) => { const ws = String(text).split(' '); let line = '', yy = y; for (const w of ws) { const t = line ? line + ' ' + w : w; if (c.measureText(t).width > maxW && line) { c.fillText(line, x, yy); line = w; yy += lh; } else line = t; } if (line) c.fillText(line, x, yy); return yy; };
const isDark = (hex) => { const h = (hex || '#fff').replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map(x => x + x).join('') : h, 16); return (((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000) < 128; };
const shade = (c, on) => { if (on) { c.shadowColor = 'rgba(0,0,0,0.12)'; c.shadowBlur = 24; c.shadowOffsetY = 8; } else { c.shadowColor = 'transparent'; c.shadowBlur = 0; c.shadowOffsetY = 0; } };
const scaled = (cv, lw) => { const c = cv.getContext('2d'); const S = cv.width / lw; c.setTransform(S, 0, 0, S, 0, 0); c.textBaseline = 'alphabetic'; c.textAlign = 'left'; return [c, lw, cv.height / S]; };

// ---------- Экран сайта ----------
function drawSite(cv, site, img) {
  const [c, W, H] = scaled(cv, 1280);
  if (img) {
    c.fillStyle = (site.preview && site.preview.bg) || '#fff'; c.fillRect(0, 0, W, H);
    c.drawImage(img, 0, 0, W, img.naturalHeight * W / img.naturalWidth);
    return;
  }
  const p = Object.assign({ bg: '#fff', ink: '#111', muted: '#555', accent: OR, accentInk: '#fff', panel: '#111', panelInk: '#fff', surface: '#fff', line: '#ddd', points: [], services: [], nav: [] }, site.preview || {});
  const stack = p.variant === 'stack';
  const head = p.serif ? "'IBM Plex Serif', serif" : "'Commissioner', sans-serif";
  const body = "'IBM Plex Sans', sans-serif";
  const wt = p.weight || 700, up = (s) => p.upper ? String(s).toUpperCase() : s;
  const br = p.serif ? 0 : (p.upper ? 6 : 999), pill = (h) => br === 999 ? h / 2 : br;
  c.fillStyle = p.bg; c.fillRect(0, 0, W, H);
  const heroBg = stack ? p.heroBg : p.bg, heroInk = stack ? p.heroInk : p.ink, heroMuted = stack ? p.heroMuted : p.muted;
  c.fillStyle = heroBg; c.fillRect(0, 0, W, 96);
  c.fillStyle = p.accent; rr(c, 64, 36, 24, 24, p.serif ? 12 : 6); c.fill();
  c.fillStyle = heroInk; c.font = `700 25px ${head}`; c.textBaseline = 'middle'; c.fillText(up(p.brand || site.title), 100, 49);
  c.font = `400 18px ${body}`; c.globalAlpha = 0.85; (p.nav || []).forEach((n, i) => c.fillText(n, 470 + i * 118, 49)); c.globalAlpha = 1;
  c.font = `600 18px ${body}`; c.fillText(p.phone || '', 880, 49);
  c.fillStyle = p.accent; rr(c, 1080, 26, 136, 46, pill(46)); c.fill();
  c.fillStyle = p.accentInk; c.font = `600 16px ${body}`; c.textAlign = 'center'; c.fillText((p.cta || '').slice(0, 16), 1148, 49); c.textAlign = 'left';
  c.strokeStyle = stack ? (p.heroLine || p.line) : p.line; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, 96); c.lineTo(W, 96); c.stroke();
  c.textBaseline = 'alphabetic';
  let y;
  if (!stack) {
    c.fillStyle = p.accent; c.font = `600 15px ${body}`; c.fillText(String(p.eyebrow || '').toUpperCase().split('').join(String.fromCharCode(8202)), 64, 206);
    c.fillStyle = p.ink; c.font = `${wt} 68px ${head}`; y = wrap(c, up(p.headline || ''), 64, 292, 640, 74);
    c.fillStyle = p.muted; c.font = `400 22px ${body}`; y = wrap(c, p.sub || '', 64, y + 58, 560, 33);
    y += 46;
    shade(c, true); c.fillStyle = p.accent; rr(c, 64, y, 250, 62, pill(62)); c.fill(); shade(c, false);
    c.fillStyle = p.accentInk; c.font = `600 19px ${body}`; c.textAlign = 'center'; c.fillText(p.cta || '', 189, y + 39); c.textAlign = 'left';
    c.strokeStyle = p.line; c.lineWidth = 2; rr(c, 330, y, 190, 62, pill(62)); c.stroke();
    c.fillStyle = p.ink; c.textAlign = 'center'; c.fillText(p.cta2 || '', 425, y + 39); c.textAlign = 'left';
    y += 110; c.font = `400 16px ${body}`;
    (p.points || []).forEach((pt, i) => { const x = 64 + i * 200; c.fillStyle = p.accent; c.beginPath(); c.arc(x + 5, y - 5, 5, 0, 7); c.fill(); c.fillStyle = p.muted; c.fillText(pt, x + 18, y); });
    const px = 760, py = 140, pw = 456, ph = 580;
    shade(c, true); c.fillStyle = p.panel; rr(c, px, py, pw, ph, p.serif ? 0 : 28); c.fill(); shade(c, false);
    c.save(); rr(c, px, py, pw, ph, p.serif ? 0 : 28); c.clip();
    const gr = c.createLinearGradient(px, py, px + pw, py + ph); gr.addColorStop(0, isDark(p.panel) ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.35)'); gr.addColorStop(1, 'rgba(0,0,0,0.12)'); c.fillStyle = gr; c.fillRect(px, py, pw, ph);
    c.strokeStyle = isDark(p.panel) ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'; c.lineWidth = 1.5;
    for (let i = -700; i < 700; i += 18) { c.beginPath(); c.moveTo(px + i, py); c.lineTo(px + i + ph, py + ph); c.stroke(); }
    c.fillStyle = p.accent; c.globalAlpha = 0.9; c.beginPath(); c.arc(px + pw - 70, py + 70, 26, 0, 7); c.fill(); c.globalAlpha = 1;
    c.restore();
    c.fillStyle = p.panelInk; c.font = `600 15px ${body}`; c.fillText(String(p.panelLabel || '').toUpperCase(), px + 40, py + 56);
    c.font = `700 148px ${head}`; c.fillText(p.badge || '', px + 34, py + 450);
    c.font = `400 21px ${body}`; wrap(c, p.badgeCaption || '', px + 40, py + 500, 360, 30);
    y = 800;
  } else {
    c.fillStyle = heroBg; c.fillRect(0, 96, W, 730);
    c.fillStyle = p.accent; c.font = `600 15px ${body}`; c.fillText(String(p.eyebrow || '').toUpperCase(), 64, 196);
    c.fillStyle = heroInk; c.font = `${wt} 90px ${head}`; y = wrap(c, up(p.headline || ''), 64, 296, 1040, 94);
    c.fillStyle = heroMuted; c.font = `400 22px ${body}`; wrap(c, p.sub || '', 64, y + 70, 560, 33);
    shade(c, true); c.fillStyle = p.accent; rr(c, 744, y + 38, 240, 62, pill(62)); c.fill(); shade(c, false);
    c.fillStyle = p.accentInk; c.font = `600 19px ${body}`; c.textAlign = 'center'; c.fillText(p.cta || '', 864, y + 77); c.textAlign = 'left';
    c.strokeStyle = p.heroLine || p.line; c.lineWidth = 2; rr(c, 1000, y + 38, 216, 62, pill(62)); c.stroke();
    c.fillStyle = heroInk; c.textAlign = 'center'; c.fillText(p.cta2 || '', 1108, y + 77); c.textAlign = 'left';
    (p.points || []).forEach((pt, i) => {
      const x = 64 + i * 390;
      c.strokeStyle = p.heroLine || p.line; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, 700); c.lineTo(x + 360, 700); c.stroke();
      c.fillStyle = p.accent; c.font = `600 19px ${body}`; c.fillText('0' + (i + 1), x, 742);
      c.fillStyle = heroInk; c.font = `400 21px ${body}`; c.fillText(pt, x + 48, 742);
    });
    y = 826;
  }
  y += 50;
  c.fillStyle = p.ink; c.font = `${wt} 44px ${head}`; c.fillText(up('Услуги'), 64, y + 46);
  c.fillStyle = p.muted; c.font = `400 17px ${body}`; c.textAlign = 'right'; c.fillText('Все услуги →', W - 64, y + 42); c.textAlign = 'left';
  const cw = (W - 128 - 60) / 4;
  (p.services || []).slice(0, 4).forEach((s, i) => {
    const x = 64 + i * (cw + 20), yy = y + 86;
    shade(c, true); c.fillStyle = p.surface; rr(c, x, yy, cw, 236, p.serif ? 0 : 18); c.fill(); shade(c, false);
    c.strokeStyle = p.line; c.lineWidth = 1.5; c.stroke();
    c.fillStyle = p.accent; c.globalAlpha = 0.12; rr(c, x + 24, yy + 24, 48, 48, p.serif ? 0 : 12); c.fill(); c.globalAlpha = 1;
    c.fillStyle = p.accent; c.font = `600 17px ${body}`; c.textAlign = 'center'; c.fillText('0' + (i + 1), x + 48, yy + 54); c.textAlign = 'left';
    c.fillStyle = p.ink; c.font = `600 24px ${head}`; wrap(c, s, x + 24, yy + 150, cw - 48, 29);
    c.fillStyle = p.muted; c.font = `400 15px ${body}`; c.fillText('Подробнее →', x + 24, yy + 210);
  });
  y += 380;
  shade(c, true); c.fillStyle = p.accent; rr(c, 64, y, W - 128, 210, p.serif ? 0 : 26); c.fill(); shade(c, false);
  c.fillStyle = p.accentInk; c.font = `${wt} 42px ${head}`; c.fillText(p.contactTitle || '', 110, y + 96);
  c.font = `400 19px ${body}`; c.fillText(p.contactSub || '', 110, y + 140);
  c.fillStyle = 'rgba(255,255,255,0.9)'; rr(c, 660, y + 74, 190, 62, pill(62)); c.fill(); rr(c, 862, y + 74, 190, 62, pill(62)); c.fill();
  c.fillStyle = isDark(p.accent) ? '#FFFFFF' : '#111111'; rr(c, 1064, y + 74, 110, 62, pill(62)); c.fill();
  c.fillStyle = '#777'; c.font = `400 17px ${body}`; c.fillText('Ваше имя', 686, y + 112); c.fillText('Телефон', 888, y + 112);
  c.fillStyle = isDark(p.accent) ? '#111111' : '#FFFFFF'; c.font = `600 17px ${body}`; c.textAlign = 'center'; c.fillText('→', 1119, y + 112); c.textAlign = 'left';
  y += 300;
  c.fillStyle = p.ink; c.font = `${wt} 44px ${head}`; c.fillText(up('Почему выбирают нас'), 64, y + 40);
  (p.points || []).forEach((pt, i) => {
    const x = 64 + i * 390;
    c.fillStyle = p.accent; c.font = `700 88px ${head}`; c.fillText('0' + (i + 1), x, y + 186);
    c.fillStyle = p.ink; c.font = `600 25px ${head}`; c.fillText(pt, x, y + 244);
    c.fillStyle = p.muted; c.font = `400 17px ${body}`; wrap(c, 'Подробное описание преимущества для клиента компании.', x, y + 282, 330, 26);
  });
  c.fillStyle = heroBg; c.fillRect(0, H - 130, W, 130);
  c.fillStyle = heroInk; c.font = `700 22px ${head}`; c.fillText(up(p.brand || ''), 64, H - 58);
  c.fillStyle = heroMuted; c.font = `400 17px ${body}`; c.fillText(p.phone || '', 560, H - 58); c.fillText(site.domain || '', 1000, H - 58);
}

// ---------- Экран админ-панели ----------
function drawAdmin(cv, hl) {
  const [c, W, H] = scaled(cv, 1600);
  c.fillStyle = '#0F0F0E'; c.fillRect(0, 0, W, H);
  c.fillStyle = '#151513'; c.fillRect(0, 0, 300, H);
  c.fillStyle = OR; rr(c, 36, 40, 44, 44, 12); c.fill();
  c.fillStyle = '#0C0C0B'; c.font = `700 22px ${HEAD}`; c.textAlign = 'center'; c.fillText('В', 58, 70); c.textAlign = 'left';
  c.fillStyle = '#F1EEE7'; c.font = `600 19px ${HEAD}`; c.fillText('Админ-панель', 96, 70);
  ['Заявки', 'Клиенты', 'Услуги', 'Цены', 'Контент', 'Настройки'].forEach((m, i) => {
    const y = 136 + i * 62;
    if (i === 0) { c.fillStyle = '#22211E'; rr(c, 20, y, 260, 50, 12); c.fill(); c.fillStyle = OR; rr(c, 20, y + 10, 4, 30, 2); c.fill(); }
    c.strokeStyle = i === 0 ? OR : '#5B584F'; c.lineWidth = 2; rr(c, 44, y + 16, 18, 18, 4); c.stroke();
    c.fillStyle = i === 0 ? '#F1EEE7' : '#A4A095'; c.font = `500 19px ${BODY}`; c.fillText(m, 76, y + 32);
    if (i === 0) { c.fillStyle = OR; rr(c, 226, y + 13, 38, 24, 12); c.fill(); c.fillStyle = '#0C0C0B'; c.font = `700 15px ${BODY}`; c.textAlign = 'center'; c.fillText('3', 245, y + 30); c.textAlign = 'left'; }
  });
  c.fillStyle = '#1C1C19'; rr(c, 20, H - 100, 260, 70, 16); c.fill();
  c.fillStyle = '#33322D'; c.beginPath(); c.arc(56, H - 65, 18, 0, 7); c.fill();
  c.fillStyle = '#F1EEE7'; c.font = `600 16px ${BODY}`; c.fillText('Владелец', 86, H - 70); c.fillStyle = '#A4A095'; c.font = `400 14px ${BODY}`; c.fillText('Администратор', 86, H - 48);
  c.fillStyle = '#F1EEE7'; c.font = `600 38px ${HEAD}`; c.fillText('Заявки', 350, 88);
  c.fillStyle = '#A4A095'; c.font = `400 18px ${BODY}`; c.fillText('Все заявки с сайта и Telegram-бота', 350, 122);
  c.fillStyle = '#151513'; rr(c, W - 560, 52, 290, 54, 27); c.fill(); c.fillStyle = '#5B584F'; c.font = `400 17px ${BODY}`; c.fillText('Поиск по заявкам', W - 520, 85);
  c.strokeStyle = '#5B584F'; c.lineWidth = 2; c.beginPath(); c.arc(W - 540, 78, 7, 0, 7); c.stroke();
  c.fillStyle = OR; rr(c, W - 250, 52, 200, 54, 27); c.fill(); c.fillStyle = '#0C0C0B'; c.font = `600 17px ${BODY}`; c.textAlign = 'center'; c.fillText('+ Новая заявка', W - 150, 85); c.textAlign = 'left';
  [['Новые', '3', '+1 сегодня'], ['В работе', '5', 'в среднем 1 день'], ['Закрыто', '24', 'за месяц']].forEach((s, i) => {
    const x = 350 + i * 250;
    c.fillStyle = '#151513'; rr(c, x, 156, 232, 138, 18); c.fill();
    c.fillStyle = '#A4A095'; c.font = `400 16px ${BODY}`; c.fillText(s[0], x + 24, 192);
    c.fillStyle = i === 0 ? OR : '#F1EEE7'; c.font = `600 46px ${HEAD}`; c.fillText(s[1], x + 24, 252);
    c.fillStyle = '#5B584F'; c.font = `400 14px ${BODY}`; c.fillText(s[2], x + 24, 278);
  });
  const cx = 1110, cyy = 156, cwid = W - cx - 50;
  c.fillStyle = '#151513'; rr(c, cx, cyy, cwid, 138, 18); c.fill();
  c.fillStyle = '#A4A095'; c.font = `400 15px ${BODY}`; c.fillText('Заявки по дням', cx + 20, cyy + 30);
  const bars = [4, 6, 3, 7, 5, 8, 6, 9, 7, 10, 8, 11];
  const bw = (cwid - 40) / bars.length - 6;
  bars.forEach((b, i) => { const bh = b * 6.4; c.fillStyle = i === bars.length - 1 ? OR : '#33322D'; rr(c, cx + 20 + i * (bw + 6), cyy + 122 - bh, bw, bh, 4); c.fill(); });
  const tx = 350, ty = 320, tw = W - 400;
  c.fillStyle = '#151513'; rr(c, tx, ty, tw, H - ty - 36, 18); c.fill();
  const cols = [0, 260, 620, 880];
  c.fillStyle = '#5B584F'; c.font = `500 15px ${BODY}`;
  ['КЛИЕНТ', 'УСЛУГА', 'ИСТОЧНИК', 'СТАТУС'].forEach((h, i) => c.fillText(h, tx + 28 + cols[i], ty + 44));
  const rows = [['Ирина', 'Генеральная уборка', 'Telegram-бот', 'Новая'], ['Олег', 'Диагностика авто', 'Сайт', 'Новая'], ['Марина', 'Замена проводки', 'Сайт', 'В работе'], ['Дмитрий', 'Кухня на заказ', 'Telegram-бот', 'В работе'], ['Анна', 'Маникюр', 'Сайт', 'Закрыта'], ['Сергей', 'Установка кондиционера', 'Сайт', 'Закрыта']];
  rows.forEach((r, i) => {
    const y = ty + 66 + i * 104;
    if (i === hl) { c.fillStyle = 'rgba(255,90,31,0.10)'; rr(c, tx + 12, y + 4, tw - 24, 92, 14); c.fill(); }
    c.strokeStyle = '#22211E'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(tx + 24, y); c.lineTo(tx + tw - 24, y); c.stroke();
    c.fillStyle = i === hl ? OR : '#22211E'; c.beginPath(); c.arc(tx + 50, y + 50, 22, 0, 7); c.fill();
    c.fillStyle = i === hl ? '#0C0C0B' : '#F1EEE7'; c.font = `600 17px ${BODY}`; c.textAlign = 'center'; c.fillText(r[0][0], tx + 50, y + 56); c.textAlign = 'left';
    c.fillStyle = '#F1EEE7'; c.font = `500 19px ${BODY}`; c.fillText(r[0], tx + 86, y + 50); c.fillStyle = '#5B584F'; c.font = `400 14px ${BODY}`; c.fillText('+7 900 000-00-00', tx + 86, y + 72);
    c.fillStyle = '#C9C5BB'; c.font = `400 18px ${BODY}`; c.fillText(r[1], tx + 28 + cols[1], y + 57);
    if (r[2] === 'Telegram-бот') { c.fillStyle = OR; c.beginPath(); c.arc(tx + 34 + cols[2], y + 51, 5, 0, 7); c.fill(); }
    c.fillStyle = '#C9C5BB'; c.fillText(r[2], tx + 28 + cols[2] + (r[2] === 'Telegram-бот' ? 16 : 0), y + 57);
    const st = r[3], sc = st === 'Новая' ? OR : st === 'В работе' ? '#33322D' : '#1C1C19', si = st === 'Новая' ? '#0C0C0B' : '#E4E0D6';
    c.font = `600 15px ${BODY}`; const sw = c.measureText(st).width + 32;
    c.fillStyle = sc; rr(c, tx + 28 + cols[3], y + 32, sw, 36, 18); c.fill();
    c.fillStyle = si; c.fillText(st, tx + 44 + cols[3], y + 56);
  });
}

// ---------- Экран Telegram-бота ----------
function drawBot(cv, step) {
  const [c, W, H] = scaled(cv, 720);
  c.fillStyle = '#0E0E0D'; c.fillRect(0, 0, W, H);
  c.fillStyle = '#131311'; for (let yy = 240; yy < H - 150; yy += 60) for (let xx = (yy / 60) % 2 ? 30 : 60; xx < W; xx += 60) { c.beginPath(); c.arc(xx, yy, 2, 0, 7); c.fill(); }
  c.fillStyle = '#F1EEE7'; c.font = `600 26px ${BODY}`; c.fillText('9:41', 66, 66);
  c.fillStyle = '#F1EEE7'; [0, 1, 2, 3].forEach((i) => rr(c, W - 190 + i * 12, 60 - (i + 1) * 5, 8, (i + 1) * 5, 2)); c.fill();
  c.strokeStyle = '#F1EEE7'; c.lineWidth = 2; rr(c, W - 128, 42, 50, 24, 7); c.stroke(); c.fillStyle = '#F1EEE7'; rr(c, W - 124, 46, 36, 16, 4); c.fill(); rr(c, W - 76, 49, 4, 10, 2); c.fill();
  c.fillStyle = '#151513'; c.fillRect(0, 100, W, 130);
  c.fillStyle = OR; c.font = `400 44px ${BODY}`; c.fillText('‹', 30, 182);
  c.fillStyle = OR; c.beginPath(); c.arc(120, 165, 38, 0, 7); c.fill();
  c.fillStyle = '#0C0C0B'; c.font = `700 30px ${HEAD}`; c.textAlign = 'center'; c.fillText('В', 120, 176); c.textAlign = 'left';
  c.fillStyle = '#F1EEE7'; c.font = `600 28px ${BODY}`; c.fillText('Ванлав · заявки', 176, 158);
  c.fillStyle = '#A4A095'; c.font = `400 22px ${BODY}`; c.fillText('бот · онлайн', 176, 192);
  c.fillStyle = '#1C1C19'; rr(c, W / 2 - 70, 256, 140, 40, 20); c.fill();
  c.fillStyle = '#A4A095'; c.font = `500 19px ${BODY}`; c.textAlign = 'center'; c.fillText('Сегодня', W / 2, 283); c.textAlign = 'left';
  let y = 326;
  const card = (title, lines, time, withBtns) => {
    const h = 88 + lines.length * 42 + 34;
    c.fillStyle = '#1C1C19'; rr(c, 30, y, W - 140, h, 28); c.fill();
    c.fillStyle = OR; rr(c, 30, y + 22, 6, h - 44, 3); c.fill();
    c.fillStyle = OR; c.font = `700 20px ${BODY}`; c.fillText('●', 62, y + 52);
    c.fillStyle = '#F1EEE7'; c.font = `700 26px ${BODY}`; c.fillText(title, 90, y + 54);
    lines.forEach((l, i) => { c.fillStyle = '#A4A095'; c.font = `400 23px ${BODY}`; c.fillText(l[0], 62, y + 102 + i * 42); const w0 = c.measureText(l[0]).width; c.fillStyle = '#F1EEE7'; c.font = `500 23px ${BODY}`; c.fillText(l[1], 62 + w0, y + 102 + i * 42); });
    c.fillStyle = '#5B584F'; c.font = `400 18px ${BODY}`; c.textAlign = 'right'; c.fillText(time, W - 140, y + h - 20); c.textAlign = 'left';
    y += h + 10;
    if (withBtns) {
      const bw = (W - 140 - 10) / 2;
      c.fillStyle = '#22211E'; rr(c, 30, y, bw, 62, 18); c.fill(); rr(c, 40 + bw, y, bw, 62, 18); c.fill();
      c.font = `600 22px ${BODY}`; c.textAlign = 'center'; c.fillStyle = OR; c.fillText('✓ Принять', 30 + bw / 2, y + 40); c.fillStyle = '#F1EEE7'; c.fillText('Перезвонить', 40 + bw * 1.5, y + 40); c.textAlign = 'left';
      y += 62 + 24;
    } else y += 14;
  };
  const mine = (text, time) => {
    c.font = `500 24px ${BODY}`; const w = c.measureText(text).width + 120;
    c.fillStyle = OR; rr(c, W - 30 - w, y, w, 70, 28); c.fill();
    c.fillStyle = '#0C0C0B'; c.fillText(text, W - 30 - w + 28, y + 44);
    c.font = `400 16px ${BODY}`; c.fillText(time + ' ✓✓', W - 30 - 84, y + 46); y += 70 + 24;
  };
  const note = (text, time) => {
    c.font = `400 23px ${BODY}`;
    c.fillStyle = '#1C1C19'; rr(c, 30, y, W - 140, 118, 28); c.fill();
    c.fillStyle = '#F1EEE7'; wrap(c, text, 60, y + 46, W - 220, 33);
    c.fillStyle = '#5B584F'; c.font = `400 18px ${BODY}`; c.textAlign = 'right'; c.fillText(time, W - 140, y + 100); c.textAlign = 'left';
    y += 118 + 24;
  };
  if (step >= 1) card('Новая заявка с сайта', [['Имя: ', 'Ирина'], ['Телефон: ', '+7 900 000-00-00'], ['Услуга: ', 'Генеральная уборка'], ['Сайт: ', 'cleanpro.ru']], '10:24', true);
  if (step >= 2) mine('Принять', '10:25');
  if (step >= 3) note('Заявка принята. Статус обновлён в админ-панели.', '10:25');
  if (step >= 4) card('Новая заявка с сайта', [['Имя: ', 'Олег'], ['Услуга: ', 'Диагностика'], ['Сайт: ', 'autopro-service.ru']], '10:31', false);
  c.fillStyle = '#151513'; c.fillRect(0, H - 150, W, 150);
  c.fillStyle = '#1C1C19'; rr(c, 30, H - 122, W - 140, 72, 36); c.fill();
  c.fillStyle = '#5B584F'; c.font = `400 23px ${BODY}`; c.fillText('Сообщение', 64, H - 77);
  c.fillStyle = OR; c.beginPath(); c.arc(W - 66, H - 86, 36, 0, 7); c.fill();
  c.fillStyle = '#0C0C0B'; c.font = `700 30px ${BODY}`; c.textAlign = 'center'; c.fillText('↑', W - 66, H - 75); c.textAlign = 'left';
  c.fillStyle = '#F1EEE7'; rr(c, W / 2 - 110, H - 24, 220, 8, 4); c.fill();
}

// ---------- Надписи на клавишах ----------
function drawKeyLegends(cv, keys, area) {
  const c = cv.getContext('2d'), CW = cv.width, CH = cv.height;
  c.clearRect(0, 0, CW, CH);
  keys.forEach((k) => {
    const x = (k.x - area.x0) / area.w * CW, y = (k.z - area.z0) / area.d * CH;
    const fs = k.small ? 20 : 30;
    c.fillStyle = k.orange ? '#1a0a04' : 'rgba(225,222,214,0.92)';
    c.font = `500 ${fs}px ${BODY}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(k.label, x, y);
  });
}


const loadImage = (src) => new Promise((res) => { const im = new Image(); im.decoding = 'async'; im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });

/**
 * Монтирует сцену в host (position:relative/absolute элемент). Возвращает функцию очистки.
 * opts: { mode: 'hero' | 'automation', sites: Site[], startId?: string }
 */
export function mountDevices(host, opts) {
  const state = { dead: false, raf: 0, renderer: null, ro: null, io: null, pm: null, lazy: null };
  const cleanup = () => {
    state.dead = true;
    state.lazy && state.lazy.disconnect();
    cancelAnimationFrame(state.raf);
    state.io && state.io.disconnect();
    state.ro && state.ro.disconnect();
    state.pm && window.removeEventListener('pointermove', state.pm);
    if (state.renderer) { state.renderer.dispose(); state.renderer.forceContextLoss && state.renderer.forceContextLoss(); state.renderer.domElement.remove(); }
  };
  const start = () => init().catch((e) => console.warn('devices3d:', e));
  if (!('IntersectionObserver' in window)) setTimeout(start, 0);
  else {
    state.lazy = new IntersectionObserver(([e]) => { if (e.isIntersecting) { state.lazy.disconnect(); state.lazy = null; start(); } }, { rootMargin: '600px 0px' });
    state.lazy.observe(host);
  }

  async function init() {
    const T = await import('three');
    try { await Promise.all([`600 40px ${HEAD}`, `700 40px ${HEAD}`, `400 20px ${BODY}`, `500 20px ${BODY}`, `600 20px ${BODY}`, `700 20px ${BODY}`, "700 40px 'Commissioner'", "800 40px 'Commissioner'", "400 20px 'IBM Plex Sans'", "600 20px 'IBM Plex Sans'", "500 40px 'IBM Plex Serif'"].map((f) => document.fonts.load(f))); } catch (e) {}
    const imgs = {};
    await Promise.all((opts.sites || []).filter((s) => s.image).map(async (s) => { imgs[s.id] = await loadImage(s.image); }));
    if (state.dead) return;
    const mode = opts.mode || 'hero';
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    state.renderer = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 800 ? 1.25 : 1.75));
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    const cvs = renderer.domElement; 
    host.appendChild(cvs);
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(28, 1, 0.1, 100);

    // студийное окружение для отражений
    const pm = new T.PMREMGenerator(renderer);
    const env = new T.Scene();
    env.add(new T.Mesh(new T.BoxGeometry(24, 24, 24), new T.MeshBasicMaterial({ color: 0x0d0d0c, side: T.BackSide })));
    const panel = (w, h, col, k, pos) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(col).multiplyScalar(k), side: T.DoubleSide })); m.position.set(...pos); m.lookAt(0, 0, 0); env.add(m); };
    panel(9, 2.4, 0xffffff, 3.4, [0, 9, 1]);
    panel(2.2, 7, 0xffffff, 2.0, [-9, 2, 2]);
    panel(2.2, 7, 0xfff3ea, 1.4, [9, 3, 3]);
    panel(6, 3, 0xff5a1f, 0.8, [-6, 2, -8]);
    panel(12, 0.8, 0xffffff, 1.2, [0, 2.5, 10]);
    scene.environment = pm.fromScene(env, 0.03).texture;

    scene.add(new T.HemisphereLight(0xfff4ea, 0x0c0c0b, 0.3));
    const key = new T.DirectionalLight(0xffffff, 2.4); key.position.set(3, 7.5, 5.5); key.castShadow = true;
    key.shadow.mapSize.set(window.innerWidth < 800 ? 1024 : 2048, window.innerWidth < 800 ? 1024 : 2048); Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 0.5, far: 25 }); key.shadow.bias = -0.0003; key.shadow.normalBias = 0.02;
    scene.add(key);
    const rim = new T.DirectionalLight(0xff8a5c, 1.3); rim.position.set(-5, 3.2, -4.5); scene.add(rim);
    const fill = new T.DirectionalLight(0xffe7d6, 0.5); fill.position.set(5, 2, -3); scene.add(fill);
    const ground = new T.Mesh(new T.PlaneGeometry(40, 40), new T.ShadowMaterial({ opacity: 0.55 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
    const gc = document.createElement('canvas'); gc.width = gc.height = 256; const gx = gc.getContext('2d'); const rg = gx.createRadialGradient(128, 128, 0, 128, 128, 128); rg.addColorStop(0, 'rgba(255,90,31,0.35)'); rg.addColorStop(1, 'rgba(255,90,31,0)'); gx.fillStyle = rg; gx.fillRect(0, 0, 256, 256);
    const glow = new T.Mesh(new T.PlaneGeometry(5, 5), new T.MeshBasicMaterial({ map: new T.CanvasTexture(gc), transparent: true, depthWrite: false, opacity: 0.3 }));
    glow.rotation.x = -Math.PI / 2; glow.position.y = 0.002; scene.add(glow);

    // ---- геометрия и материалы ----
    const rrShape = (w, h, r) => { const s = new T.Shape(), x = -w / 2, y = -h / 2; s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; };
    const slab = (w, h, d, r, bev, seg) => { const b = Math.min(bev, d / 2 - 0.001); const g = new T.ExtrudeGeometry(rrShape(w - 2 * b, h - 2 * b, Math.max(0.003, r - b)), { depth: Math.max(0.0005, d - 2 * b), bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: seg || 6, curveSegments: 24 }); g.translate(0, 0, -Math.max(0.0005, d - 2 * b) / 2); g.computeVertexNormals(); return g; };
    const flat = (w, h, r) => { const g = new T.ShapeGeometry(rrShape(w, h, r), 24); const pos = g.attributes.position, uv = g.attributes.uv; for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h); uv.needsUpdate = true; return g; };
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const texOf = (cv) => { const t = new T.CanvasTexture(cv); t.colorSpace = T.SRGBColorSpace; t.anisotropy = maxAniso; return t; };
    const noise = (() => { const cv = document.createElement('canvas'); cv.width = cv.height = 256; const c = cv.getContext('2d'); const im = c.createImageData(256, 256); for (let i = 0; i < im.data.length; i += 4) { const v = 150 + Math.random() * 70; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } c.putImageData(im, 0, 0); const t = new T.CanvasTexture(cv); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(6, 6); return t; })();
    const std = (o) => new T.MeshPhysicalMaterial(o);
    const alu = std({ color: 0x74777d, metalness: 0.9, roughness: 0.3, roughnessMap: noise, clearcoat: 0.25, clearcoatRoughness: 0.4 });
    const aluEdge = std({ color: 0x5a5c62, metalness: 1, roughness: 0.18 });
    const deckMat = std({ color: 0x18191b, metalness: 0.5, roughness: 0.55, roughnessMap: noise });
    const titanium = std({ color: 0x8f8b84, metalness: 0.95, roughness: 0.24, roughnessMap: noise, clearcoat: 0.5, clearcoatRoughness: 0.2 });
    const glassBlack = std({ color: 0x020203, metalness: 0.1, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.02 });
    const keyMat = std({ color: 0x141416, metalness: 0.15, roughness: 0.58 });
    const orangeKey = std({ color: 0xff5a1f, metalness: 0.1, roughness: 0.42, emissive: 0xff5a1f, emissiveIntensity: 0.3 });
    const portMat = new T.MeshBasicMaterial({ color: 0x050505 });
    const reflTex = (() => { const cv = document.createElement('canvas'); cv.width = cv.height = 512; const c = cv.getContext('2d'); const g = c.createLinearGradient(0, 0, 512, 512); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.38, 'rgba(255,255,255,0)'); g.addColorStop(0.46, 'rgba(255,255,255,0.10)'); g.addColorStop(0.6, 'rgba(255,255,255,0.03)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, 512, 512); return new T.CanvasTexture(cv); })();
    const reflMat = new T.MeshBasicMaterial({ map: reflTex, transparent: true, blending: T.AdditiveBlending, depthWrite: false });
    const shadowy = (m) => { m.traverse((o) => { if (o.isMesh && !o.userData.noShadow) { o.castShadow = true; o.receiveShadow = true; } }); return m; };
    const screenMat = (tex) => new T.MeshBasicMaterial({ map: tex, toneMapped: false });
    const sites = opts.sites || [];
    const anim = [];

    const makeLaptop = () => {
      const g = new T.Group(), W = 3.1, D = 2.14, bt = 0.08;
      const base = new T.Mesh(slab(W, D, bt, 0.17, 0.028), alu); base.rotation.x = -Math.PI / 2; base.position.y = bt / 2 + 0.012; g.add(base);
      const bottom = new T.Mesh(slab(W - 0.06, D - 0.06, 0.02, 0.15, 0.008), std({ color: 0x2a2b2f, metalness: 0.8, roughness: 0.5 })); bottom.rotation.x = -Math.PI / 2; bottom.position.y = 0.011; g.add(bottom);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => { const f = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.012, 24), new T.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.9 })); f.position.set(sx * (W / 2 - 0.25), 0.006, sz * (D / 2 - 0.22)); g.add(f); });
      const top = bt + 0.012;
      const notch = new T.Mesh(new T.BoxGeometry(0.5, 0.014, 0.05), std({ color: 0x2e2f33, metalness: 0.9, roughness: 0.25 })); notch.position.set(0, top - 0.006, D / 2 - 0.02); g.add(notch);
      [-0.55, -0.35].forEach((z) => { const p = new T.Mesh(flat(0.11, 0.032, 0.014), portMat); p.rotation.y = -Math.PI / 2; p.position.set(-W / 2 - 0.0008, bt / 2 + 0.012, z); p.userData.noShadow = true; g.add(p); });
      const jack = new T.Mesh(new T.CircleGeometry(0.018, 24), portMat); jack.rotation.y = Math.PI / 2; jack.position.set(W / 2 + 0.0008, bt / 2 + 0.012, -0.5); jack.userData.noShadow = true; g.add(jack);
      const deck = new T.Mesh(flat(2.72, 1.04, 0.05), deckMat); deck.rotation.x = -Math.PI / 2; deck.position.set(0, top + 0.0008, -0.3); g.add(deck);
      const pitch = 0.188, x0 = -1.222, z0 = -0.725;
      const kGeo = slab(0.162, 0.156, 0.022, 0.032, 0.007, 3); kGeo.rotateX(-Math.PI / 2);
      const L = [['esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫'], ['⇥', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\'], ['⇪', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Ё', '⏎'], ['⇧', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', ',', '↑', '⇧']];
      const legends = [];
      const keys = new T.InstancedMesh(kGeo, keyMat, 80); let k = 0; const m4 = new T.Matrix4();
      const ky = top + 0.013;
      for (let r = 0; r < 4; r++) for (let cI = 0; cI < 14; cI++) {
        const x = x0 + cI * pitch, z = z0 + r * pitch;
        legends.push({ x, z, label: L[r][cI], small: L[r][cI].length > 1, orange: r === 2 && cI === 13 });
        if (r === 2 && cI === 13) continue; m4.makeTranslation(x, ky, z); keys.setMatrixAt(k++, m4);
      }
      const br = z0 + 4 * pitch;
      [['fn', 0], ['ctrl', 1], ['⌥', 2], ['←', 11], ['↓', 12], ['→', 13]].forEach(([lb, i]) => { const x = x0 + i * pitch; m4.makeTranslation(x, ky, br); keys.setMatrixAt(k++, m4); legends.push({ x, z: br, label: lb, small: true }); });
      keys.count = k; g.add(keys);
      const spW = pitch * 8 - 0.026; const spGeo = slab(spW, 0.156, 0.022, 0.032, 0.007, 3); spGeo.rotateX(-Math.PI / 2);
      const space = new T.Mesh(spGeo, keyMat); space.position.set(x0 + 3 * pitch + (pitch * 7) / 2, ky, br); g.add(space);
      const enter = new T.Mesh(kGeo, orangeKey); enter.position.set(x0 + 13 * pitch, ky, z0 + 2 * pitch); g.add(enter);
      const area = { x0: x0 - pitch / 2, w: pitch * 14, z0: z0 - pitch / 2, d: pitch * 5 };
      const lc = document.createElement('canvas'); lc.width = 2048; lc.height = Math.round(2048 * area.d / area.w); drawKeyLegends(lc, legends, area);
      const lt = texOf(lc);
      const legendPlane = new T.Mesh(new T.PlaneGeometry(area.w, area.d), new T.MeshBasicMaterial({ map: lt, transparent: true, depthWrite: false, toneMapped: false }));
      legendPlane.rotation.x = -Math.PI / 2; legendPlane.position.set(area.x0 + area.w / 2, ky + 0.0115, area.z0 + area.d / 2); legendPlane.userData.noShadow = true; g.add(legendPlane);
      const gcv = document.createElement('canvas'); gcv.width = 64; gcv.height = 512; const gx2 = gcv.getContext('2d'); gx2.fillStyle = '#050505'; for (let yy = 8; yy < 512; yy += 14) for (let xx = 8; xx < 64; xx += 14) { gx2.beginPath(); gx2.arc(xx + ((yy / 14) % 2 ? 7 : 0), yy, 3, 0, 7); gx2.fill(); }
      const grMat = new T.MeshBasicMaterial({ map: new T.CanvasTexture(gcv), transparent: true, depthWrite: false });
      [-1, 1].forEach((sx) => { const gr = new T.Mesh(new T.PlaneGeometry(0.12, 0.96), grMat); gr.rotation.x = -Math.PI / 2; gr.position.set(sx * 1.43, top + 0.0012, -0.3); gr.userData.noShadow = true; g.add(gr); });
      const padEdge = new T.Mesh(flat(1.3, 0.74, 0.07), std({ color: 0x1a1b1e, metalness: 0.9, roughness: 0.3 })); padEdge.rotation.x = -Math.PI / 2; padEdge.position.set(0, top + 0.0008, 0.64); g.add(padEdge);
      const pad = new T.Mesh(flat(1.28, 0.72, 0.065), std({ color: 0x3a3c41, metalness: 0.85, roughness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.15 })); pad.rotation.x = -Math.PI / 2; pad.position.set(0, top + 0.0014, 0.64); g.add(pad);
      const hinge = new T.Mesh(new T.CylinderGeometry(0.045, 0.045, W - 0.5, 40), std({ color: 0x1c1d20, metalness: 0.8, roughness: 0.35 })); hinge.rotation.z = Math.PI / 2; hinge.position.set(0, top + 0.012, -D / 2 + 0.035); g.add(hinge);
      const lidPivot = new T.Group(); lidPivot.position.set(0, top + 0.012, -D / 2 + 0.035); g.add(lidPivot);
      const lid = new T.Group(); lidPivot.add(lid); lidPivot.rotation.x = -0.22;
      const LH = 2.06, lt2 = 0.05;
      lid.add(new T.Mesh(slab(W, LH, lt2, 0.17, 0.02), alu)); lid.children[0].position.set(0, LH / 2, 0);
      const bezel = new T.Mesh(flat(W - 0.05, LH - 0.05, 0.15), glassBlack); bezel.position.set(0, LH / 2, lt2 / 2 + 0.0006); lid.add(bezel);
      const cv = document.createElement('canvas'); cv.width = 2048; cv.height = 3200;
      let si = Math.max(0, sites.findIndex((s) => s.id === opts.startId)); if (sites[si]) drawSite(cv, sites[si], imgs[sites[si].id]);
      const tex = texOf(cv); const sw = 2.92, sh = 1.83; const frac = (1280 / (sw / sh)) / 2000;
      tex.repeat.set(1, frac); tex.offset.set(0, 1 - frac);
      const disp = new T.Mesh(flat(sw, sh, 0.035), screenMat(tex)); disp.position.set(0, LH / 2 + 0.03, lt2 / 2 + 0.0012); disp.userData.noShadow = true; lid.add(disp);
      const refl = new T.Mesh(flat(W - 0.05, LH - 0.05, 0.15), reflMat); refl.position.set(0, LH / 2, lt2 / 2 + 0.002); refl.userData.noShadow = true; lid.add(refl);
      const cam = new T.Mesh(new T.CircleGeometry(0.013, 24), std({ color: 0x10121c, metalness: 0.4, roughness: 0.05, clearcoat: 1 })); cam.position.set(0, LH - 0.045, lt2 / 2 + 0.0015); lid.add(cam);
      const lg = document.createElement('canvas'); lg.width = lg.height = 256; const lgc = lg.getContext('2d'); lgc.fillStyle = OR; rr(lgc, 16, 16, 224, 224, 56); lgc.fill(); lgc.fillStyle = '#0C0C0B'; lgc.font = `700 150px ${HEAD}`; lgc.textAlign = 'center'; lgc.textBaseline = 'middle'; lgc.fillText('В', 128, 138);
      const logo = new T.Mesh(new T.PlaneGeometry(0.3, 0.3), std({ map: texOf(lg), metalness: 0.5, roughness: 0.3, transparent: true, emissive: 0xff5a1f, emissiveIntensity: 0.08 })); logo.position.set(0, LH / 2, -lt2 / 2 - 0.0008); logo.rotation.set(0, Math.PI, -0.1); lid.add(logo);
      let lastIdx = -1;
      anim.push((t) => {
        const cyc = 9, ph = t % cyc;
        const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        let s = 0; if (ph > 2.2 && ph < 6.2) s = ease((ph - 2.2) / 4); else if (ph >= 6.2) s = 1;
        tex.offset.y = (1 - frac) * (1 - s);
        const idx = Math.floor(t / cyc);
        if (idx !== lastIdx && sites.length) { if (lastIdx >= 0) { si = (si + 1) % sites.length; drawSite(cv, sites[si], imgs[sites[si].id]); tex.needsUpdate = true; } lastIdx = idx; }
      });
      return shadowy(g);
    };

    const makePhone = () => {
      const g = new T.Group(), W = 0.76, H = 1.6, D = 0.082;
      g.add(new T.Mesh(slab(W, H, D, 0.135, 0.03), titanium));
      const front = new T.Mesh(flat(W - 0.022, H - 0.022, 0.122), glassBlack); front.position.z = D / 2 + 0.0006; g.add(front);
      const dw = W - 0.062, dh = H - 0.062;
      const cv = document.createElement('canvas'); cv.width = 1440; cv.height = Math.round(1440 * dh / dw);
      let step = 1; drawBot(cv, step); const tex = texOf(cv);
      const disp = new T.Mesh(flat(dw, dh, 0.105), screenMat(tex)); disp.position.z = D / 2 + 0.0012; disp.userData.noShadow = true; g.add(disp);
      const island = new T.Mesh(flat(0.2, 0.056, 0.028), new T.MeshBasicMaterial({ color: 0x000000 })); island.position.set(0, H / 2 - 0.075, D / 2 + 0.0018); g.add(island);
      const refl = new T.Mesh(flat(W - 0.022, H - 0.022, 0.122), reflMat); refl.position.z = D / 2 + 0.0024; refl.userData.noShadow = true; g.add(refl);
      const camBlock = new T.Mesh(slab(0.32, 0.32, 0.02, 0.085, 0.008), std({ color: 0x7c7870, metalness: 0.9, roughness: 0.18, clearcoat: 1 })); camBlock.position.set(-W / 2 + 0.215, H / 2 - 0.215, -D / 2 - 0.008); g.add(camBlock);
      [[-0.066, 0.066], [-0.066, -0.066], [0.07, 0]].forEach(([x, y]) => {
        const ring = new T.Mesh(new T.CylinderGeometry(0.054, 0.054, 0.022, 48), aluEdge); ring.rotation.x = Math.PI / 2; ring.position.set(-W / 2 + 0.215 + x, H / 2 - 0.215 + y, -D / 2 - 0.022); g.add(ring);
        const lens = new T.Mesh(new T.CircleGeometry(0.04, 48), std({ color: 0x06060c, metalness: 0.4, roughness: 0.03, clearcoat: 1, iridescence: 0.6, iridescenceIOR: 1.6 })); lens.position.set(-W / 2 + 0.215 + x, H / 2 - 0.215 + y, -D / 2 - 0.0335); lens.rotation.y = Math.PI; g.add(lens);
      });
      const btn = (y, h, side) => { const b = new T.Mesh(slab(0.016, h, 0.028, 0.006, 0.003, 2), titanium); b.rotation.y = Math.PI / 2; b.position.set(side * (W / 2 + 0.004), y, 0); g.add(b); };
      btn(0.4, 0.1, -1); btn(0.23, 0.16, -1); btn(0.03, 0.16, -1); btn(0.28, 0.26, 1);
      let last = 0;
      anim.push((t) => { if (t - last > 1.6) { last = t; step = (step + 1) % 7; drawBot(cv, Math.min(Math.max(step, 1), 4)); tex.needsUpdate = true; } });
      return shadowy(g);
    };

    const makeTablet = () => {
      const g = new T.Group(), W = 2.34, H = 1.64, D = 0.058;
      g.add(new T.Mesh(slab(W, H, D, 0.13, 0.02), alu));
      const front = new T.Mesh(flat(W - 0.022, H - 0.022, 0.118), glassBlack); front.position.z = D / 2 + 0.0006; g.add(front);
      const dw = W - 0.13, dh = dw * 1100 / 1600;
      const cv = document.createElement('canvas'); cv.width = 2400; cv.height = 1650;
      let hl = 0; drawAdmin(cv, hl); const tex = texOf(cv);
      const disp = new T.Mesh(flat(dw, dh, 0.05), screenMat(tex)); disp.position.z = D / 2 + 0.0012; disp.userData.noShadow = true; g.add(disp);
      const refl = new T.Mesh(flat(W - 0.022, H - 0.022, 0.118), reflMat); refl.position.z = D / 2 + 0.0024; refl.userData.noShadow = true; g.add(refl);
      const cam = new T.Mesh(new T.CircleGeometry(0.011, 20), std({ color: 0x10121c, roughness: 0.05 })); cam.position.set(0, H / 2 - 0.032, D / 2 + 0.0016); g.add(cam);
      const lg = document.createElement('canvas'); lg.width = lg.height = 256; const lgc = lg.getContext('2d'); lgc.fillStyle = OR; rr(lgc, 16, 16, 224, 224, 56); lgc.fill(); lgc.fillStyle = '#0C0C0B'; lgc.font = `700 150px ${HEAD}`; lgc.textAlign = 'center'; lgc.textBaseline = 'middle'; lgc.fillText('В', 128, 138);
      const logo = new T.Mesh(new T.PlaneGeometry(0.22, 0.22), new T.MeshStandardMaterial({ map: texOf(lg), transparent: true, metalness: 0.4, roughness: 0.3 })); logo.position.z = -D / 2 - 0.0008; logo.rotation.y = Math.PI; g.add(logo);
      let last = 0;
      anim.push((t) => { if (t - last > 2.2) { last = t; hl = (hl + 1) % 3; drawAdmin(cv, hl); tex.needsUpdate = true; } });
      return shadowy(g);
    };

    const root = new T.Group(); scene.add(root);
    let baseRY = 0, lookY = 0.9, dist = 7, camH = 2.6, spin = 0.35;
    if (mode === 'automation') {
      const tablet = makeTablet(); tablet.position.set(-0.25, 0.93, 0.05); tablet.rotation.set(-0.2, 0.16, 0); root.add(tablet);
      const standBase = new T.Mesh(slab(1.0, 0.44, 0.03, 0.08, 0.01), aluEdge); standBase.rotation.x = -Math.PI / 2; standBase.position.set(-0.25, 0.015, 0.22); standBase.rotation.z = -0.16; root.add(shadowy(standBase));
      const standArm = new T.Mesh(slab(0.5, 0.9, 0.03, 0.04, 0.01), aluEdge); standArm.position.set(-0.25 - 0.03, 0.5, -0.16); standArm.rotation.set(-0.2, 0.16, 0); root.add(shadowy(standArm));
      const phone = makePhone(); phone.position.set(1.5, 0.8, 0.75); phone.rotation.set(-0.06, -0.3, 0.035); root.add(phone);
      const lap = makeLaptop(); lap.scale.setScalar(0.62); lap.position.set(-1.85, 0, -1.25); lap.rotation.y = 0.5; root.add(lap);
      lookY = 0.72; dist = 7.9; camH = 2.1; spin = 0.1;
    } else {
      const lap = makeLaptop(); lap.position.set(0, 0, 0.1); lap.rotation.y = -0.52; root.add(lap);
      baseRY = 0; lookY = 0.8; dist = 6.0; camH = 2.2; spin = 0.08;
    }

    const resize = () => {
      const w = host.clientWidth || 600, h = host.clientHeight || 400;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      const a = w / h, k = Math.max(1, 1.45 / a), d = dist * k;
      camera.position.set(0, camH * k, d); camera.lookAt(0, lookY, 0); camera.updateProjectionMatrix();
    };
    resize();
    state.ro = new ResizeObserver(resize); state.ro.observe(host);
    let px = 0, py = 0, tx = 0, ty = 0;
    state.pm = (e) => { const b = host.getBoundingClientRect(); tx = Math.max(-1, Math.min(1, (e.clientX - b.left - b.width / 2) / (b.width / 2))); ty = Math.max(-1, Math.min(1, (e.clientY - b.top - b.height / 2) / (b.height / 2))); };
    window.addEventListener('pointermove', state.pm, { passive: true });
    let visible = true;
    state.io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '120px' }); state.io.observe(host);
    const clock = { last: performance.now(), elapsedTime: 0, getDelta() { const n = performance.now(); const d = (n - this.last) / 1000; this.last = n; this.elapsedTime += d; return d; } }; let intro = 0; const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loop = () => {
      if (state.dead) return;
      state.raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) { clock.getDelta(); return; }
      const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
      intro = Math.min(1, intro + dt / 1.8); const ei = 1 - Math.pow(1 - intro, 3);
      px += (tx - px) * 0.045; py += (ty - py) * 0.045;
      const b = host.getBoundingClientRect(); const sc = Math.max(-1, Math.min(1, (b.top + b.height / 2 - window.innerHeight / 2) / window.innerHeight));
      root.rotation.y = baseRY + px * 0.14 + sc * spin + (1 - ei) * 0.5;
      root.rotation.x = py * 0.03;
      root.position.y = (reduce ? 0 : Math.sin(t * 0.8) * 0.025) - (1 - ei) * 0.4;
      anim.forEach((f) => f(t, dt));
      renderer.render(scene, camera);
    };
    renderer.render(scene, camera); cvs.classList.add('on');
    loop();
  }

  return cleanup;
}
