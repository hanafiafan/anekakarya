import { useState } from 'react'
import { certifications, guarantees, markets, testimonials } from '../data'
import { useI18n } from '../i18n'
import { Img, Reveal, SectionHead } from './ui'
import { Icon } from './icons'

/** Editorial split — real imagery + origin story. */
export function OriginStory() {
  const { t } = useI18n()
  const points = [
    { t: t('origin.p1.t'), d: t('origin.p1.d') },
    { t: t('origin.p2.t'), d: t('origin.p2.d') },
    { t: t('origin.p3.t'), d: t('origin.p3.d') },
  ]
  return (
    <section className="container-x py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-4">
            <Img src="/photos/highlands-a.jpg" alt="Boyolali highlands" accent="forest" className="aspect-3/4 w-full rounded-3xl object-cover" />
            <div className="mt-8 grid gap-4">
              <Img src="/photos/farmer.jpg" alt="Producer" accent="leaf" className="aspect-square w-full rounded-3xl object-cover" />
              <Img src="/photos/copper-hands.jpg" alt="Artisan" accent="terra" className="aspect-square w-full rounded-3xl object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionHead kicker={t('origin.kicker')} title={t('origin.title')} sub={t('origin.body')} />
          <ul className="mt-8 space-y-5">
            {points.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf/10 text-sm font-bold text-forest">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-ink">{p.t}</div>
                  <div className="text-sm text-muted">{p.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/** Full-bleed photo mosaic. */
export function PhotoMosaic() {
  const { t } = useI18n()
  const shots = [
    { src: '/photos/warehouse.jpg', accent: 'leaf', span: 'col-span-2 row-span-2' },
    { src: '/photos/dairy-cows.jpg', accent: 'forest', span: '' },
    { src: '/photos/textiles.jpg', accent: 'ocean', span: '' },
    { src: '/photos/seaport.jpg', accent: 'ocean', span: 'col-span-2' },
    { src: '/photos/copper-vessels.jpg', accent: 'terra', span: '' },
    { src: '/photos/food.jpg', accent: 'leaf', span: '' },
  ] as const
  return (
    <section className="bg-ink py-20">
      <div className="container-x">
        <Reveal>
          <div className="mb-10 text-center">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-leaf-soft">{t('mosaic.kicker')}</div>
            <h2 className="font-display text-3xl text-white sm:text-4xl">{t('mosaic.title')}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/60">{t('mosaic.sub')}</p>
          </div>
        </Reveal>
        <div className="grid auto-rows-[140px] grid-cols-4 gap-3 sm:auto-rows-[180px]">
          {shots.map((s, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl ${s.span}`}>
              <Img src={s.src} alt="" accent={s.accent} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Slim government-backing trust line under the hero. */
export function TrustBar() {
  const { t } = useI18n()
  return (
    <div className="border-y border-black/5 bg-paper">
      <div className="container-x flex items-center justify-center gap-3 py-3 text-center text-sm text-muted">
        <span className="inline-block h-2 w-2 rounded-full bg-leaf" />
        <span className="font-medium text-ink/80">{t('badge.govt')}</span>
      </div>
    </div>
  )
}

/** Certification strip. */
export function Certifications() {
  const { t, tl } = useI18n()
  return (
    <section className="py-16">
      <div className="container-x">
        <Reveal>
          <SectionHead title={t('trust.title')} sub={t('trust.sub')} center />
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {certifications.map((c, i) => (
            <Reveal key={c.code} delay={i * 50}>
              <div
                className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5"
                title={tl(c.name)}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest/8 font-display text-xs font-bold text-forest">
                  {c.code.slice(0, 2)}
                </span>
                <div className="text-left">
                  <div className="text-sm font-bold leading-none text-ink">{c.code}</div>
                  <div className="mt-0.5 text-[11px] text-muted">{tl(c.name)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Cheerful multicolor icon-tile palette (cycled by index). */
export const iconTones = [
  'bg-forest/10 text-forest ring-forest/15',
  'bg-sun/20 text-[#b57816] ring-sun/25',
  'bg-terra/15 text-terra ring-terra/25',
  'bg-ocean/10 text-ocean ring-ocean/15',
]

/** Trade-assurance guarantees. */
export function Guarantees() {
  const { t, tl } = useI18n()
  return (
    <section className="bg-paper py-20">
      <div className="container-x">
        <Reveal>
          <SectionHead kicker={t('guar.kicker')} title={t('guar.title')} sub={t('guar.sub')} />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="h-full rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(31,42,36,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_-22px_rgba(31,42,36,0.26)]">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${iconTones[i % iconTones.length]}`}>
                  <Icon name={g.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg text-ink">{tl(g.title)}</h3>
                <p className="mt-2 text-sm text-muted">{tl(g.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Testimonials. */
export function Testimonials() {
  const { t, tl } = useI18n()
  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal>
          <SectionHead title={t('testi.title')} sub={t('testi.sub')} center />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((tm, i) => (
            <Reveal key={i} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_3px_rgba(31,42,36,0.05)]">
                <Icon name="quote" className="h-8 w-8 text-leaf/40" />
                <blockquote className="mt-4 flex-1 text-ink/85">{tl(tm.quote)}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-black/5 pt-5">
                  <span className="text-2xl">{tm.flag}</span>
                  <div>
                    <div className="text-sm font-semibold text-ink">{tm.name}</div>
                    <div className="text-xs text-muted">{tl(tm.role)}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Global markets ribbon. */
export function Markets() {
  const { t, tl } = useI18n()
  return (
    <section className="bg-paper py-16">
      <div className="container-x text-center">
        <Reveal>
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-leaf">
            {t('markets.kicker')}
          </div>
          <h2 className="font-display text-2xl text-ink sm:text-3xl">{t('markets.title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t('markets.sub')}</p>
        </Reveal>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {markets.map((m, i) => (
            <Reveal key={i} delay={i * 40}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm ring-1 ring-black/5">
                <span className="text-lg">{m.flag}</span>
                {tl(m.name)}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Newsletter signup (professional footer CTA). */
export function Newsletter() {
  const { t } = useI18n()
  const [done, setDone] = useState(false)
  return (
    <section className="container-x pt-4">
      <div className="grid items-center gap-6 rounded-[2rem] border border-black/5 bg-white px-8 py-10 sm:grid-cols-2 sm:px-12">
        <div>
          <h2 className="font-display text-2xl text-ink">{t('news.title')}</h2>
          <p className="mt-2 text-sm text-muted">{t('news.sub')}</p>
        </div>
        {done ? (
          <p className="font-medium text-forest sm:text-right">{t('news.done')}</p>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              setDone(true)
            }}
          >
            <input
              type="email"
              required
              placeholder={t('news.placeholder')}
              className="w-full rounded-full border border-black/10 bg-cream px-4 py-3 text-sm outline-none focus:border-leaf"
            />
            <button className="whitespace-nowrap rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-leaf">
              {t('news.btn')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
