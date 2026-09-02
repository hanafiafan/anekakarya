// Filled kawung (four-petal flowers) + truntum (four-point stars) batik lattice.
// Bold, ref-matched Central-Java motif used as brand ornament in decorative zones.

type BatikProps = {
  id: string
  className?: string
  color?: string // petals
  accent?: string // stars + dots
  opacity?: number // petal opacity
  accentOpacity?: number // star opacity
  scale?: number
}

function petal(cx: number, cy: number, deg: number, P: number, W: number) {
  const t = (deg * Math.PI) / 180
  const cos = Math.cos(t)
  const sin = Math.sin(t)
  const tx = cx + P * cos
  const ty = cy + P * sin
  const mx = cx + P * 0.5 * cos
  const my = cy + P * 0.5 * sin
  const px = -sin
  const py = cos
  return `M${cx} ${cy} Q${mx + (W / 2) * px} ${my + (W / 2) * py} ${tx} ${ty} Q${mx - (W / 2) * px} ${my - (W / 2) * py} ${cx} ${cy} Z`
}

function star(cx: number, cy: number, outer: number, inner: number) {
  const pts: string[] = []
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    pts.push(`${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`)
  }
  return `M${pts[0]} L${pts.slice(1).join(' L')} Z`
}

/** Children of one seamless filled-kawung pattern tile. */
function Tile(S: number, color: string, accent: string, op: number, aop: number) {
  const P = S * 0.5
  const W = S * 0.3
  const flower = (cx: number, cy: number, dirs: number[]) =>
    dirs.map((d) => <path key={`${cx}-${cy}-${d}`} d={petal(cx, cy, d, P, W)} />)
  return (
    <>
      <g fill={color} fillOpacity={op}>
        {flower(S / 2, S / 2, [0, 90, 180, 270])}
        {flower(0, 0, [0, 90])}
        {flower(S, 0, [90, 180])}
        {flower(0, S, [0, 270])}
        {flower(S, S, [180, 270])}
      </g>
      <g fill={accent} fillOpacity={aop}>
        <path d={star(S / 2, 0, S * 0.11, S * 0.045)} />
        <path d={star(0, S / 2, S * 0.11, S * 0.045)} />
        <path d={star(S, S / 2, S * 0.11, S * 0.045)} />
        <path d={star(S / 2, S, S * 0.11, S * 0.045)} />
        <circle cx={S / 2} cy={S / 2} r={S * 0.05} />
      </g>
    </>
  )
}

/** Full-bleed tiled batik backdrop. Parent must be `relative`. */
export function Batik({
  id,
  className = '',
  color = '#c8322c',
  accent,
  opacity = 0.2,
  accentOpacity = 0.5,
  scale = 60,
}: BatikProps) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width={scale} height={scale} patternUnits="userSpaceOnUse">
          {Tile(scale, color, accent ?? color, opacity, accentOpacity)}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Slim horizontal batik band — footer tops, dividers. */
export function BatikStrip({
  color = '#ffffff',
  accent = '#ffffff',
  opacity = 0.9,
  accentOpacity = 1,
  className = '',
}: {
  color?: string
  accent?: string
  opacity?: number
  accentOpacity?: number
  className?: string
}) {
  return (
    <div className={`h-9 w-full overflow-hidden ${className}`} aria-hidden>
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="batik-strip" width="36" height="36" patternUnits="userSpaceOnUse">
            {Tile(36, color, accent, opacity, accentOpacity)}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-strip)" />
      </svg>
    </div>
  )
}

/** Bold vertical batik column — decorative side panels. */
export function BatikPanel({
  id,
  className = '',
  color = '#c8322c',
  accent = '#ffffff',
  opacity = 0.9,
  accentOpacity = 0.9,
}: BatikProps) {
  return (
    <div className={`pointer-events-none absolute inset-y-0 overflow-hidden ${className}`} aria-hidden>
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={id} width="52" height="52" patternUnits="userSpaceOnUse">
            {Tile(52, color, accent, opacity, accentOpacity)}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
