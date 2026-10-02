import type { CSSProperties, ReactNode } from 'react';

/**
 * Рисованные от руки пометки: подчёркивания, обводки, стрелки, звёздочки.
 * Прорисовываются при прокрутке (CSS scroll-driven animations); где это не поддерживается —
 * просто видны сразу. Чисто декоративные: aria-hidden.
 */
const P: Record<string, { vb: string; d: string[] }> = {
  underline: { vb: '0 0 200 22', d: ['M3 13 C 40 6, 82 4, 122 8 S 186 15, 197 8', 'M14 18 C 62 13, 122 12, 186 14'] },
  circle: { vb: '0 0 220 90', d: ['M34 16 C 76 1, 172 4, 206 30 C 232 56, 168 86, 98 85 C 38 84, 3 62, 12 37 C 19 20, 56 8, 128 7'] },
  arrow: { vb: '0 0 120 80', d: ['M6 8 C 26 58, 66 74, 108 54', 'M93 43 L109 54 L95 67'] },
  arrowDown: { vb: '0 0 70 120', d: ['M30 4 C 8 40, 52 64, 34 112', 'M22 98 L34 113 L46 99'] },
  loop: { vb: '0 0 150 90', d: ['M6 74 C 28 20, 62 8, 72 40 C 79 64, 50 68, 55 44 C 62 18, 104 16, 138 30', 'M124 18 L139 30 L124 39'] },
  star: { vb: '0 0 40 40', d: ['M20 3 L24.5 15 L37 16 L27.5 24 L31 37 L20 29.5 L9 37 L12.5 24 L3 16 L15.5 15 Z'] },
  sparkle: { vb: '0 0 40 40', d: ['M20 2 C 21 14, 26 19, 38 20 C 26 21, 21 26, 20 38 C 19 26, 14 21, 2 20 C 14 19, 19 14, 20 2 Z'] },
  squiggle: { vb: '0 0 120 20', d: ['M2 10 Q 12 1, 22 10 T 42 10 T 62 10 T 82 10 T 102 10 T 118 10'] },
  check: { vb: '0 0 44 40', d: ['M4 22 C 9 26, 13 31, 16 35 C 22 22, 30 12, 41 4'] },
  cross: { vb: '0 0 120 60', d: ['M6 8 C 40 24, 80 40, 114 54', 'M110 6 C 76 22, 42 38, 8 52'] },
  zigzag: { vb: '0 0 200 30', d: ['M4 22 L30 7 L26 26 L60 7 L56 26 L92 7 L88 26 L124 7 L120 26 L156 7 L152 26 L192 9'] },
  heart: { vb: '0 0 44 40', d: ['M22 36 C 6 25, 2 16, 6 9 C 10 3, 19 4, 22 12 C 25 4, 34 3, 38 9 C 42 16, 38 25, 22 36 Z'] },
  burst: { vb: '0 0 60 60', d: ['M30 4 L30 16', 'M30 44 L30 56', 'M4 30 L16 30', 'M44 30 L56 30', 'M12 12 L20 20', 'M40 40 L48 48', 'M48 12 L40 20', 'M20 40 L12 48'] },
  bracket: { vb: '0 0 30 120', d: ['M24 4 C 10 6, 14 40, 8 60 C 14 80, 10 114, 24 116'] },
};

export type DoodleKind = keyof typeof P;

export function Doodle({ kind, className = '', style, w, color, delay }: { kind: DoodleKind; className?: string; style?: CSSProperties; w?: number | string; color?: string; delay?: number }) {
  const p = P[kind];
  return (
    <svg className={'doodle dd-' + kind + (className ? ' ' + className : '')} viewBox={p.vb} aria-hidden="true" focusable="false"
      style={{ width: w, color, ['--d' as string]: delay ? delay + 's' : undefined, ...style }}>
      {p.d.map((d, i) => <path key={i} d={d} pathLength={1} style={i ? { animationDelay: `calc(var(--d, 0s) + ${i * 0.15}s)` } : undefined} />)}
    </svg>
  );
}

/** Рукописная пометка с необязательной стрелкой */
export function Note({ children, className = '', style, rot = -4, arrow, arrowStyle }: { children: ReactNode; className?: string; style?: CSSProperties; rot?: number; arrow?: DoodleKind; arrowStyle?: CSSProperties }) {
  return (
    <span className={'note ' + className} style={{ ['--r' as string]: rot + 'deg', ...style }} aria-hidden="true">
      <span className="note-t">{children}</span>
      {arrow && <Doodle kind={arrow} className="note-arrow" style={arrowStyle} />}
    </span>
  );
}

/** Слово с рисованной обводкой/подчёркиванием (текст остаётся обычным текстом) */
export function Mark({ children, kind = 'underline', color }: { children: ReactNode; kind?: 'underline' | 'circle' | 'zigzag' | 'cross'; color?: string }) {
  return <span className={'mark mark-' + kind}>{children}<Doodle kind={kind} color={color} /></span>;
}
