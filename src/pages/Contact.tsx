import { SectionHead } from '../components/ui'
import { Icon } from '../components/icons'
import { useRfq } from '../components/rfq'
import { useI18n } from '../i18n'

export default function Contact() {
  const { t, tl } = useI18n()
  const { open } = useRfq()

  const methods = [
    {
      icon: 'mail',
      label: { en: 'Email', id: 'Email' },
      value: 'export@anekakarya.id',
      href: 'mailto:export@anekakarya.id',
    },
    {
      icon: 'phone',
      label: { en: 'WhatsApp', id: 'WhatsApp' },
      value: '+62 812-0000-0000',
      href: 'https://wa.me/628120000000',
    },
    {
      icon: 'pin',
      label: { en: 'Office', id: 'Kantor' },
      value: 'Jl. Pandanaran, Boyolali, Central Java 57311',
    },
    {
      icon: 'clock',
      label: { en: 'Hours', id: 'Jam kerja' },
      value: 'Mon–Fri · 08:00–16:00 WIB',
    },
  ]

  return (
    <div className="pt-28">
      <div className="container-x pb-20">
        <SectionHead kicker={t('nav.contact')} title={t('contact.title')} sub={t('contact.sub')} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* contact methods */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {methods.map((m, i) => {
                const inner = (
                  <>
                    <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-leaf/10 text-forest">
                      <Icon name={m.icon} className="h-5 w-5" />
                    </span>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted">{tl(m.label)}</div>
                    <div className="mt-1 font-medium text-ink">{m.value}</div>
                  </>
                )
                return m.href ? (
                  <a
                    key={i}
                    href={m.href}
                    className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(31,42,36,0.05)] transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={i} className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_3px_rgba(31,42,36,0.05)]">
                    {inner}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-forest to-terra p-6 text-white">
              <h3 className="font-display text-lg">{t('contact.office')}</h3>
              <p className="mt-1 text-sm text-white/85">{t('rfq.trust')}</p>
              <button onClick={() => open()} className="btn btn-ondark mt-4">{t('nav.inquiry')}</button>
            </div>
          </div>

          {/* map */}
          <div className="overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_2px_16px_-10px_rgba(31,42,36,0.2)]">
            <iframe
              title="Boyolali map"
              className="h-full min-h-[22rem] w-full"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=110.55%2C-7.55%2C110.66%2C-7.48&layer=mapnik&marker=-7.5316%2C110.5967"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
