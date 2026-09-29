import { SITES } from '@/lib/data';

export default function Marquee() {
  const words = SITES.map((s) => s.niche).concat(['Лендинги с нуля', 'Логотипы', 'SEO', 'Веб-безопасность', 'Админ-панели', 'Telegram-боты']);
  const run = words.concat(words);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {run.map((w, i) => <span key={i}>{w}<i>✦</i></span>)}
      </div>
    </div>
  );
}
