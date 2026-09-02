// Batik-inspired decorative motifs (truntum-style star scatter + isen dot grid).
// Used as subtle section ornament to give the brand Indonesian character.

type BatikProps = {
  id: string
  className?: string
  color?: string
  opacity?: number
  scale?: number // px size of one repeat tile
}

/** Full-bleed tiled batik backdrop. Parent must be `relative`; this sits behind content. */
export function Batik({ id, className = '', color = 'currentColor', opacity = 0.07, scale = 46 }: BatikProps) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ color }}
    >
      <defs>
        <pattern id={id} width={scale} height={scale} patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity={opacity}>
            {/* truntum four-point star at tile centre */}
            <path
              d={starPath(scale / 2, scale / 2, scale * 0.3, scale * 0.1)}
              fill="currentColor"
              stroke="none"
            />
            {/* isen dots at the four corners (tile to a grid) */}
            <circle cx="0" cy="0" r={scale * 0.045} fill="currentColor" stroke="none" />
            <circle cx={scale} cy="0" r={scale * 0.045} fill="currentColor" stroke="none" />
            <circle cx="0" cy={scale} r={scale * 0.045} fill="currentColor" stroke="none" />
            <circle cx={scale} cy={scale} r={scale * 0.045} fill="currentColor" stroke="none" />
            {/* faint connecting diagonals (kawung hint) */}
            <path d={`M0 0 L${scale} ${scale} M${scale} 0 L0 ${scale}`} opacity={0.4} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Slim horizontal batik band — for dividers, footer tops, section separators. */
export function BatikStrip({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <div className={`h-6 w-full overflow-hidden ${className}`} style={{ color }} aria-hidden>
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="batik-strip" width="46" height="24" patternUnits="userSpaceOnUse">
            <g fill="currentColor">
              <path d={starPath(23, 12, 8, 2.6)} />
              <circle cx="0" cy="12" r="1.6" />
              <circle cx="46" cy="12" r="1.6" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-strip)" />
      </svg>
    </div>
  )
}

// Four-point "truntum" star (two crossed pointed lobes).
function starPath(cx: number, cy: number, outer: number, inner: number) {
  const p = (a: number, r: number) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`
  const pts: string[] = []
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i - Math.PI / 2
    pts.push(p(a, i % 2 === 0 ? outer : inner))
  }
  return `M${pts[0]} L${pts.slice(1).join(' L')} Z`
}
