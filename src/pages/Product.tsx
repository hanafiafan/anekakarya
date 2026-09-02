import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge, Img } from '../components/ui'
import { ProductCard } from '../components/cards'
import { AddToInquiry } from '../components/AddToInquiry'
import { useRfq } from '../components/rfq'
import { byCategory, categoryBySlug, productBySlug, umkmBySlug } from '../data'
import { useI18n } from '../i18n'

export default function Product() {
  const { slug = '' } = useParams()
  const { t, tl } = useI18n()
  const { open } = useRfq()
  const p = productBySlug(slug)
  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)

  if (!p)
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-3xl text-ink">{t('nf.title')}</h1>
        <Link to="/catalog" className="mt-4 text-leaf">← {t('nav.catalog')}</Link>
      </div>
    )

  const u = umkmBySlug(p.umkm)
  const c = categoryBySlug(p.category)
  const gallery = Array.from(new Set([p.photo, u?.photo, c?.photo].filter(Boolean) as string[]))
  const related = byCategory(p.category).filter((x) => x.slug !== p.slug).slice(0, 4)

  return (
    <div className="pt-16">
      <div className="container-x py-10">
        {/* breadcrumb */}
        <nav className="text-sm text-muted">
          <Link to="/catalog" className="hover:text-forest">{t('nav.catalog')}</Link>
          {c && (
            <>
              {' / '}
              <Link to={`/catalog/${c.slug}`} className="hover:text-forest">{tl(c.name)}</Link>
            </>
          )}
          {' / '}
          <span className="text-ink/70">{tl(p.name)}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* gallery */}
          <div>
            <div className="overflow-hidden rounded-3xl">
              <Img
                src={gallery[active]}
                alt={tl(p.name)}
                accent={c?.accent}
                label={tl(p.name)}
                className="aspect-square h-full w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-20 w-20 overflow-hidden rounded-xl ring-2 transition ${
                      active === i ? 'ring-forest' : 'ring-transparent hover:ring-black/10'
                    }`}
                  >
                    <Img src={g} alt="" accent={c?.accent} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* detail */}
          <div>
            {c && <Badge tone={c.accent}>{tl(c.name)}</Badge>}
            <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{tl(p.name)}</h1>
            {u && (
              <Link to={`/umkm/${u.slug}`} className="mt-2 inline-block text-sm font-medium text-leaf hover:text-forest">
                {t('label.producer')}: {u.name} →
              </Link>
            )}
            <p className="mt-5 text-ink/80">{tl(p.description)}</p>

            <dl className="mt-7 divide-y divide-black/5 rounded-2xl bg-white ring-1 ring-black/5">
              <Row label={t('label.hscode')} value={p.hsCode} />
              <Row label={t('label.moq')} value={tl(p.moq)} />
              <Row label={t('label.price')} value={tl(p.priceHint)} />
              {p.specs.map((s, i) => (
                <Row key={i} label={tl(s.label)} value={tl(s.value)} />
              ))}
            </dl>

            {/* quantity + actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-black/10 bg-white">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2.5 text-lg text-muted hover:text-forest">−</button>
                <input
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 border-0 bg-transparent text-center text-sm outline-none"
                  aria-label={t('label.quantity')}
                />
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2.5 text-lg text-muted hover:text-forest">+</button>
              </div>
              <AddToInquiry slug={p.slug} qty={qty} />
              <button
                onClick={() => open(tl(p.name))}
                className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-leaf"
              >
                {t('btn.rfq')}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <>
            <h2 className="mt-20 font-display text-2xl text-ink">{t('cat.related')}</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-semibold text-ink">{value}</dd>
    </div>
  )
}
