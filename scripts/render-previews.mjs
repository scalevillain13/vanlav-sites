// Готовит картинки для витрины:
//  1) рендерит макеты шаблонов-заглушек в /public/sites/mock/<id>.webp (карточки каталога и 3D-витрина
//     показывают картинку вместо тяжёлого DOM-макета — меньше DOM, меньше шрифтов, быстрее скролл);
//  2) делает .webp-копии скриншотов живых сайтов (для экрана 3D-ноутбука).
// Запуск: npm run build && npm start (в другом окне) → npm run previews
// Нужен Chrome: по умолчанию берётся установленный Google Chrome, либо укажите CHROME_PATH.
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');

const res = await fetch(BASE + '/api/sites-manifest');
if (!res.ok) throw new Error('Сервер не отвечает на ' + BASE + ' — запустите npm start');
const sites = await res.json();

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const out = {};
await fs.mkdir(path.join(PUB, 'sites/mock'), { recursive: true });

for (const s of sites) {
  if (s.image) {
    const src = path.join(PUB, s.image);
    const dst = src.replace(/\.(jpe?g|png)$/i, '.webp');
    await sharp(src).webp({ quality: 72 }).toFile(dst);
    console.log('webp', path.relative(PUB, dst));
    continue;
  }
  await page.goto(`${BASE}/templates/${s.id}/demo`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: '.demo-bar{display:none!important}' });
  const el = page.locator('.demo-page > div').nth(1);
  const buf = await el.screenshot({ type: 'png' });
  const img = sharp(buf);
  const meta = await img.metadata();
  await img.webp({ quality: 78 }).toFile(path.join(PUB, `sites/mock/${s.id}.webp`));
  out[s.id] = meta.height;
  console.log('mock', s.id, meta.width + 'x' + meta.height);
}
await browser.close();
await fs.writeFile(path.join(ROOT, 'lib/mock-previews.json'), JSON.stringify(out, null, 2) + '\n');
console.log('готово → lib/mock-previews.json');
