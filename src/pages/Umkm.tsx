import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/cards'
import { Img } from '../components/ui'
import { Icon, VerifiedCheck } from '../components/icons'
import { useRfq } from '../components/rfq'
import { productBySlug, umkmBySlug } from '../data'
import { useI18n } from '../i18n'
import { SITE, useSeo } from '../lib/seo'

export default function Umkm() {
  const { slug = '' } = useParams()
  const { t, tl } = useI18n()
  const { open } = useRfq()
  const u = umkmBySlug(slug)

  useSeo(
    u
      ? {
          title: u.name,
          description: tl(u.story),
          image: u.photo,
          path: `/umkm/${slug}`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: u.name,
            image: `${SITE}${u.photo}`,
            description: tl(u.story),
            address: { '@type': 'PostalAddress', addressLocality: tl(u.location), addressCountry: 'ID' },
            foundingDate: String(u.since),
          },
        }
      : { title: 'Not found', path: `/umkm/${slug}` },
  )

  if (!u)
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-3xl text-ink">{t('nf.title')}</h1>
        <Link to="/catalog" className="mt-4 text-leaf">← {t('nav.catalog')}</Link>
      </div>
    )

  const prods = u.productSlugs.map(productBySlug).filter(Boolean)
  const facts = [
    { icon: 'factory', label: t('label.capacity'), value: tl(u.capacity) },
    { icon: 'box', label: t('label.moq'), value: tl(u.moq) },
    { icon: 'clock', label: t('label.leadtime'), value: tl(u.leadTime) },
    { icon: 'target', label: t('label.since'), value: String(u.since) },
  ]

  return (
    <div>
      {/* hero */}
      <div className="relative h-[52vh] min-h-[22rem] w-full overflow-hidden">
        <Img src={u.photo} alt={u.name} label={u.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/25" />
        <div className="container-x absolute inset-0 flex flex-col justify-end pb-10">
          <Link to="/catalog" className="mb-4 inline-flex w-fit items-center gap-1.5 text-sm text-white/80 transition hover:text-white">
            ← {t('nav.catalog')}
          </Link>
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <VerifiedCheck className="h-3.5 w-3.5 text-leaf-soft" />
            {t('badge.verified')}
          </span>
          <h1 className="font-display text-4xl text-white sm:text-6xl">{u.name}</h1>
          <p className="mt-2 text-white/85">
            {tl(u.location)} · {t('label.since')} {u.since}
          </p>
        </div>
      </div>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr]">
        {/* story + certs */}
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-px w-7 bg-forest/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-forest">
              {tl({ en: 'About the producer', id: 'Tentang produsen' })}
            </span>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-ink/85">{tl(u.story)}</p>

          <h3 className="mt-10 font-display text-lg text-ink">{t('label.certs')}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {u.certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-forest ring-1 ring-black/[0.05]"
              >
                <VerifiedCheck className="h-3.5 w-3.5 text-leaf" />
                {c}
              </span>
            ))}
          </div>

          <h3 className="mt-8 font-display text-lg text-ink">{t('label.languages')}</h3>
          <p className="mt-2 text-muted">{u.languages.join(' · ')}</p>

          <button onClick={() => open(u.name)} className="btn btn-primary btn-lg mt-10">
            {t('btn.rfq')}
          </button>
        </div>

        {/* trade profile card — sticky */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_16px_-8px_rgba(31,42,36,0.15)]">
            <h3 className="font-display text-xl text-ink">
              {tl({ en: 'Trade profile', id: 'Profil dagang' })}
            </h3>
            <dl className="mt-5 space-y-4">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-leaf/10 text-forest">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{f.label}</dt>
                    <dd className="mt-0.5 font-display text-lg leading-tight text-ink">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-black/[0.06] pt-5">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-ink">
                <Icon name="pin" className="h-4 w-4 text-leaf" />
                {tl(u.location)}
              </div>
              <p className="text-xs text-muted">{t('rfq.trust')}</p>
            </div>
            <button onClick={() => open(u.name)} className="btn btn-primary mt-5 w-full">
              {t('btn.rfq')}
            </button>
          </div>
        </aside>
      </div>

      {prods.length > 0 && (
        <div className="container-x pb-8">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-px w-7 bg-forest/60" />
            <h2 className="font-display text-2xl text-ink">{t('label.products')}</h2>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {prods.map((p) => p && <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
