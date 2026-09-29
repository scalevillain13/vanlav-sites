import { SERVICES, SITES } from '@/lib/data';
import Devices3D from './Devices3D';

const ICONS: Record<string, string> = { tgbot: '✉', bots: '⚙', admin: '▦' };

export default function Automation() {
  const list = SERVICES.filter((s) => s.auto);
  const nodes = [
    { label: 'Заявка на сайте', icon: '1', acc: false, line: true, flex: '1 1 260px', delay: 0 },
    { label: 'Telegram-бот', icon: '2', acc: true, line: true, flex: '1 1 240px', delay: 1.2 },
    { label: 'Админ-панель', icon: '3', acc: false, line: false, flex: '0 0 auto', delay: 0 },
  ];
  return (
    <section id="automation" className="section">
      <div className="sec-head">
        <div>
          <span className="label">Автоматизация</span>
          <h2 className="h2">Админ-панели и Telegram-боты</h2>
        </div>
        <p className="lead">Сайт — только начало. Настрою, чтобы заявки сразу приходили вам в Telegram, а заявками, услугами и контентом можно было управлять в удобной админ-панели.</p>
      </div>

      <div className="auto-box">
        <div className="grid" aria-hidden="true" />
        <div className="auto-stage"><Devices3D mode="automation" sites={SITES} startId="napor" /></div>
        <div className="flow">
          {nodes.map((n) => (
            <div key={n.label} className="flow-node" style={{ flex: n.flex }}>
              <span className="pill"><i className={n.acc ? 'acc' : ''}>{n.icon}</i><span>{n.label}</span></span>
              {n.line && <div className="flow-line"><span style={{ animationDelay: n.delay + 's' }} /></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="auto-cards">
        {list.map((c) => (
          <div key={c.id} className="card auto-card">
            <div className="top"><i>{ICONS[c.id] || '✦'}</i><b>{c.priceLabel}</b></div>
            <b>{c.title}</b>
            <span>{c.text}</span>
            <div className="pts">{(c.points || []).map((p) => <span key={p}><i>✓</i>{p}</span>)}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <a href="#contact" className="btn btn-accent btn-icon">Обсудить бота или админку <span className="ic">→</span></a>
      </div>
    </section>
  );
}
