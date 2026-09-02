import { Link, useParams } from 'react-router-dom'
import { Img } from '../components/ui'
import { articleBySlug, articles } from '../data'
import { useI18n } from '../i18n'

export default function Article() {
  const { slug = '' } = useParams()
  const { t, tl, lang } = useI18n()
  const a = articleBySlug(slug)

  if (!a)
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-3xl text-ink">{t('nf.title')}</h1>
        <Link to="/insights" className="mt-4 text-leaf">← {t('nav.insights')}</Link>
      </div>
    )

  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 2)
  const dateStr = new Date(a.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="pt-16">
      <article className="container-x max-w-3xl py-12">
        <Link to="/insights" className="text-sm text-muted hover:text-forest">← {t('nav.insights')}</Link>
        <div className="mt-6 flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-leaf/10 px-2.5 py-1 font-semibold text-forest">{tl(a.tag)}</span>
          <span>{dateStr}</span>
          <span>· {a.readMins} {t('ins.min')}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink">{tl(a.title)}</h1>
        <div className="mt-8 overflow-hidden rounded-3xl">
          <Img src={a.photo} alt={tl(a.title)} label={tl(a.tag)} className="aspect-16/9 h-full w-full object-cover" />
        </div>
        <p className="mt-8 text-lg leading-relaxed text-ink/85">{tl(a.excerpt)}</p>
        <p className="mt-5 leading-relaxed text-ink/80">{tl(a.body)}</p>
      </article>

      <div className="container-x max-w-3xl border-t border-black/5 py-12">
        <h2 className="font-display text-2xl text-ink">{t('ins.more')}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {more.map((m) => (
            <Link key={m.slug} to={`/insights/${m.slug}`} className="group rounded-2xl bg-white p-5 ring-1 ring-black/5 transition hover:shadow-md">
              <span className="text-xs font-semibold text-leaf">{tl(m.tag)}</span>
              <h3 className="mt-1 font-display text-lg text-ink group-hover:text-forest">{tl(m.title)}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
