import type { CSSProperties, ReactNode } from 'react';

/**
 * Декор-кит студии: светящиеся оранжевые искры, стрелки, орбиты, тех-скобки, разделители и
 * «проводки» между блоками. Всё — inline SVG + CSS (свечение через drop-shadow), без картинок.
 * Чисто декоративно: aria-hidden, без событий мыши. Анимации выключаются при «уменьшить движение».
 */
type P = { className?: string; style?: CSSProperties };
const cx = (...a: (string | false | undefined)[]) => a.filter(Boolean).join(' ');

/** Четырёхлучевая искра (как в ките «Звёздочки»). twinkle — мерцает. */
export function Sparkle({ className, style, size = 22, twinkle = true, white = false }: P & { size?: number; twinkle?: boolean; white?: boolean }) {
  return (
    <svg className={cx('gk-spark', twinkle && 'tw', white && 'wh', className)} style={{ width: size, height: size, ...style }} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <path d="M20 1 C 21.2 13.5, 26.5 18.8, 39 20 C 26.5 21.2, 21.2 26.5, 20 39 C 18.8 26.5, 13.5 21.2, 1 20 C 13.5 18.8, 18.8 13.5, 20 1 Z" />
    </svg>
  );
}

/** Россыпь искр в абсолютных координатах (в процентах контейнера) */
export function Sparkles({ items, className }: { items: [number, number, number, boolean?][]; className?: string }) {
  return (
    <div className={cx('gk-sparkles', className)} aria-hidden="true">
      {items.map(([x, y, s, w], i) => <Sparkle key={i} size={s} white={!!w} style={{ left: x + '%', top: y + '%', animationDelay: (i * 0.37) % 2.4 + 's' }} />)}
    </div>
  );
}

/** Светящаяся рукописная стрелка; рисуется линией при появлении */
const ARROWS: Record<string, { vb: string; d: string; head: string }> = {
  curve: { vb: '0 0 160 90', d: 'M6 74 C 38 74, 60 14, 150 16', head: 'M136 6 L151 16 L137 27' },
  loop: { vb: '0 0 170 100', d: 'M6 80 C 30 30, 70 14, 82 46 C 90 70, 58 74, 64 48 C 72 20, 120 18, 160 34', head: 'M146 22 L161 34 L145 43' },
  long: { vb: '0 0 220 40', d: 'M4 26 C 60 10, 140 30, 214 16', head: 'M200 6 L215 16 L201 27' },
  down: { vb: '0 0 70 130', d: 'M20 4 C 60 40, 6 76, 38 122', head: 'M24 110 L38 123 L50 108' },
  swoosh: { vb: '0 0 200 70', d: 'M6 60 Q 90 66, 190 12', head: 'M174 6 L191 12 L182 28' },
};
export function GlowArrow({ kind = 'curve', className, style }: P & { kind?: keyof typeof ARROWS }) {
  const a = ARROWS[kind];
  return (
    <svg className={cx('gk-arrow', className)} style={style} viewBox={a.vb} aria-hidden="true" focusable="false">
      <path d={a.d} pathLength={1} /><path d={a.head} pathLength={1} className="hd" />
    </svg>
  );
}

/** Наклонная светящаяся орбита (эллипс), как в «Эффектах» */
export function Orbit({ className, style, spin = false }: P & { spin?: boolean }) {
  return (
    <svg className={cx('gk-orbit', spin && 'spin', className)} style={style} viewBox="0 0 300 100" aria-hidden="true" focusable="false">
      <ellipse cx="150" cy="50" rx="146" ry="40" />
      <ellipse cx="150" cy="50" rx="146" ry="40" className="hot" pathLength={1} />
    </svg>
  );
}

/** Тех-скобки по углам контейнера (родитель — position: relative) */
export function Brackets({ className, style }: P) {
  return (
    <span className={cx('gk-brackets', className)} style={style} aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

/** Разделитель: линия, в центре — искра или ромб */
export function Divider({ className, mark = 'spark' }: { className?: string; mark?: 'spark' | 'diamond' | 'arrows' }) {
  return (
    <div className={cx('gk-divider', className)} aria-hidden="true">
      <span className="ln" />
      {mark === 'spark' && <Sparkle size={18} white />}
      {mark === 'diamond' && <i className="dm" />}
      {mark === 'arrows' && <b className="ar">»</b>}
      <span className="ln r" />
    </div>
  );
}

/** «Проводок» между блоками: линия с узлами, по ней бежит импульс */
export function Circuit({ className, style, variant = 1 }: P & { variant?: 1 | 2 | 3 }) {
  const d = variant === 1 ? 'M4 10 H 120 Q 132 10 132 22 V 58 Q 132 70 144 70 H 296'
    : variant === 2 ? 'M4 70 H 90 Q 102 70 102 58 V 22 Q 102 10 114 10 H 296'
      : 'M4 40 H 296';
  return (
    <svg className={cx('gk-circuit', className)} style={style} viewBox="0 0 300 80" aria-hidden="true" focusable="false">
      <path d={d} className="base" />
      <path d={d} className="pulse" pathLength={1} />
      <circle cx="4" cy={variant === 2 ? 70 : variant === 1 ? 10 : 40} r="3.5" />
      <rect x="290" y={variant === 3 ? 34 : variant === 1 ? 64 : 4} width="12" height="12" transform={`rotate(45 296 ${variant === 3 ? 40 : variant === 1 ? 70 : 10})`} />
    </svg>
  );
}

/** Мягкое оранжевое свечение-пятно (фон за предметами) */
export function GlowBlob({ className, style }: P) {
  return <span className={cx('gk-blob', className)} style={style} aria-hidden="true" />;
}

/** Фраза в светящемся рукописном овале («ВАЖНО», «Быстро. Стильно. Надёжно.») */
export function Ring({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx('gk-ring', className)}>
      {children}
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M20 8 C 70 -2, 170 2, 192 22 C 206 40, 150 58, 92 57 C 30 56, 2 44, 8 28 C 12 16, 44 7, 120 6" pathLength={1} />
      </svg>
    </span>
  );
}
