import { SectionHead } from '../components/ui'
import { useRfq } from '../components/rfq'
import { useI18n } from '../i18n'

export default function Contact() {
  const { t } = useI18n()
  const { open } = useRfq()
  return (
    <div className="pt-28">
      <div className="container-x pb-20">
        <SectionHead kicker={t('nav.contact')} title={t('contact.title')} sub={t('contact.sub')} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 ring-1 ring-black/5">
            <h3 className="font-display text-xl text-ink">{t('contact.office')}</h3>
            <div className="mt-4 space-y-3 text-sm text-ink/80">
              <p>Aneka Karya — Export Division<br />Jl. Pandanaran, Boyolali, Central Java 57311, Indonesia</p>
              <p><span className="font-semibold">Email:</span> export@anekakarya.id</p>
              <p><span className="font-semibold">WhatsApp:</span> +62 812-0000-0000</p>
              <p><span className="font-semibold">Hours:</span> Mon–Fri, 08:00–16:00 WIB</p>
            </div>
            <button
              onClick={() => open()}
              className="mt-6 btn btn-primary"
            >
              {t('nav.inquiry')}
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
            <iframe
              title="Boyolali map"
              className="h-full min-h-80 w-full"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=110.55%2C-7.55%2C110.66%2C-7.48&layer=mapnik&marker=-7.5316%2C110.5967"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
