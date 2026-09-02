import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img, SectionHead } from '../components/ui'
import { useInquiry } from '../components/inquiry'
import { productBySlug, umkmBySlug } from '../data'
import { useI18n } from '../i18n'

export default function Inquiry() {
  const { t, tl } = useI18n()
  const { items, setQty, remove, clear } = useInquiry()
  const [state, setState] = useState<'form' | 'sending' | 'done'>('form')

  const rows = items.map((i) => ({ item: i, product: productBySlug(i.slug) })).filter((r) => r.product)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    const buyer = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    console.info('[Consolidated RFQ]', { buyer, items })
    setTimeout(() => {
      setState('done')
      clear()
    }, 800)
  }

  if (state === 'done')
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-3xl">✓</div>
        <h1 className="font-display text-3xl text-ink">{t('rfq.done.t')}</h1>
        <p className="mt-2 max-w-md text-muted">{t('rfq.done.d')}</p>
        <Link to="/catalog" className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white">
          {t('hero.cta1')} →
        </Link>
      </div>
    )

  if (rows.length === 0)
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <div className="text-5xl">🧺</div>
        <h1 className="mt-5 font-display text-3xl text-ink">{t('inq.empty.t')}</h1>
        <p className="mt-2 max-w-md text-muted">{t('inq.empty.d')}</p>
        <Link to="/catalog" className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white">
          {t('hero.cta1')} →
        </Link>
      </div>
    )

  return (
    <div className="pt-28">
      <div className="container-x pb-20">
        <SectionHead kicker={t('nav.inquiry')} title={t('inq.title')} sub={t('inq.sub')} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* items */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted">{rows.length} {t('inq.items')}</span>
              <button onClick={clear} className="text-sm font-medium text-terra hover:underline">{t('inq.clear')}</button>
            </div>
            <div className="space-y-3">
              {rows.map(({ item, product }) => {
                const u = umkmBySlug(product!.umkm)
                return (
                  <div key={item.slug} className="flex items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-black/5">
                    <Link to={`/product/${product!.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Img src={product!.photo} alt={tl(product!.name)} label={tl(product!.name)} className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${product!.slug}`} className="font-display text-base text-ink hover:text-forest">
                        {tl(product!.name)}
                      </Link>
                      {u && <p className="text-xs text-muted">{u.name}</p>}
                      <p className="mt-0.5 text-xs text-ink/60">{t('label.moq')}: {tl(product!.moq)}</p>
                    </div>
                    <div className="flex items-center rounded-full border border-black/10">
                      <button onClick={() => setQty(item.slug, item.qty - 1)} className="px-3 py-1.5 text-muted hover:text-forest">−</button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button onClick={() => setQty(item.slug, item.qty + 1)} className="px-3 py-1.5 text-muted hover:text-forest">+</button>
                    </div>
                    <button onClick={() => remove(item.slug)} className="p-2 text-muted hover:text-terra" aria-label={t('inq.remove')}>✕</button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* consolidated form */}
          <form onSubmit={submit} className="h-fit rounded-3xl bg-white p-6 ring-1 ring-black/5 lg:sticky lg:top-24">
            <h3 className="font-display text-xl text-ink">{t('inq.summary')}</h3>
            <div className="mt-4 grid gap-3">
              <Field label={t('rfq.name')} name="name" required />
              <Field label={t('rfq.company')} name="company" required />
              <div className="grid grid-cols-2 gap-3">
                <Field label={t('rfq.country')} name="country" required />
                <Field label={t('rfq.email')} name="email" type="email" required />
              </div>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-ink">{t('rfq.message')}</span>
                <textarea name="message" rows={3} className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-leaf" />
              </label>
            </div>
            <button
              type="submit"
              disabled={state === 'sending'}
              className="mt-5 w-full rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-leaf disabled:opacity-60"
            >
              {state === 'sending' ? t('rfq.sending') : `${t('inq.submit')} (${rows.length})`}
            </button>
            <p className="mt-3 text-center text-[11px] text-muted">{t('rfq.trust')}</p>
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
      <input name={name} type={type} required={required} className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-leaf" />
    </label>
  )
}
