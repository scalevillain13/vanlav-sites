'use client';
import { useSeen } from './useSeen';

const STEPS = [
  { num: '01', title: 'Выбираете сайт', text: 'Смотрите каталог и демо, выбираете шаблон под свою нишу.' },
  { num: '02', title: 'Я адаптирую его', text: 'Вы присылаете материалы о компании, я заменяю контент и настраиваю детали.' },
  { num: '03', title: 'Запускаем', text: 'Согласовываем результат и публикуем сайт.' },
];
const TAGS = ['Название', 'Логотип', 'Фотографии', 'Услуги', 'Цены', 'Контакты', 'Цвета'];

export default function Process() {
  const [ref, seen] = useSeen<HTMLElement>(0.3);
  return (
    <section id="process" ref={ref} className={'section' + (seen ? ' seen' : '')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <span className="label">Процесс</span>
        <h2 className="h2">Как это работает</h2>
      </div>
      <div className="steps-wrap">
        <div className="steps-line" /><div className="steps-fill" />
        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={s.num} className="step">
              <span className="num" style={{ transitionDelay: 0.3 + i * 0.6 + 's' }}>{s.num}</span>
              <b>{s.title}</b>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card adapt-box">
        <p>Название компании, логотип, фотографии, услуги, цены, контакты и другие элементы будут адаптированы под ваш бизнес.</p>
        <div className="tags">{TAGS.map((t) => <span key={t} className="tag"><i>↺</i>{t}</span>)}</div>
      </div>
    </section>
  );
}
