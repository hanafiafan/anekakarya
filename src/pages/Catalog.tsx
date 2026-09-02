import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard, UmkmCard } from '../components/cards'
import { SectionHead } from '../components/ui'
import { categories, certifications, products, umkmBySlug, umkms } from '../data'
import { useI18n } from '../i18n'

const moqNum = (s: string) => parseInt(s.replace(/[^0-9]/g, '') || '0', 10)

export default function Catalog() {
  const { t, tl, lang } = useI18n()
  const [params, setParams] = useSearchParams()

  const q = params.get('q') ?? ''
  const cat = params.get('cat') ?? 'all'
  const cert = params.get('cert') ?? ''
  const sort = params.get('sort') ?? 'featured'

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params)
    if (!v || v === 'all' || v === 'featured') next.delete(k)
    else next.set(k, v)
    setParams(next, { replace: true })
  }
  const clearAll = () => setParams(new URLSearchParams(), { replace: true })

  const matchQ = (s: string) => s.toLowerCase().includes(q.toLowerCase())

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const u = umkmBySlug(p.umkm)
      if (cat !== 'all' && p.category !== cat) return false
      if (cert && !(u?.certifications.includes(cert))) return false
      if (q && !matchQ(tl(p.name)) && !matchQ(u?.name ?? '')) return false
      return true
    })
    if (sort === 'az') list = [...list].sort((a, b) => tl(a.name).localeCompare(tl(b.name)))
    if (sort === 'moq') list = [...list].sort((a, b) => moqNum(a.moq.en) - moqNum(b.moq.en))
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cat, cert, sort, lang])

  const filteredUmkm = useMemo(
    () =>
      umkms.filter((u) => {
        if (cat !== 'all' && u.category !== cat) return false
        if (cert && !u.certifications.includes(cert)) return false
        if (q && !matchQ(u.name) && !matchQ(tl(u.story))) return false
        return true
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, cat, cert, lang],
  )

  const total = filteredProducts.length + filteredUmkm.length
  const active = q || cat !== 'all' || cert || sort !== 'featured'

  return (
    <div className="pt-28">
      <div className="container-x">
        <SectionHead kicker={t('nav.catalog')} title={t('catalog.title')} sub={t('catalog.sub')} />

        {/* search + sort */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">⌕</span>
            <input
              value={q}
              onChange={(e) => set('q', e.target.value)}
              placeholder={t('cat.search')}
              className="w-full rounded-full border border-black/10 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-leaf"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => set('sort', e.target.value)}
            className="rounded-full border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-leaf"
          >
            <option value="featured">{t('cat.sort.featured')}</option>
            <option value="az">{t('cat.sort.az')}</option>
            <option value="moq">{t('cat.sort.moq.low')}</option>
          </select>
        </div>

        {/* filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Chip active={cat === 'all'} onClick={() => set('cat', 'all')}>{t('catalog.all')}</Chip>
          {categories.map((c) => (
            <Chip key={c.slug} active={cat === c.slug} onClick={() => set('cat', c.slug)}>
              {tl(c.name)}
            </Chip>
          ))}
          <span className="mx-1 h-5 w-px bg-black/10" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">{t('cat.cert')}:</span>
          {certifications.slice(0, 5).map((c) => (
            <Chip key={c.code} small active={cert === c.code} onClick={() => set('cert', cert === c.code ? '' : c.code)}>
              {c.code}
            </Chip>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-b border-black/5 pb-4">
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">{total}</span> {t('cat.results')}
          </p>
          {active && (
            <button onClick={clearAll} className="text-sm font-medium text-leaf hover:text-forest">
              {t('cat.clear')} ✕
            </button>
          )}
        </div>

        {total === 0 ? (
          <div className="py-24 text-center">
            <div className="text-4xl">🔍</div>
            <h3 className="mt-4 font-display text-2xl text-ink">{t('cat.none.t')}</h3>
            <p className="mt-2 text-muted">{t('cat.none.d')}</p>
          </div>
        ) : (
          <>
            {filteredUmkm.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-2xl text-ink">{t('catalog.producers')}</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredUmkm.map((u) => (
                    <UmkmCard key={u.slug} u={u} />
                  ))}
                </div>
              </>
            )}
            {filteredProducts.length > 0 && (
              <>
                <h2 className="mt-14 font-display text-2xl text-ink">{t('catalog.products')}</h2>
                <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((p) => (
                    <ProductCard key={p.slug} p={p} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
  small,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full font-medium transition ${small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} ${
        active ? 'bg-forest text-white' : 'bg-white text-ink/70 ring-1 ring-black/5 hover:bg-cream'
      }`}
    >
      {children}
    </button>
  )
}
