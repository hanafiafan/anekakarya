import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/cards'
import { Badge, Img } from '../components/ui'
import { useRfq } from '../components/rfq'
import { productBySlug, umkmBySlug } from '../data'
import { useI18n } from '../i18n'

export default function Umkm() {
  const { slug = '' } = useParams()
  const { t, tl } = useI18n()
  const { open } = useRfq()
  const u = umkmBySlug(slug)

  if (!u)
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-3xl text-ink">{t('nf.title')}</h1>
        <Link to="/catalog" className="mt-4 text-leaf">← {t('nav.catalog')}</Link>
      </div>
    )

  const prods = u.productSlugs.map(productBySlug).filter(Boolean)
  const facts = [
    { label: t('label.capacity'), value: tl(u.capacity) },
    { label: t('label.moq'), value: tl(u.moq) },
    { label: t('label.leadtime'), value: tl(u.leadTime) },
    { label: t('label.since'), value: String(u.since) },
  ]

  return (
    <div className="pt-16">
      <div className="container-x py-10">
        <Link to="/catalog" className="text-sm text-muted hover:text-forest">← {t('nav.catalog')}</Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <Img src={u.photo} alt={u.name} label={u.name} className="aspect-4/3 h-full w-full object-cover" />
          </div>
          <div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {u.certifications.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <h1 className="font-display text-4xl text-ink">{u.name}</h1>
            <p className="mt-2 text-muted">{tl(u.location)}</p>
            <p className="mt-5 text-ink/80">{tl(u.story)}</p>

            <dl className="mt-7 grid grid-cols-2 gap-4">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{f.label}</dt>
                  <dd className="mt-1 font-display text-lg text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 text-sm text-muted">
              <span className="font-semibold text-ink">{t('label.languages')}:</span>{' '}
              {u.languages.join(', ')}
            </div>

            <button
              onClick={() => open(u.name)}
              className="mt-7 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white transition hover:bg-leaf"
            >
              {t('btn.rfq')}
            </button>
          </div>
        </div>

        {prods.length > 0 && (
          <>
            <h2 className="mt-16 font-display text-2xl text-ink">{t('label.products')}</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {prods.map((p) => p && <ProductCard key={p.slug} p={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
