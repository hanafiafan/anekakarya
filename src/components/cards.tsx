import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import type { Category, Product, Umkm } from '../data'
import { umkmBySlug } from '../data'
import { Badge, Img } from './ui'
import { VerifiedCheck } from './icons'
import { AddToInquiry } from './AddToInquiry'

export function CategoryCard({ c }: { c: Category }) {
  const { tl } = useI18n()
  return (
    <Link
      to={`/catalog/${c.slug}`}
      className="group relative block aspect-4/5 overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/5 transition hover:shadow-xl"
    >
      <Img
        src={c.photo}
        alt={tl(c.name)}
        accent={c.accent}
        label={tl(c.name)}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-xl font-semibold text-white">{tl(c.name)}</h3>
        <p className="mt-1 text-sm text-white/75">{tl(c.tagline)}</p>
        <span className="mt-3 inline-flex translate-y-1 items-center gap-1 text-sm font-semibold text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          Explore →
        </span>
      </div>
    </Link>
  )
}

export function UmkmCard({ u }: { u: Umkm }) {
  const { t, tl } = useI18n()
  return (
    <Link
      to={`/umkm/${u.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-xl"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Img
          src={u.photo}
          alt={u.name}
          label={u.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-forest shadow-sm backdrop-blur">
          <VerifiedCheck className="h-3.5 w-3.5 text-leaf" />
          {t('badge.verified')}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {u.certifications.slice(0, 3).map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
        <h3 className="font-display text-xl text-ink">{u.name}</h3>
        <p className="mt-1 text-sm text-muted">🇮🇩 {tl(u.location)} · {t('label.since')} {u.since}</p>
        <p className="mt-3 line-clamp-2 text-sm text-ink/70">{tl(u.story)}</p>
        <span className="mt-4 inline-flex text-sm font-semibold text-leaf">{t('btn.viewProfile')} →</span>
      </div>
    </Link>
  )
}

export function ProductCard({ p }: { p: Product }) {
  const { t, tl } = useI18n()
  const u = umkmBySlug(p.umkm)
  return (
    <Link
      to={`/product/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden">
        <Img
          src={p.photo}
          alt={tl(p.name)}
          label={tl(p.name)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 opacity-0 transition group-hover:opacity-100">
          <AddToInquiry slug={p.slug} variant="icon" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base leading-snug text-ink">{tl(p.name)}</h3>
        {u && <p className="mt-1 text-xs text-muted">{u.name}</p>}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-ink/60">{t('label.moq')}: {tl(p.moq)}</span>
          <span className="text-sm font-semibold text-leaf">{t('btn.viewProduct')} →</span>
        </div>
      </div>
    </Link>
  )
}
