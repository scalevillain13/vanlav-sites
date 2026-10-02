// Ванлав — данные. Редактируйте здесь: контакты, цены, услуги, шаблоны.
import MOCK_PREVIEWS from './mock-previews.json';

export type Preview = {
  variant: 'split' | 'stack';
  bg: string; ink: string; muted: string; accent: string; accentInk: string;
  panel?: string; panelInk?: string; surface: string; line: string;
  heroBg?: string; heroInk?: string; heroMuted?: string; heroLine?: string;
  upper?: boolean; serif?: boolean; weight?: number;
  brand: string; phone: string; nav: string[];
  eyebrow: string; headline: string; sub: string; cta: string; cta2: string; points: string[];
  panelLabel?: string; badge?: string; badgeCaption?: string;
  services: string[]; contactTitle: string; contactSub: string;
};

type RawSite = {
  id: string; title: string; niche: string; group: string;
  description: string; tagline: string; price: number;
  /** Скриншот сайта (путь из /public). Если пусто — рисуется макет из preview */
  image: string;
  /** Обложка для карточек каталога и 3D-витрины (необязательно, иначе берётся image) */
  cover?: string;
  /** высота скриншотов в px при ширине 1280 (для оптимизации картинок) */
  imageH?: number;
  coverH?: number;
  /** Ссылка на живой сайт. Если пусто — открывается встроенное демо */
  demoUrl: string;
  domain: string;
  preview: Preview;
};

export type Site = RawSite & { priceLabel: string; url: string; demo: string; live: boolean };

// Контакты
export const CONTACT = {
  telegram: '@h4r4dex',
  telegramUrl: 'https://t.me/h4r4dex',
  phone: '+7 988 501-54-84',
  phoneHref: 'tel:+79885015484',
};

// Об авторе. photo — путь к фото в /public (например '/author.jpg'); пусто — заглушка
export const AUTHOR = {
  name: 'Александр',
  age: 19,
  experienceYears: 4,
  startYear: 2022,
  city: 'Сочи',
  photo: '',
  github: 'scalevillain13',
  githubUrl: 'https://github.com/scalevillain13',
};

// Путь в разработке: год → что осваивал. Используется в блоке «Обо мне» как таймлайн.
export const EXPERIENCE = [
  { year: 2022, title: 'Начал во фронтенде', text: 'HTML, CSS, JavaScript, вёрстка и первые интерфейсы' },
  { year: 2024, title: 'Перешёл к бэкенду', text: 'Серверная логика, базы данных, API' },
  { year: 2026, title: 'Fullstack-разработчик', text: 'Веду проект от дизайна и фронтенда до бэкенда и сервера' },
];

// Основной стек — показывается в блоке «Обо мне» как часть портфолио
export const STACK = ['HTML', 'CSS', 'Tailwind', 'Git', 'Docker', 'Vite', 'Redis', 'Kubernetes', 'PHP', 'React', 'TypeScript', 'Node.js', 'Laravel', 'MySQL', 'PostgreSQL'];

export const formatPrice = (n: number) =>
  'от ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';

export type Service = {
  id: string; title: string; text: string; from: number; auto?: boolean; points?: string[];
};

const RAW_SERVICES: Service[] = [
  { id: 'card', title: 'Сайт-визитка с нуля', text: 'Одностраничный сайт о компании или специалисте с уникальным дизайном: услуги, контакты, форма заявки.', from: 14900 },
  { id: 'landing', title: 'Лендинг с нуля на заказ', text: 'Продающая страница под вашу услугу или рекламную кампанию — дизайн и тексты с нуля.', from: 19900 },
  { id: 'multi', title: 'Многостраничный сайт с нуля', text: 'Сайт компании под ключ: разделы услуг, портфолио, отдельные страницы — структура и дизайн под вас.', from: 34900 },
  { id: 'design', title: 'Дизайн сайта', text: 'Макет сайта в Figma под вашу компанию — для своей разработки или для меня.', from: 9900 },
  { id: 'logo', title: 'Логотип', text: 'Знак и начертание названия, варианты для сайта, соцсетей и печати.', from: 4900 },
  { id: 'seo', title: 'SEO-оптимизация', text: 'Структура, мета-теги, скорость загрузки, подключение к Яндексу и Google.', from: 7900 },
  { id: 'security', title: 'Веб-безопасность', text: 'Аудит и настройка: SSL, заголовки безопасности, защита форм, резервные копии.', from: 5900 },
  { id: 'tgbot', title: 'Telegram-бот для заявок', text: 'Заявки с сайта сразу приходят вам в Telegram: имя, телефон, услуга, страница.', from: 4900, auto: true,
    points: ['Мгновенные уведомления', 'Кнопки «Принять» и «Перезвонить»', 'Несколько получателей'] },
  { id: 'bots', title: 'Telegram-боты под задачу', text: 'Запись клиентов, каталог услуг, ответы на частые вопросы, уведомления и рассылки.', from: 14900, auto: true,
    points: ['Запись и напоминания', 'Каталог и прайс в боте', 'Рассылки клиентам'] },
  { id: 'admin', title: 'Админ-панель', text: 'Управление заявками, клиентами, услугами, ценами и контентом сайта без программиста.', from: 24900, auto: true,
    points: ['Заявки и статусы', 'Редактирование услуг и цен', 'Доступы для сотрудников'] },
];

export const SERVICES = RAW_SERVICES.map((s) => ({ ...s, priceLabel: formatPrice(s.from) }));
export type ServiceItem = (typeof SERVICES)[number];

// Цены
export const PRICES = {
  ready: {
    id: 'ready', name: 'Готовый сайт', from: 9900,
    features: ['Готовый дизайн', 'Адаптация под вашу нишу', 'Замена контента', 'Адаптация контактов', 'Мобильная версия'],
    button: 'Выбрать в каталоге', href: '#catalog',
  },
  custom: {
    id: 'custom', name: 'Сайт с нуля на заказ', from: 19900,
    features: ['Индивидуальная структура', 'Дизайн под компанию', 'Уникальный контент', 'Адаптация под задачу', 'Мобильная версия'],
    button: 'Обсудить проект', href: '#contact',
  },
};

export const PLANS = [PRICES.ready, PRICES.custom].map((p) => ({ ...p, priceLabel: formatPrice(p.from) }));
export type Plan = (typeof PLANS)[number];

export const CATEGORIES = ['Все', 'Строительство', 'Авто', 'Услуги', 'Красота', 'Недвижимость', 'Другое'];

// Шаблоны. Чтобы добавить новый — скопируйте объект и поменяйте поля.
// Когда шаблон станет живым сайтом: положите скриншоты в /public/sites/<id>/ и заполните image (+ cover) + demoUrl + domain.
// image — длинная склейка экранов сайта шириной 1280px (крутится на ноутбуке и показывается на странице шаблона),
// cover — один первый экран для карточек.
const RAW_SITES: RawSite[] = [
  // Живой сайт — https://napor-landing.vercel.app/
  {
    id: 'napor', title: 'НАПОР', niche: 'Сантехника', group: 'Услуги',
    description: 'Сайт аварийной сантехнической службы: 3D-план квартиры, прайс-диапазоны и вызов мастера за 40 минут.',
    tagline: 'Готовый сайт для сантехнической службы',
    price: PRICES.ready.from, image: '/sites/napor/full.jpg', imageH: 10016, cover: '/sites/napor/cover.jpg', coverH: 701, demoUrl: 'https://napor-landing.vercel.app/', domain: 'napor-landing.vercel.app',
    preview: {
      variant: 'split', bg: '#F3F3EF', ink: '#14171A', muted: '#4B5058', accent: '#3BB1DF', accentInk: '#FFFFFF',
      panel: '#14171A', panelInk: '#FFFFFF', surface: '#FFFFFF', line: '#DDDDD6',
      brand: 'НАПОР', phone: '+7 (843) 200-00-00', nav: ['Услуги', 'Цены', 'О мастере', 'Контакты'],
      eyebrow: 'Сантехнические работы', headline: 'Сантехник на дом в день обращения',
      sub: 'Устраним засор, заменим смеситель, установим бойлер. Гарантия на все виды работ.',
      cta: 'Вызвать мастера', cta2: 'Прайс-лист', points: ['Фиксированные цены', 'Гарантия', 'Без выходных'],
      panelLabel: 'Аварийная служба', badge: '24/7', badgeCaption: 'Выезд мастера в любое время',
      services: ['Устранение засоров', 'Установка сантехники', 'Замена труб', 'Подключение техники'],
      contactTitle: 'Вызовите мастера', contactSub: 'Перезвоним и согласуем время визита',
    },
  },
  // Живой сайт — https://briz-inky.vercel.app/
  {
    id: 'briz', title: 'Бриз', niche: 'Клининговые услуги', group: 'Услуги',
    description: 'Сайт клининговой компании: виды уборки с ценами, до/после, команда, отзывы и заявка в один клик.',
    tagline: 'Готовый сайт для клининговой компании',
    price: PRICES.ready.from, image: '/sites/briz/full.jpg', imageH: 6005, cover: '/sites/briz/cover.jpg', coverH: 704, demoUrl: 'https://briz-inky.vercel.app/', domain: 'briz-inky.vercel.app',
    preview: {
      variant: 'stack', bg: '#F5F4EE', ink: '#13302A', muted: '#4A5A55', accent: '#D9F26B', accentInk: '#13302A',
      heroBg: '#F5F4EE', heroInk: '#13302A', heroMuted: '#4A5A55', heroLine: '#DDDCD4', surface: '#FFFFFF', line: '#DDDCD4',
      brand: 'бриз', phone: '+7 (862) 555-01-23', nav: ['Услуги', 'Цены', 'Наши работы', 'Контакты'],
      eyebrow: 'Клининг в Сочи и Адлере', headline: 'Вы — на море. Мы — наводим чистоту',
      sub: 'Уборка квартир, домов и апартаментов. Своя химия и фиксированная цена до приезда.',
      cta: 'Заказать уборку', cta2: 'Цены', points: ['Поддерживающая', 'Генеральная', 'После ремонта'],
      services: ['Поддерживающая', 'Генеральная', 'После ремонта', 'Посуточные квартиры'],
      contactTitle: 'Закажите уборку', contactSub: 'Назовём цену по фото',
    },
  },
  // Живой сайт — https://beauty-chi-ochre.vercel.app/
  {
    id: 'lume', title: 'Lumé Studio', niche: 'Косметология и уход', group: 'Красота',
    description: 'Сайт студии эстетики и косметологии: направления ухода, мастера, подбор процедуры, абонементы и онлайн-запись в несколько шагов.',
    tagline: 'Готовый сайт для студии красоты и косметологии',
    price: PRICES.ready.from, image: '/sites/lume/full.jpg', imageH: 10630, cover: '/sites/lume/cover.jpg', coverH: 805, demoUrl: 'https://beauty-chi-ochre.vercel.app/', domain: 'beauty-chi-ochre.vercel.app',
    preview: {
      variant: 'split', bg: '#F5EFE7', ink: '#1A1614', muted: '#6A6258', accent: '#6E4A33', accentInk: '#FFFFFF',
      panel: '#1A1614', panelInk: '#F5EFE7', surface: '#FFFFFF', line: '#E3DBCF', serif: true, weight: 500,
      brand: 'Lumé Studio', phone: '+7 (495) 000-00-00', nav: ['Услуги', 'Косметика', 'Мастера', 'Абонементы'],
      eyebrow: 'Эстетика · косметология', headline: 'Красота, которую замечают',
      sub: 'Авторские уходы для лица и тела, архитектура бровей и колористика. Девять мастеров, один стандарт качества.',
      cta: 'Записаться', cta2: 'Прайс', points: ['Диагностика кожи', 'Подбор ухода', 'Абонементы'],
      panelLabel: 'Онлайн-запись', badge: '24/7', badgeCaption: 'Запись на ближайшее свободное время',
      services: ['Лицо', 'Брови и ресницы', 'Волосы', 'Ногти'],
      contactTitle: 'Запишитесь онлайн', contactSub: 'Процедура, мастер, дата и время — за 30 секунд',
    },
  },
  {
    id: 'autopro', title: 'AutoPro', niche: 'Автосервис', group: 'Авто',
    description: 'Сайт автосервиса с услугами, записью на ремонт и контактами.',
    tagline: 'Готовый сайт для автосервиса',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'autopro-service.ru',
    preview: {
      variant: 'stack', bg: '#F2F2EF', ink: '#121212', muted: '#55565A', accent: '#E8452C', accentInk: '#FFFFFF',
      heroBg: '#121212', heroInk: '#F2F2F2', heroMuted: '#A5A5A8', heroLine: '#2E2E30', surface: '#FFFFFF', line: '#DEDED9',
      upper: true, weight: 800,
      brand: 'AUTOPRO', phone: '+7 (900) 000-00-00', nav: ['Услуги', 'Цены', 'Запись', 'Контакты'],
      eyebrow: 'Автосервис · Запись онлайн', headline: 'Ремонт и обслуживание автомобилей',
      sub: 'Диагностика, ТО и ремонт любой сложности. Согласуем стоимость до начала работ.',
      cta: 'Записаться', cta2: 'Услуги и цены', points: ['Компьютерная диагностика', 'Ремонт двигателя', 'ТО по регламенту'],
      services: ['Диагностика', 'Замена масла', 'Ходовая часть', 'Шиномонтаж'],
      contactTitle: 'Запишитесь на сервис', contactSub: 'Подберём удобное время',
    },
  },
  {
    id: 'domstroy', title: 'ДомСтрой', niche: 'Строительство', group: 'Строительство',
    description: 'Сайт строительной компании: проекты домов, этапы работ, заявка на расчёт.',
    tagline: 'Готовый сайт для строительной компании',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'domstroy.ru',
    preview: {
      variant: 'split', bg: '#F5F1EA', ink: '#1F1A14', muted: '#5E554A', accent: '#B8512A', accentInk: '#FFFFFF',
      panel: '#2A241D', panelInk: '#F5F1EA', surface: '#FFFFFF', line: '#E3DBCF',
      brand: 'ДомСтрой', phone: '+7 (900) 000-00-00', nav: ['Проекты', 'Технологии', 'Этапы', 'Контакты'],
      eyebrow: 'Строительство домов', headline: 'Строим частные дома под ключ',
      sub: 'От проекта и фундамента до кровли и отделки. Смета фиксируется в договоре.',
      cta: 'Рассчитать стоимость', cta2: 'Проекты домов', points: ['Свой проект', 'Смета в договоре', 'Контроль этапов'],
      panelLabel: 'Каталог проектов', badge: 'Дом', badgeCaption: 'Газобетон, кирпич, каркас',
      services: ['Проектирование', 'Фундамент', 'Коробка и кровля', 'Отделка'],
      contactTitle: 'Рассчитаем ваш дом', contactSub: 'Пришлём смету по вашему проекту',
    },
  },
  {
    id: 'detail', title: 'Detail Lab', niche: 'Детейлинг', group: 'Авто',
    description: 'Тёмный премиальный сайт для детейлинг-студии и защиты кузова.',
    tagline: 'Готовый сайт для детейлинг-студии',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'detail-lab.ru',
    preview: {
      variant: 'split', bg: '#0F0F10', ink: '#F1F1F1', muted: '#A3A3A8', accent: '#F2B33D', accentInk: '#111111',
      panel: '#1C1C1F', panelInk: '#F1F1F1', surface: '#18181A', line: '#2A2A2D', upper: true, weight: 700,
      brand: 'DETAIL LAB', phone: '+7 (900) 000-00-00', nav: ['Услуги', 'Работы', 'Цены', 'Контакты'],
      eyebrow: 'Детейлинг-студия', headline: 'Защита и уход за вашим автомобилем',
      sub: 'Полировка, керамика, плёнка PPF и химчистка салона в одной студии.',
      cta: 'Записаться', cta2: 'Наши работы', points: ['Полировка', 'Керамика', 'Химчистка'],
      panelLabel: 'Защитные покрытия', badge: 'PPF', badgeCaption: 'Полиуретановая плёнка и керамика',
      services: ['Полировка кузова', 'Керамика', 'Плёнка PPF', 'Химчистка салона'],
      contactTitle: 'Запишитесь в студию', contactSub: 'Осмотрим авто и подберём уход',
    },
  },
  {
    id: 'profremont', title: 'ПрофРемонт', niche: 'Ремонт квартир', group: 'Строительство',
    description: 'Сайт бригады по ремонту квартир: виды ремонта, этапы, расчёт сметы.',
    tagline: 'Готовый сайт для ремонта квартир',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'profremont.ru',
    preview: {
      variant: 'stack', bg: '#FAF6F0', ink: '#231C14', muted: '#5F564B', accent: '#2F5D50', accentInk: '#FFFFFF',
      heroBg: '#EFE6D8', heroInk: '#231C14', heroMuted: '#5F564B', heroLine: '#D9CCB8', surface: '#FFFFFF', line: '#E6DDCF',
      serif: true, weight: 500,
      brand: 'ПрофРемонт', phone: '+7 (900) 000-00-00', nav: ['Ремонт', 'Портфолио', 'Смета', 'Контакты'],
      eyebrow: 'Ремонт квартир под ключ', headline: 'Ремонт, в котором хочется жить',
      sub: 'Косметический, капитальный и дизайнерский ремонт с поэтапной оплатой.',
      cta: 'Рассчитать смету', cta2: 'Портфолио', points: ['Косметический', 'Капитальный', 'Дизайнерский'],
      services: ['Демонтаж', 'Черновые работы', 'Чистовая отделка', 'Сантехника и электрика'],
      contactTitle: 'Рассчитаем ремонт', contactSub: 'Замер и смета по вашей квартире',
    },
  },
  {
    id: 'volt', title: 'Вольт', niche: 'Электрика', group: 'Услуги',
    description: 'Сайт электрика с услугами, ценами и кнопкой вызова.',
    tagline: 'Готовый сайт для электромонтажных работ',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'volt-master.ru',
    preview: {
      variant: 'split', bg: '#FAFAF7', ink: '#111111', muted: '#55554F', accent: '#111111', accentInk: '#FFFFFF',
      panel: '#FFC21A', panelInk: '#111111', surface: '#FFFFFF', line: '#E5E5DE', weight: 800,
      brand: 'Вольт', phone: '+7 (900) 000-00-00', nav: ['Услуги', 'Цены', 'Работы', 'Контакты'],
      eyebrow: 'Электромонтаж', headline: 'Электрик для квартиры и дома',
      sub: 'Замена проводки, установка розеток и щитов, подключение освещения.',
      cta: 'Вызвать электрика', cta2: 'Цены', points: ['Проводка', 'Щиты', 'Освещение'],
      panelLabel: 'Электромонтаж', badge: '220V', badgeCaption: 'Работы в квартирах и частных домах',
      services: ['Замена проводки', 'Розетки и выключатели', 'Электрощиты', 'Освещение'],
      contactTitle: 'Вызовите электрика', contactSub: 'Уточним задачу и назовём цену',
    },
  },
  {
    id: 'klimat', title: 'Климат+', niche: 'Кондиционеры', group: 'Услуги',
    description: 'Сайт по продаже, установке и обслуживанию кондиционеров.',
    tagline: 'Готовый сайт для установки кондиционеров',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'klimat-plus.ru',
    preview: {
      variant: 'split', bg: '#EEF4FA', ink: '#0B2239', muted: '#48607A', accent: '#0E7AC4', accentInk: '#FFFFFF',
      panel: '#D3E5F4', panelInk: '#0B2239', surface: '#FFFFFF', line: '#D5E2EE',
      brand: 'Климат+', phone: '+7 (900) 000-00-00', nav: ['Каталог', 'Установка', 'Сервис', 'Контакты'],
      eyebrow: 'Кондиционеры и сплит-системы', headline: 'Кондиционеры с установкой',
      sub: 'Подберём модель под площадь, установим и возьмём на обслуживание.',
      cta: 'Подобрать кондиционер', cta2: 'Каталог', points: ['Подбор', 'Монтаж', 'Сервис'],
      panelLabel: 'Установка и сервис', badge: '+22°', badgeCaption: 'Комфортная температура круглый год',
      services: ['Сплит-системы', 'Монтаж', 'Чистка и заправка', 'Ремонт'],
      contactTitle: 'Подберём кондиционер', contactSub: 'Расскажите о помещении',
    },
  },
  {
    id: 'okna', title: 'ОкнаМастер', niche: 'Окна', group: 'Строительство',
    description: 'Сайт компании по производству и установке окон.',
    tagline: 'Готовый сайт для оконной компании',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'oknamaster.ru',
    preview: {
      variant: 'stack', bg: '#F3F6F9', ink: '#0B1B28', muted: '#4B5B69', accent: '#4FA3E0', accentInk: '#0B1B28',
      heroBg: '#14283A', heroInk: '#FFFFFF', heroMuted: '#A9BCCD', heroLine: '#2A4258', surface: '#FFFFFF', line: '#DCE3EA',
      brand: 'ОкнаМастер', phone: '+7 (900) 000-00-00', nav: ['Окна', 'Балконы', 'Замер', 'Контакты'],
      eyebrow: 'Окна и остекление', headline: 'Пластиковые окна на заказ',
      sub: 'Изготовим по вашим размерам, установим и отрегулируем. Бесплатный замер.',
      cta: 'Вызвать замерщика', cta2: 'Профили', points: ['Окна ПВХ', 'Остекление балконов', 'Регулировка'],
      services: ['Окна ПВХ', 'Балконы', 'Москитные сетки', 'Ремонт окон'],
      contactTitle: 'Запишитесь на замер', contactSub: 'Приедем в удобное время',
    },
  },
  {
    id: 'drevo', title: 'Древо', niche: 'Мебель на заказ', group: 'Другое',
    description: 'Сайт мебельной мастерской: кухни, шкафы, материалы и замер.',
    tagline: 'Готовый сайт для мебели на заказ',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'drevo-mebel.ru',
    preview: {
      variant: 'split', bg: '#F4EFE8', ink: '#2A2118', muted: '#62574B', accent: '#7A4A2A', accentInk: '#FFFFFF',
      panel: '#7A4A2A', panelInk: '#F4EFE8', surface: '#FBF8F4', line: '#E3D9CC', serif: true, weight: 500,
      brand: 'Древо', phone: '+7 (900) 000-00-00', nav: ['Кухни', 'Шкафы', 'Материалы', 'Контакты'],
      eyebrow: 'Мебельная мастерская', headline: 'Кухни и шкафы по вашим размерам',
      sub: 'Проектируем, изготавливаем и собираем мебель для квартиры и дома.',
      cta: 'Заказать замер', cta2: 'Работы', points: ['Свой цех', 'Натуральный шпон', 'Сборка'],
      panelLabel: 'Материалы', badge: 'Дуб', badgeCaption: 'Массив, шпон, МДФ',
      services: ['Кухни', 'Шкафы-купе', 'Гардеробные', 'Детская мебель'],
      contactTitle: 'Закажите замер', contactSub: 'Приедем и обсудим проект',
    },
  },
  {
    id: 'kvadrat', title: 'Квадрат', niche: 'Недвижимость', group: 'Недвижимость',
    description: 'Сайт агентства недвижимости с подбором объектов и консультацией.',
    tagline: 'Готовый сайт для агентства недвижимости',
    price: PRICES.ready.from, image: '', demoUrl: '', domain: 'kvadrat-estate.ru',
    preview: {
      variant: 'stack', bg: '#F5F2EB', ink: '#0F1A17', muted: '#56605B', accent: '#B89A5E', accentInk: '#0F1A17',
      heroBg: '#0F1A17', heroInk: '#EDE7DA', heroMuted: '#A7ABA3', heroLine: '#26332F', surface: '#FFFFFF', line: '#E4DFD4',
      serif: true, weight: 500,
      brand: 'Квадрат', phone: '+7 (900) 000-00-00', nav: ['Купить', 'Продать', 'Ипотека', 'Контакты'],
      eyebrow: 'Агентство недвижимости', headline: 'Подберём квартиру для жизни',
      sub: 'Новостройки и вторичный рынок. Проверка документов и сопровождение сделки.',
      cta: 'Подобрать объект', cta2: 'Каталог', points: ['Новостройки', 'Вторичный рынок', 'Сопровождение сделки'],
      services: ['Покупка', 'Продажа', 'Ипотека', 'Юридическая проверка'],
      contactTitle: 'Получите подборку', contactSub: 'Расскажите, что ищете',
    },
  },
];

const MOCK_H = MOCK_PREVIEWS as Record<string, number>;

export const SITES: Site[] = RAW_SITES.map((s) => ({
  ...s,
  // для заглушек — заранее отрендеренная картинка макета (npm run previews)
  ...(!s.image && MOCK_H[s.id] ? { cover: `/sites/mock/${s.id}.webp`, coverH: MOCK_H[s.id] } : {}),
  priceLabel: formatPrice(s.price),
  url: '/templates/' + s.id,
  // живой сайт открывается напрямую (он запрещает встраивание в iframe), иначе — встроенное демо
  demo: s.demoUrl || '/templates/' + s.id + '/demo',
  live: !!s.demoUrl,
}));

/** Что крутится на экранах 3D-ноутбуков: сначала живые сайты (Бриз, Lumé), Напор не показываем */
export const SCREEN_SITES: Site[] = SITES.filter((s) => s.id !== 'napor').sort((a, b) => Number(b.live) - Number(a.live));

export const NICHES = Array.from(new Set(SITES.map((s) => s.niche))).concat(['Другая ниша']);

export const findSite = (id: string) => SITES.find((s) => s.id === id);
