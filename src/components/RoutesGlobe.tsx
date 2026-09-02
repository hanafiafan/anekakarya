// Lightweight SVG "globe" with animated shipping routes from Boyolali to the world.
// No three.js — intentionally light. Swap for globe.gl later if real-time 3D is wanted.

const ports = [
  { x: 250, y: 150 }, // Europe
  { x: 300, y: 130 }, // N. Europe
  { x: 120, y: 175 }, // Americas
  { x: 350, y: 210 }, // Middle East
  { x: 470, y: 130 }, // E. Asia
  { x: 500, y: 250 }, // Oceania
]
const origin = { x: 430, y: 205 } // Indonesia-ish

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 - Math.hypot(b.x - a.x, b.y - a.y) * 0.28
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}

export default function RoutesGlobe() {
  return (
    <svg viewBox="0 0 600 340" className="h-full w-full" role="img" aria-label="Global shipping routes">
      <defs>
        <radialGradient id="ocean" cx="42%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#4a515c" />
          <stop offset="70%" stopColor="#333941" />
          <stop offset="100%" stopColor="#22262d" />
        </radialGradient>
        <linearGradient id="route" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffd7d3" />
          <stop offset="100%" stopColor="#e8564d" />
        </linearGradient>
      </defs>

      {/* globe */}
      <circle cx="300" cy="180" r="150" fill="url(#ocean)" />
      {/* graticule */}
      <g className="globe-rotate" style={{ transformBox: 'fill-box' } as React.CSSProperties} opacity="0.2" stroke="#cdd2d9" strokeWidth="1" fill="none">
        <ellipse cx="300" cy="180" rx="150" ry="55" />
        <ellipse cx="300" cy="180" rx="150" ry="110" />
        <ellipse cx="300" cy="180" rx="55" ry="150" />
        <ellipse cx="300" cy="180" rx="110" ry="150" />
        <line x1="150" y1="180" x2="450" y2="180" />
      </g>

      {/* stylized landmasses (abstract) */}
      <g fill="#8a919b" opacity="0.85">
        <path d="M210 120 q40 -18 70 6 q20 18 -6 34 q-40 20 -70 -4 q-16 -20 6 -36z" />
        <path d="M120 170 q22 -20 44 -2 q10 26 -16 40 q-30 8 -34 -14 q-2 -14 6 -24z" />
        <path d="M330 190 q34 -16 70 4 q28 18 6 44 q-40 22 -74 -4 q-20 -24 -2 -44z" />
        <path d="M470 120 q30 -8 44 12 q8 22 -18 30 q-28 4 -34 -18 q-2 -14 8 -24z" />
      </g>

      {/* routes */}
      <g fill="none" strokeWidth="2" strokeLinecap="round">
        {ports.map((p, i) => (
          <path key={i} d={arc(origin, p)} stroke="url(#route)" className="route-line" opacity="0.9" />
        ))}
      </g>

      {/* port dots */}
      {ports.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#ffffff">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* origin */}
      <circle cx={origin.x} cy={origin.y} r="5" fill="#ff5b50" />
      <circle cx={origin.x} cy={origin.y} r="5" fill="none" stroke="#ff5b50">
        <animate attributeName="r" values="5;14;5" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
