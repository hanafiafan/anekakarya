import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge, Img } from '../components/ui'
import { ProductCard } from '../components/cards'
import { AddToInquiry } from '../components/AddToInquiry'
import { Icon, VerifiedCheck } from '../components/icons'
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
          <Link to="/catalog" className="transition hover:text-forest">{t('nav.catalog')}</Link>
          {c && (
            <>
              <span className="px-1.5 text-black/25">/</span>
              <Link to={`/catalog/${c.slug}`} className="transition hover:text-forest">{tl(c.name)}</Link>
            </>
          )}
          <span className="px-1.5 text-black/25">/</span>
          <span className="text-ink/70">{tl(p.name)}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* gallery */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_1px_3px_rgba(31,42,36,0.06)]">
              <Img
                src={gallery[active]}
                alt={tl(p.name)}
                accent={c?.accent}
                label={tl(p.name)}
                className="aspect-square h-full w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`h-20 w-20 overflow-hidden rounded-xl border transition ${
                      active === i
                        ? 'border-forest ring-2 ring-forest/25'
                        : 'border-black/[0.06] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <Img src={g} alt="" accent={c?.accent} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* detail — sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {c && <Badge tone={c.accent}>{tl(c.name)}</Badge>}
            <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">{tl(p.name)}</h1>

            {u && (
              <Link
                to={`/umkm/${u.slug}`}
                className="group mt-4 inline-flex items-center gap-3 rounded-full border border-black/[0.06] bg-white py-1.5 pl-1.5 pr-4 shadow-[0_1px_2px_rgba(31,42,36,0.05)] transition hover:border-black/10"
              >
                <span className="h-9 w-9 overflow-hidden rounded-full">
                  <Img src={u.photo} alt={u.name} className="h-full w-full object-cover" />
                </span>
                <span className="text-sm">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    {u.name}
                    <VerifiedCheck className="h-3.5 w-3.5 text-leaf" />
                  </span>
                  <span className="text-xs text-muted">{tl(u.location)}</span>
                </span>
              </Link>
            )}

            {/* trust chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <Chip icon="check" text={t('badge.verified')} />
              <Chip icon="box" text={`${t('label.moq')} · ${tl(p.moq)}`} />
              {u && <Chip icon="clock" text={`${t('label.leadtime')} · ${tl(u.leadTime)}`} />}
            </div>

            <p className="mt-5 leading-relaxed text-ink/80">{tl(p.description)}</p>

            {/* spec table */}
            <dl className="mt-6 border-y border-black/[0.06] text-sm">
              <Row label={t('label.hscode')} value={p.hsCode} mono />
              <Row label={t('label.price')} value={tl(p.priceHint)} />
              {p.specs.map((s, i) => (
                <Row key={i} label={tl(s.label)} value={tl(s.value)} />
              ))}
            </dl>

            {/* actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-black/10 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2.5 text-lg text-muted transition hover:text-forest"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 border-0 bg-transparent text-center text-sm font-medium outline-none"
                  aria-label={t('label.quantity')}
                />
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2.5 text-lg text-muted transition hover:text-forest"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => open(tl(p.name))}
                className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(200,50,44,0.7)] transition hover:bg-leaf"
              >
                {t('btn.rfq')}
              </button>
              <AddToInquiry slug={p.slug} qty={qty} />
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
              <Icon name="shield" className="h-4 w-4 text-leaf" />
              {t('rfq.trust')}
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <div className="mb-6 flex items-center gap-2.5">
              <span className="h-px w-7 bg-forest/60" />
              <h2 className="font-display text-2xl text-ink">{t('cat.related')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Chip({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink/80 ring-1 ring-black/[0.05]">
      <Icon name={icon} className="h-3.5 w-3.5 text-leaf" />
      {text}
    </span>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-black/[0.06] py-3.5 first:border-t-0">
      <dt className="text-muted">{label}</dt>
      <dd className={`text-right font-medium text-ink ${mono ? 'font-mono text-[13px]' : ''}`}>{value}</dd>
    </div>
  )
}
