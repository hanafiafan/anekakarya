import { Reveal, SectionHead } from '../components/ui'
import { Icon } from '../components/icons'
import { useRfq } from '../components/rfq'
import { useI18n } from '../i18n'

export default function HowItWorks() {
  const { t } = useI18n()
  const { open } = useRfq()
  const steps = [1, 2, 3, 4]
  const icons = ['search', 'box', 'factory', 'ship']

  return (
    <div className="pt-28">
      <div className="container-x">
        <SectionHead kicker={t('how.kicker')} title={t('how.title')} center />

        <div className="mx-auto mt-14 max-w-4xl">
          <ol className="relative space-y-8 before:absolute before:left-[27px] before:top-4 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-leaf/25 sm:before:left-1/2">
            {steps.map((n, i) => (
              <Reveal
                as="li"
                key={n}
                delay={i * 80}
                className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                  i % 2 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 sm:px-8">
                  <div className={`rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 ${i % 2 ? 'sm:text-right' : ''}`}>
                    <div className="text-xs font-bold uppercase tracking-wider text-leaf">
                      Step 0{n}
                    </div>
                    <h3 className="mt-1 font-display text-xl text-ink">{t(`how.${n}.t`)}</h3>
                    <p className="mt-2 text-sm text-muted">{t(`how.${n}.d`)}</p>
                  </div>
                </div>
                <div className="absolute left-0 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-lg sm:left-1/2 sm:-translate-x-1/2">
                  <Icon name={icons[i]} className="h-6 w-6" />
                </div>
                <div className="hidden flex-1 sm:block" />
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => open()}
            className="btn btn-primary btn-lg"
          >
            {t('nav.inquiry')}
          </button>
        </div>
      </div>
    </div>
  )
}
