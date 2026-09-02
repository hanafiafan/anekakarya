import { Link } from 'react-router-dom'
import { Img, Reveal, SectionHead } from '../components/ui'
import { articles } from '../data'
import { useI18n } from '../i18n'

export default function Insights() {
  const { t, tl } = useI18n()
  return (
    <div className="pt-28">
      <div className="container-x pb-20">
        <SectionHead kicker={t('ins.kicker')} title={t('ins.title')} sub={t('ins.sub')} />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <Link
                to={`/insights/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-xl"
              >
                <div className="aspect-16/10 overflow-hidden">
                  <Img src={a.photo} alt={tl(a.title)} label={tl(a.tag)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="rounded-full bg-leaf/10 px-2.5 py-1 font-semibold text-forest">{tl(a.tag)}</span>
                    <span>{a.readMins} {t('ins.min')}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-snug text-ink">{tl(a.title)}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{tl(a.excerpt)}</p>
                  <span className="mt-4 text-sm font-semibold text-leaf">{t('ins.read')} →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
