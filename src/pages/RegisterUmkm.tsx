import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/icons'
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
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-leaf/12 text-forest">
          <Icon name="check" className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl text-ink">{t('reg.done.t')}</h1>
        <p className="mt-2 max-w-md text-muted">{t('reg.done.d')}</p>
        <Link to="/" className="btn btn-primary btn-lg mt-6">{t('nf.home')}</Link>
      </div>
    )

  const steps = [t('reg.s1'), t('reg.s2'), t('reg.s3')]
  const benefits = [
    { icon: 'globe', t: { en: 'Reach international buyers', id: 'Jangkau pembeli internasional' } },
    { icon: 'doc', t: { en: 'We handle export & documentation', id: 'Kami tangani ekspor & dokumentasi' } },
    { icon: 'check', t: { en: 'Earn a verified producer badge', id: 'Dapatkan badge produsen terverifikasi' } },
    { icon: 'shield', t: { en: 'Fair, producer-first terms', id: 'Syarat adil, utamakan produsen' } },
  ]

  return (
    <div className="pt-28">
      <div className="container-x grid gap-10 pb-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* value prop */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-px w-7 bg-forest/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-forest">{t('reg.kicker')}</span>
          </div>
          <h1 className="font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">{t('reg.title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t('reg.sub')}</p>
          <ul className="mt-8 space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-leaf/10 text-forest">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <span className="pt-1.5 text-ink/80">{tl(b.t)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* wizard */}
        <div>
          {/* stepper */}
          <div className="flex items-center">
            {steps.map((label, i) => {
              const n = i + 1
              const st = n < step ? 'done' : n === step ? 'active' : 'todo'
              return (
                <div key={n} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                        st === 'todo'
                          ? 'bg-black/5 text-muted'
                          : st === 'active'
                            ? 'bg-forest text-white ring-4 ring-forest/15'
                            : 'bg-forest text-white'
                      }`}
                    >
                      {st === 'done' ? <Icon name="check" className="h-5 w-5" /> : n}
                    </div>
                    <span className={`mt-1.5 text-[11px] ${st === 'active' ? 'font-semibold text-ink' : 'text-muted'}`}>{label}</span>
                  </div>
                  {n < total && <div className={`mx-2 h-0.5 flex-1 rounded transition ${n < step ? 'bg-forest' : 'bg-black/10'}`} />}
                </div>
              )
            })}
          </div>

          <form onSubmit={submit} className="mt-8 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_16px_-10px_rgba(31,42,36,0.2)] sm:p-8">
            <div className={step === 1 ? 'grid gap-4' : 'hidden'}>
              <Field label={t('reg.businessName')} name="businessName" />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-ink">{t('reg.category')}</span>
                <select name="category" className="w-full rounded-xl border border-black/10 bg-cream/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-leaf focus:bg-white">
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
                <span className="mb-1.5 block text-xs font-semibold text-ink">{t('reg.export')}</span>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm"><input type="radio" name="exported" value="yes" className="accent-[color:var(--color-forest)]" /> {t('reg.yes')}</label>
                  <label className="flex items-center gap-2 text-sm"><input type="radio" name="exported" value="no" defaultChecked className="accent-[color:var(--color-forest)]" /> {t('reg.no')}</label>
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

            <div className="mt-7 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className={`text-sm font-semibold text-muted transition hover:text-ink ${step === 1 ? 'invisible' : ''}`}
              >
                ← {t('reg.prev')}
              </button>
              <span className="text-xs text-muted">{t('reg.step')} {step} {t('reg.of')} {total}</span>
              {step < total ? (
                <button type="button" onClick={() => setStep((s) => Math.min(total, s + 1))} className="btn btn-primary">
                  {t('reg.next')} →
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">{t('reg.submit')}</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-black/10 bg-cream/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-leaf focus:bg-white"
      />
    </label>
  )
}
