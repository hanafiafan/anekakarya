import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img, SectionHead } from '../components/ui'
import { Icon } from '../components/icons'
import { useInquiry } from '../components/inquiry'
import { productBySlug, umkmBySlug } from '../data'
import { useI18n } from '../i18n'
import { useSeo } from '../lib/seo'
import { submitForm } from '../lib/submitForm'

export default function Inquiry() {
  const { t, tl } = useI18n()
  useSeo({ title: t('inq.title'), description: t('inq.sub'), path: '/inquiry' })
  const { items, setQty, remove, clear } = useInquiry()
  const [state, setState] = useState<'form' | 'sending' | 'done'>('form')
  const [error, setError] = useState('')

  const rows = items.map((i) => ({ item: i, product: productBySlug(i.slug) })).filter((r) => r.product)
  const producers = new Set(rows.map((r) => r.product!.umkm)).size

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setState('sending')
    const buyer = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement))
    const itemsText = rows.map((r) => `${tl(r.product!.name)} ×${r.item.qty}`).join('; ')
    const { ok } = await submitForm('New consolidated inquiry — Aneka Karya', { ...buyer, items: itemsText })
    if (ok) {
      setState('done')
      clear()
    } else {
      setState('form')
      setError(t('form.error'))
    }
  }

  if (state === 'done')
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-leaf/12 text-forest">
          <Icon name="check" className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl text-ink">{t('rfq.done.t')}</h1>
        <p className="mt-2 max-w-md text-muted">{t('rfq.done.d')}</p>
        <Link to="/catalog" className="btn btn-primary btn-lg mt-6">{t('hero.cta1')}</Link>
      </div>
    )

  if (rows.length === 0)
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/[0.04] text-muted">
          <Icon name="bag" className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-display text-3xl text-ink">{t('inq.empty.t')}</h1>
        <p className="mt-2 max-w-md text-muted">{t('inq.empty.d')}</p>
        <Link to="/catalog" className="btn btn-primary btn-lg mt-6">{t('hero.cta1')}</Link>
      </div>
    )

  return (
    <div className="pt-28">
      <div className="container-x pb-20">
        <SectionHead kicker={t('nav.inquiry')} title={t('inq.title')} sub={t('inq.sub')} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* items */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted">
                <span className="font-semibold text-ink">{rows.length}</span> {t('inq.items')}
                {producers > 1 && <span className="text-muted"> · {producers} {t('catalog.producers').toLowerCase()}</span>}
              </span>
              <button onClick={clear} className="inline-flex items-center gap-1.5 text-sm font-medium text-terra transition hover:opacity-80">
                <Icon name="trash" className="h-4 w-4" /> {t('inq.clear')}
              </button>
            </div>
            <div className="space-y-3">
              {rows.map(({ item, product }) => {
                const u = umkmBySlug(product!.umkm)
                return (
                  <div
                    key={item.slug}
                    className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_1px_3px_rgba(31,42,36,0.05)]"
                  >
                    <Link to={`/product/${product!.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Img src={product!.photo} alt={tl(product!.name)} label={tl(product!.name)} className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${product!.slug}`} className="font-display text-base text-ink transition hover:text-forest">
                        {tl(product!.name)}
                      </Link>
                      {u && <p className="text-xs text-muted">{u.name}</p>}
                      <p className="mt-0.5 text-xs text-ink/55">{t('label.moq')}: {tl(product!.moq)}</p>
                    </div>
                    <div className="flex items-center rounded-full border border-black/10 bg-white">
                      <button onClick={() => setQty(item.slug, item.qty - 1)} className="px-3 py-2 text-muted transition hover:text-forest" aria-label="Decrease">
                        <Icon name="minus" className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button onClick={() => setQty(item.slug, item.qty + 1)} className="px-3 py-2 text-muted transition hover:text-forest" aria-label="Increase">
                        <Icon name="plus" className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button onClick={() => remove(item.slug)} className="p-2 text-muted transition hover:text-terra" aria-label={t('inq.remove')}>
                      <Icon name="x" className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* consolidated form */}
          <form onSubmit={submit} className="h-fit rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_16px_-10px_rgba(31,42,36,0.2)] lg:sticky lg:top-24">
            <h3 className="font-display text-xl text-ink">{t('inq.summary')}</h3>
            <p className="mt-1 text-xs text-muted">{t('rfq.sub')}</p>
            <div className="mt-5 grid gap-3">
              <Field label={t('rfq.name')} name="name" required />
              <Field label={t('rfq.company')} name="company" required />
              <div className="grid grid-cols-2 gap-3">
                <Field label={t('rfq.country')} name="country" required />
                <Field label={t('rfq.email')} name="email" type="email" required />
              </div>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-ink">{t('rfq.message')}</span>
                <textarea name="message" rows={3} className="w-full rounded-xl border border-black/10 bg-cream/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-leaf focus:bg-white" />
              </label>
            </div>
            <button type="submit" disabled={state === 'sending'} className="btn btn-primary mt-5 w-full disabled:opacity-70">
              {state === 'sending' ? (
                <>
                  <span className="spinner" /> {t('rfq.sending')}
                </>
              ) : (
                `${t('inq.submit')} (${rows.length})`
              )}
            </button>
            {error && <p className="mt-3 text-center text-xs font-medium text-forest">{error}</p>}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted">
              <Icon name="shield" className="h-3.5 w-3.5 text-leaf" />
              {t('rfq.trust')}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-black/10 bg-cream/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-leaf focus:bg-white"
      />
    </label>
  )
}
