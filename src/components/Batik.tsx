// Batik-inspired motifs: kawung (interlocking circles) + truntum (four-point stars)
// and isen dots — an authentic Central-Java lattice used as brand ornament.

type BatikProps = {
  id: string
  className?: string
  color?: string
  opacity?: number
  scale?: number // px size of one repeat tile
  strokeWidth?: number
}

/** Four-point "truntum" star. */
function starPath(cx: number, cy: number, outer: number, inner: number) {
  const p = (a: number, r: number) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`
  const pts: string[] = []
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i - Math.PI / 2
    pts.push(p(a, i % 2 === 0 ? outer : inner))
  }
  return `M${pts[0]} L${pts.slice(1).join(' L')} Z`
}

/** One seamless kawung + truntum tile (as pattern children). */
function KawungTile(S: number, sw: number) {
  const R = S * 0.5 // circle radius; centres on a grid of spacing S → interlocking rings
  const c = (cx: number, cy: number) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={R} />
  return (
    <>
      {/* interlocking rings (kawung) — corners + centre tile seamlessly */}
      <g fill="none" stroke="currentColor" strokeWidth={sw}>
        {c(0, 0)}
        {c(S, 0)}
        {c(0, S)}
        {c(S, S)}
        {c(S / 2, S / 2)}
      </g>
      {/* truntum stars where four petals meet */}
      <g fill="currentColor" stroke="none">
        <path d={starPath(S / 2, S / 2, S * 0.12, S * 0.05)} />
        <path d={starPath(0, 0, S * 0.12, S * 0.05)} />
        <path d={starPath(S, 0, S * 0.12, S * 0.05)} />
        <path d={starPath(0, S, S * 0.12, S * 0.05)} />
        <path d={starPath(S, S, S * 0.12, S * 0.05)} />
        {/* isen dots at edge midpoints */}
        <circle cx={S / 2} cy={0} r={S * 0.03} />
        <circle cx={0} cy={S / 2} r={S * 0.03} />
        <circle cx={S} cy={S / 2} r={S * 0.03} />
        <circle cx={S / 2} cy={S} r={S * 0.03} />
      </g>
    </>
  )
}

/** Full-bleed tiled batik backdrop. Parent must be `relative`. */
export function Batik({
  id,
  className = '',
  color = 'currentColor',
  opacity = 0.08,
  scale = 56,
  strokeWidth = 1.1,
}: BatikProps) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ color, opacity }}
    >
      <defs>
        <pattern id={id} width={scale} height={scale} patternUnits="userSpaceOnUse">
          {KawungTile(scale, strokeWidth)}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Slim horizontal batik band — footer tops, dividers. */
export function BatikStrip({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <div className={`h-7 w-full overflow-hidden ${className}`} style={{ color }} aria-hidden>
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="batik-strip" width="28" height="28" patternUnits="userSpaceOnUse">
            {KawungTile(28, 1)}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-strip)" />
      </svg>
    </div>
  )
}

/** A bold vertical batik column — for decorative side panels. */
export function BatikPanel({ id, className = '', color = 'currentColor', opacity = 0.16 }: BatikProps) {
  return (
    <div className={`pointer-events-none absolute inset-y-0 ${className}`} style={{ color, opacity }} aria-hidden>
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
            {KawungTile(44, 1.4)}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
