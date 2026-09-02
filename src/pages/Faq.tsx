import { useState } from 'react'
import { SectionHead } from '../components/ui'
import { useRfq } from '../components/rfq'
import { faqs } from '../data'
import { useI18n } from '../i18n'

export default function Faq() {
  const { t, tl } = useI18n()
  const { open } = useRfq()
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="pt-28">
      <div className="container-x pb-20">
        <SectionHead kicker={t('faq.kicker')} title={t('faq.title')} sub={t('faq.sub')} center />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-black/5 overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-cream/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-ink">{tl(f.q)}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf/10 text-forest transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted">{tl(f.a)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted">{t('faq.cta')}</p>
          <button
            onClick={() => open()}
            className="mt-4 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white transition hover:bg-leaf"
          >
            {t('nav.inquiry')}
          </button>
        </div>
      </div>
    </div>
  )
}
