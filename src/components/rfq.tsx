import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useI18n } from '../i18n'
import { Icon } from './icons'

type RfqCtx = { open: (product?: string) => void }
const Ctx = createContext<RfqCtx | null>(null)

export function useRfq() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useRfq must be used within RfqProvider')
  return c
}

export function RfqProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<string | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const open = (p?: string) => {
    setProduct(p)
    setIsOpen(true)
  }
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {isOpen && <RfqModal product={product} onClose={() => setIsOpen(false)} />}
    </Ctx.Provider>
  )
}

function RfqModal({ product, onClose }: { product?: string; onClose: () => void }) {
  const { t } = useI18n()
  const [state, setState] = useState<'form' | 'sending' | 'done'>('form')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    // ponytail: no backend/email key wired yet — simulate accept + log payload.
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    console.info('[RFQ submitted]', data)
    setTimeout(() => setState('done'), 700)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="animate-modal-in max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-black/[0.06] bg-paper p-6 shadow-2xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {state === 'done' ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-leaf/12 text-forest">
              <Icon name="check" className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl text-ink">{t('rfq.done.t')}</h3>
            <p className="mx-auto mt-2 max-w-sm text-muted">{t('rfq.done.d')}</p>
            <button onClick={onClose} className="btn btn-primary mt-6">{t('rfq.close')}</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-forest/60" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-forest">
                    {t('nav.inquiry')}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink">{t('rfq.title')}</h3>
                <p className="mt-1 text-sm text-muted">{t('rfq.sub')}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="-mr-1 -mt-1 rounded-full p-2 text-muted transition hover:bg-cream hover:text-ink"
                aria-label={t('rfq.close')}
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-3">
              <Field label={t('rfq.product')} name="product" defaultValue={product} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={t('rfq.name')} name="name" required />
                <Field label={t('rfq.company')} name="company" required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={t('rfq.country')} name="country" required />
                <Field label={t('rfq.email')} name="email" type="email" required />
              </div>
              <Field label={t('rfq.qty')} name="qty" placeholder="e.g. 500 units" />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-ink">{t('rfq.message')}</span>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full rounded-xl border border-black/10 bg-cream/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-leaf focus:bg-white"
                />
              </label>
            </div>

            <button type="submit" disabled={state === 'sending'} className="btn btn-primary mt-5 w-full disabled:opacity-70">
              {state === 'sending' ? (
                <>
                  <span className="spinner" /> {t('rfq.sending')}
                </>
              ) : (
                t('rfq.send')
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted">
              <Icon name="shield" className="h-3.5 w-3.5 text-leaf" />
              {t('rfq.trust')}
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  defaultValue,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  defaultValue?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-black/10 bg-cream/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-leaf focus:bg-white"
      />
    </label>
  )
}
