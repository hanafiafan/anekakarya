import { Link } from 'react-router-dom'
import CinematicStory from '../components/CinematicStory'
import { CategoryCard, UmkmCard } from '../components/cards'
import { Reveal, SectionHead } from '../components/ui'
import {
  Certifications,
  Guarantees,
  Markets,
  Newsletter,
  OriginStory,
  PhotoMosaic,
  Testimonials,
  TrustBar,
} from '../components/sections'
import { useRfq } from '../components/rfq'
import { categories, stats, umkms } from '../data'
import { useI18n } from '../i18n'

export default function Home() {
  const { t, tl } = useI18n()
  const { open } = useRfq()

  return (
    <>
      <CinematicStory />
      <TrustBar />

      {/* stats bar */}
      <section className="bg-ink text-white">
        <div className="container-x grid grid-cols-2 gap-6 py-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <div className="font-display text-3xl sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs text-white/70 sm:text-sm">{tl(s.label)}</div>
            </div>
          ))}
        </div>
      </section>

      <OriginStory />
      <Certifications />

      {/* categories */}
      <section className="pb-20">
        <div className="container-x">
          <Reveal>
            <SectionHead kicker="Catalog" title={t('cats.title')} sub={t('cats.sub')} />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <CategoryCard c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Guarantees />

      {/* featured producers */}
      <section className="py-20">
        <div className="container-x">
          <Reveal>
            <SectionHead kicker="Producers" title={t('featured.title')} sub={t('featured.sub')} />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {umkms.slice(0, 3).map((u, i) => (
              <Reveal key={u.slug} delay={i * 80}>
                <UmkmCard u={u} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/catalog"
              className="inline-flex rounded-full border border-forest/20 px-6 py-3 text-sm font-semibold text-forest transition hover:bg-forest hover:text-white"
            >
              {t('hero.cta1')} →
            </Link>
          </div>
        </div>
      </section>

      <PhotoMosaic />
      <Testimonials />
      <Markets />

      {/* producer invite */}
      <section className="container-x pt-16">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-forest/15 bg-paper px-8 py-10 sm:flex-row sm:px-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-leaf">{t('reg.kicker')}</div>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{t('reg.title')}</h2>
            <p className="mt-2 max-w-md text-sm text-muted">{t('reg.sub')}</p>
          </div>
          <Link
            to="/register-umkm"
            className="shrink-0 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white transition hover:bg-leaf"
          >
            {t('nav.register')} →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pt-16">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest to-ocean px-8 py-14 text-center text-white sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl sm:text-4xl">{t('cta.title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{t('cta.sub')}</p>
          <button
            onClick={() => open()}
            className="mt-7 rounded-full bg-white px-7 py-3 text-sm font-semibold text-forest shadow-lg transition hover:bg-cream"
          >
            {t('nav.inquiry')}
          </button>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
