// Authentic Central-Java batik motifs, hand-built as seamless SVG patterns:
//  - Kawung: interlocking ellipse "flowers" (subtle section backdrops)
//  - Parang: flowing diagonal blades + mlinjon diamonds (dynamic strips/panels)

import type { ReactNode } from 'react'

function star(cx: number, cy: number, o: number, i: number) {
  const p: string[] = []
  for (let k = 0; k < 8; k++) {
    const a = (Math.PI / 4) * k - Math.PI / 2
    const r = k % 2 === 0 ? o : i
    p.push(`${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`)
  }
  return `M${p[0]} L${p.slice(1).join(' L')} Z`
}

function kawungTile(S: number, color: string, accent: string, op: number, aop: number): ReactNode {
  const o = S * 0.205
  const a = S * 0.115
  const b = S * 0.235
  const flower = (cx: number, cy: number) => (
    <g key={`${cx}-${cy}`}>
      <ellipse cx={cx} cy={cy - o} rx={a} ry={b} />
      <ellipse cx={cx} cy={cy + o} rx={a} ry={b} />
      <ellipse cx={cx - o} cy={cy} rx={b} ry={a} />
      <ellipse cx={cx + o} cy={cy} rx={b} ry={a} />
    </g>
  )
  return (
    <>
      <g fill={color} fillOpacity={op}>
        {flower(S / 2, S / 2)}
        {flower(0, 0)}
        {flower(S, 0)}
        {flower(0, S)}
        {flower(S, S)}
      </g>
      <g fill={accent} fillOpacity={aop}>
        {[[S / 2, 0], [0, S / 2], [S, S / 2], [S / 2, S]].map((q, i) => (
          <path key={i} d={star(q[0], q[1], S * 0.1, S * 0.04)} />
        ))}
        {[[S / 2, S / 2], [0, 0], [S, 0], [0, S], [S, S]].map((q, i) => (
          <circle key={`c${i}`} cx={q[0]} cy={q[1]} r={S * 0.05} />
        ))}
      </g>
    </>
  )
}

function parangTile(S: number, color: string, accent: string, op: number, aop: number): ReactNode {
  const cx = S * 0.5
  const A = S * 0.17
  const sw = S * 0.36
  const d = `M${cx} 0 C${cx + A} ${S * 0.28} ${cx + A} ${S * 0.22} ${cx} ${S * 0.5} C${cx - A} ${S * 0.78} ${cx - A} ${S * 0.72} ${cx} ${S}`
  return (
    <>
      <path d={d} fill="none" stroke={color} strokeOpacity={op} strokeWidth={sw} strokeLinecap="round" />
      <g fill={accent} fillOpacity={aop}>
        <path d={`M0 ${S * 0.5 - 3.4} L3.4 ${S * 0.5} L0 ${S * 0.5 + 3.4} L-3.4 ${S * 0.5} Z`} />
        <path d={`M0 -3.4 L3.4 0 L0 3.4 L-3.4 0 Z`} />
      </g>
    </>
  )
}

type PatternProps = {
  id: string
  className?: string
  color?: string
  accent?: string
  opacity?: number
  accentOpacity?: number
  scale?: number
}

/** Kawung backdrop. Parent must be `relative`. */
export function Kawung({
  id,
  className = '',
  color = '#c8322c',
  accent,
  opacity = 0.18,
  accentOpacity = 0.45,
  scale = 54,
}: PatternProps) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width={scale} height={scale} patternUnits="userSpaceOnUse">
          {kawungTile(scale, color, accent ?? color, opacity, accentOpacity)}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Parang backdrop (diagonal). Parent must be `relative`. */
export function Parang({
  id,
  className = '',
  color = '#c8322c',
  accent,
  opacity = 0.5,
  accentOpacity = 0.6,
  scale = 30,
}: PatternProps) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width={scale} height={scale} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          {parangTile(scale, color, accent ?? color, opacity, accentOpacity)}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Slim horizontal parang band — footer tops, dividers. */
export function BatikStrip({
  id = 'batik-strip',
  color = '#ffffff',
  accent = '#ffffff',
  opacity = 0.85,
  accentOpacity = 0.95,
  className = '',
}: Omit<PatternProps, 'id'> & { id?: string; className?: string }) {
  return (
    <div className={`h-9 w-full overflow-hidden ${className}`} aria-hidden>
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            {parangTile(26, color, accent, opacity, accentOpacity)}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

/** Bold vertical parang side column. */
export function BatikPanel({
  id,
  className = '',
  color = '#ffffff',
  accent = '#ffffff',
  opacity = 0.85,
  accentOpacity = 0.95,
}: PatternProps) {
  return (
    <div className={`pointer-events-none absolute inset-y-0 overflow-hidden ${className}`} aria-hidden>
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            {parangTile(30, color, accent, opacity, accentOpacity)}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
