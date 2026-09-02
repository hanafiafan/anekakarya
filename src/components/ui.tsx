import { createElement, useEffect, useRef, useState, type ReactNode } from 'react'

const gradients: Record<string, string> = {
  leaf: 'linear-gradient(135deg, #e7a6a1 0%, #c8322c 100%)',
  forest: 'linear-gradient(135deg, #c8322c 0%, #7e1d18 100%)',
  ocean: 'linear-gradient(135deg, #c7cbd1 0%, #3f4650 100%)',
  terra: 'linear-gradient(135deg, #e9a79f 0%, #b5312b 100%)',
  cream: 'linear-gradient(135deg, #ffffff 0%, #e6e7ea 100%)',
}

/** Image that falls back to an on-brand gradient block if the file isn't present yet. */
export function Img({
  src,
  alt,
  className = '',
  accent = 'leaf',
  label,
}: {
  src: string
  alt: string
  className?: string
  accent?: 'leaf' | 'ocean' | 'terra' | 'forest' | 'cream'
  label?: string
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center text-white/90 text-xs font-medium tracking-wide ${className}`}
        style={{ background: gradients[accent] }}
        aria-label={alt}
      >
        {label && <span className="px-3 text-center drop-shadow">{label}</span>}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}

/** Fade/slide in when scrolled into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return createElement(
    as,
    {
      ref,
      className: `reveal ${shown ? 'in' : ''} ${className}`,
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  )
}

export function Badge({ children, tone = 'leaf' }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    leaf: 'bg-leaf/12 text-forest',
    ocean: 'bg-ocean/12 text-ocean',
    terra: 'bg-terra/15 text-terra',
    forest: 'bg-forest/12 text-forest',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone] ?? tones.leaf}`}
    >
      {children}
    </span>
  )
}

export function SectionHead({
  kicker,
  title,
  sub,
  center = false,
}: {
  kicker?: string
  title: string
  sub?: string
  center?: boolean
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {kicker && (
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-leaf">{kicker}</div>
      )}
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted">{sub}</p>}
    </div>
  )
}
