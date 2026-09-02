import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { Img } from './ui'
import RoutesGlobe from './RoutesGlobe'

type Scene = {
  img?: string
  accent: 'leaf' | 'ocean' | 'terra' | 'forest'
  globe?: boolean
  label: string
}

const scenes: Scene[] = [
  { img: '/photos/highlands-a.jpg', accent: 'forest', label: 'Boyolali highlands' },
  { img: '/photos/warehouse.jpg', accent: 'leaf', label: 'Warehouse · loading' },
  { img: '/photos/seaport.jpg', accent: 'ocean', label: 'Seaport · crane' },
  { img: '/photos/gradient.jpg', accent: 'ocean', label: 'Across the ocean' },
  { globe: true, accent: 'ocean', label: 'To the world' },
]

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export default function CinematicStory() {
  const { t } = useI18n()
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const total = el.offsetHeight - window.innerHeight
        const scrolled = clamp(-rect.top / total)
        setP(scrolled)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const n = scenes.length
  const captions = [
    { t: t('story.1.t'), d: t('story.1.d') },
    { t: t('story.2.t'), d: t('story.2.d') },
    { t: t('story.3.t'), d: t('story.3.d') },
    { t: t('story.4.t'), d: t('story.4.d') },
    { t: t('story.5.t'), d: t('story.5.d') },
  ]

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {/* scene layers */}
        {scenes.map((s, i) => {
          const center = i / (n - 1)
          const dist = Math.abs(p - center)
          const opacity = clamp(1 - dist / 0.28)
          const scale = 1.12 - opacity * 0.1 + (p - center) * 0.18
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{ opacity, transform: `scale(${scale})`, transition: 'opacity .15s linear' }}
            >
              {s.globe ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#1a1d22] to-[#2c3038]">
                  <div className="w-[min(90vw,720px)]">
                    <RoutesGlobe />
                  </div>
                </div>
              ) : (
                <Img
                  src={s.img!}
                  alt={s.label}
                  accent={s.accent}
                  className="scene-img h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />
            </div>
          )
        })}

        {/* progress dots */}
        <div className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5">
          {scenes.map((_, i) => {
            const center = i / (n - 1)
            const active = Math.abs(p - center) < 0.14
            return (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-all ${active ? 'scale-125 bg-white' : 'bg-white/40'}`}
              />
            )
          })}
        </div>

        {/* captions */}
        <div className="absolute inset-0 z-10">
          {/* Hero overlay (scene 0) */}
          <Overlay show={p < 0.12}>
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
                {t('hero.kicker')}
              </div>
              <h1 className="font-display text-4xl leading-[1.05] text-white drop-shadow-lg sm:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">{t('hero.sub')}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/catalog"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest shadow-lg transition hover:bg-cream"
                >
                  {t('hero.cta1')}
                </Link>
                <span className="flex items-center gap-2 text-sm text-white/70">
                  <span className="inline-block animate-bounce">↓</span> {t('hero.cta2')}
                </span>
              </div>
            </div>
          </Overlay>

          {/* Story captions (scenes 1..4) */}
          {captions.slice(1).map((c, idx) => {
            const i = idx + 1
            const center = i / (n - 1)
            const show = Math.abs(p - center) < 0.1
            const last = i === n - 1
            return (
              <Overlay key={i} show={show}>
                <div className="max-w-xl">
                  <div className="mb-3 font-display text-sm text-white/70">
                    0{i + 1} / 0{n}
                  </div>
                  <h2 className="font-display text-3xl text-white drop-shadow sm:text-5xl">{c.t}</h2>
                  <p className="mt-4 text-base text-white/85 sm:text-lg">{c.d}</p>
                  {last && (
                    <Link
                      to="/catalog"
                      className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest shadow-lg transition hover:bg-cream"
                    >
                      {t('hero.cta1')} →
                    </Link>
                  )}
                </div>
              </Overlay>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Overlay({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className="container-x absolute inset-0 flex flex-col justify-end pb-[12vh] sm:justify-center sm:pb-0"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity .4s ease, transform .4s ease',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}
