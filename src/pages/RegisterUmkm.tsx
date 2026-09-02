import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data'
import { useI18n } from '../i18n'

export default function RegisterUmkm() {
  const { t, tl } = useI18n()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const total = 3

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement))
    console.info('[UMKM registration]', data)
    setDone(true)
  }

  if (done)
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-3xl">✓</div>
        <h1 className="font-display text-3xl text-ink">{t('reg.done.t')}</h1>
        <p className="mt-2 max-w-md text-muted">{t('reg.done.d')}</p>
        <Link to="/" className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white">{t('nf.home')}</Link>
      </div>
    )

  const steps = [t('reg.s1'), t('reg.s2'), t('reg.s3')]

  return (
    <div className="pt-28">
      <div className="container-x max-w-2xl pb-20">
        <div className="text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-leaf">{t('reg.kicker')}</div>
          <h1 className="font-display text-3xl text-ink sm:text-4xl">{t('reg.title')}</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted">{t('reg.sub')}</p>
        </div>

        {/* stepper */}
        <div className="mx-auto mt-10 flex max-w-md items-center">
          {steps.map((label, i) => {
            const n = i + 1
            const state = n < step ? 'done' : n === step ? 'active' : 'todo'
            return (
              <div key={n} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                      state === 'todo' ? 'bg-black/5 text-muted' : 'bg-forest text-white'
                    }`}
                  >
                    {state === 'done' ? '✓' : n}
                  </div>
                  <span className={`mt-1.5 text-[11px] ${state === 'active' ? 'font-semibold text-ink' : 'text-muted'}`}>{label}</span>
                </div>
                {n < total && <div className={`mx-2 h-0.5 flex-1 ${n < step ? 'bg-forest' : 'bg-black/10'}`} />}
              </div>
            )
          })}
        </div>

        <form onSubmit={submit} className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <div className={step === 1 ? 'grid gap-4' : 'hidden'}>
            <Field label={t('reg.businessName')} name="businessName" />
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-ink">{t('reg.category')}</span>
              <select name="category" className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-leaf">
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{tl(c.name)}</option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t('reg.location')} name="location" />
              <Field label={t('reg.since')} name="since" type="number" />
            </div>
          </div>

          <div className={step === 2 ? 'grid gap-4' : 'hidden'}>
            <Field label={t('reg.capacity')} name="capacity" placeholder="e.g. 5,000 units / month" />
            <Field label={t('reg.certs')} name="certs" placeholder="HALAL, BPOM, ISO 22000" />
            <div>
              <span className="mb-1 block text-xs font-semibold text-ink">{t('reg.export')}</span>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="exported" value="yes" /> {t('reg.yes')}</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="exported" value="no" defaultChecked /> {t('reg.no')}</label>
              </div>
            </div>
          </div>

          <div className={step === 3 ? 'grid gap-4' : 'hidden'}>
            <Field label={t('reg.pic')} name="pic" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t('reg.phone')} name="phone" required />
              <Field label={t('reg.email')} name="email" type="email" required />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink ${step === 1 ? 'invisible' : ''}`}
            >
              ← {t('reg.prev')}
            </button>
            <span className="text-xs text-muted">{t('reg.step')} {step} {t('reg.of')} {total}</span>
            {step < total ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(total, s + 1))}
                className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-leaf"
              >
                {t('reg.next')} →
              </button>
            ) : (
              <button type="submit" className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-leaf">
                {t('reg.submit')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-leaf" />
    </label>
  )
}
