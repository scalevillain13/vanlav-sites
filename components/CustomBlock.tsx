import { Note } from './Doodle';

export default function CustomBlock() {
  return (
    <section id="custom" className="section">
      <div className="custom-box">
        <div aria-hidden="true" className="q">?</div>
        <div>
          <span className="label">Индивидуальная разработка</span>
          <h2>Не нашли подходящий вариант?</h2>
          <Note className="cb-note hide-m" rot={-6}>сделаю под ключ</Note>
          <p>Разработаю сайт полностью с нуля под вашу нишу и задачу — дизайн, структура и тексты под ваш бизнес.</p>
        </div>
        <a href="#contact" className="custom-btn">Обсудить проект <i>→</i></a>
      </div>
    </section>
  );
}
