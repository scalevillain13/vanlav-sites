// Режет длинные скриншоты живых сайтов на «кадры» для экрана 3D-ноутбука.
// Зачем: картинка 1280×12000 весит ~60 МБ в памяти после декодирования, а iOS Safari рисует такие
// гиганты в canvas с ошибками (полосы, задвоенные блоки). Кадр 1280×2000 — безопасен везде.
// Кадр k начинается с top = min(k·STEP, H−2000). STEP и SLICE_H должны совпадать с lib/devices3d.js.
// Также делает лёгкую копию full-sm.webp (640px) для окон «Живые сайты» на телефонах.
// Запуск: npm run slices
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const STEP = 1150, SLICE_H = 2000;
const PUB = path.resolve(import.meta.dirname, '..', 'public');
const dirs = (await fs.readdir(path.join(PUB, 'sites'), { withFileTypes: true })).filter((d) => d.isDirectory() && d.name !== 'mock');

for (const d of dirs) {
  const src = path.join(PUB, 'sites', d.name, 'full.jpg');
  try { await fs.access(src); } catch { continue; }
  const { width, height } = await sharp(src).metadata();
  const n = height <= SLICE_H ? 1 : Math.ceil((height - SLICE_H) / STEP) + 1;
  const out = path.join(PUB, 'sites', d.name, 'slices');
  await fs.rm(out, { recursive: true, force: true });
  await fs.mkdir(out, { recursive: true });
  for (let k = 0; k < n; k++) {
    const top = Math.min(k * STEP, Math.max(0, height - SLICE_H));
    await sharp(src).extract({ left: 0, top, width, height: Math.min(SLICE_H, height) }).webp({ quality: 80 }).toFile(path.join(out, k + '.webp'));
  }
  await sharp(src).resize({ width: 640 }).webp({ quality: 74 }).toFile(path.join(PUB, 'sites', d.name, 'full-sm.webp'));
  console.log(d.name, `${width}×${height}`, '→', n, 'кадров');
}
