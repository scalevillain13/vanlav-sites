# Ванлав Сайты

Сайт-витрина готовых сайтов. Next.js 16 (App Router) + TypeScript + three.js. Все страницы статические (SSG), единственный серверный код — `/api/lead` (заявки в Telegram).

## Запуск локально

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # проверка продакшн-сборки
```

## Выкладка на Vercel

**Вариант 1 — через GitHub (рекомендуется):**
1. Создайте репозиторий на GitHub и запушьте эту папку (`git remote add origin … && git push -u origin main`).
2. На vercel.com → Add New → Project → выберите репозиторий. Framework определится сам (Next.js), настройки менять не нужно → Deploy.

**Вариант 2 — через CLI:**
```bash
npm i -g vercel
vercel          # превью
vercel --prod   # продакшн
```

### Заявки в Telegram (необязательно)
В Vercel → Project → Settings → Environment Variables добавьте:
- `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather
- `TELEGRAM_CHAT_ID` — ваш chat id (напишите боту, затем откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` и возьмите `chat.id`)

После этого сделайте Redeploy. Пока переменные не заданы, форма работает как в прототипе: открывает Telegram @h4r4dex с готовым текстом заявки.

Опционально `NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru` — для sitemap и OG-ссылок (на Vercel без него берётся продакшн-домен проекта).

## Где что менять

Всё содержимое — в `lib/data.ts`: контакты, данные автора (в т.ч. фото), цены, услуги, шаблоны.

### Как заменить заглушку шаблона на готовый сайт
1. Сделайте скриншот сайта шириной 1280px (первые ~2000px высоты — они же крутятся на экране ноутбука в hero) и положите в `public/sites/<id>.jpg`.
2. В `lib/data.ts` у нужного шаблона заполните:
   - `image: '/sites/<id>.jpg'`
   - `demoUrl: 'https://…'` — ссылка на живой сайт
   - `domain: '…'` — домен в рамке браузера
   - при желании `title`, `description`, `tagline`, `niche`.
3. Готово: карточка в каталоге, 3D-витрина, страница шаблона и ноутбук на главной сами подхватят скриншот, «Посмотреть демо» откроет живой сайт, появится метка «Живой сайт».

Пример — шаблон `napor` (https://napor-landing.vercel.app/).

### Фото автора
Положите фото в `public/author.jpg` и в `lib/data.ts` → `AUTHOR.photo: '/author.jpg'`.

## Структура
- `app/page.tsx` — главная (порядок секций)
- `app/templates/[id]` — страница шаблона, `…/demo` — встроенное демо макета
- `app/api/lead/route.ts` — отправка заявок в Telegram (honeypot + лимит 5 заявок / 10 мин с IP)
- `components/*` — секции
- `lib/devices3d.js` — 3D-сцены (ноутбук в hero, планшет/телефон/ноутбук в «Автоматизации»)
- `app/globals.css` — все стили и дизайн-токены
