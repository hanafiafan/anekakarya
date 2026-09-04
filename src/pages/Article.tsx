import { Link, useParams } from 'react-router-dom'
import { Img } from '../components/ui'
import { articleBySlug, articles } from '../data'
import { useI18n } from '../i18n'
import { SITE, useSeo } from '../lib/seo'

export default function Article() {
  const { slug = '' } = useParams()
  const { t, tl, lang } = useI18n()
  const a = articleBySlug(slug)

  useSeo(
    a
      ? {
          title: tl(a.title),
          description: tl(a.excerpt),
          image: a.photo,
          path: `/insights/${slug}`,
          type: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: tl(a.title),
            image: `${SITE}${a.photo}`,
            datePublished: a.date,
            description: tl(a.excerpt),
            author: { '@type': 'Organization', name: 'Aneka Karya' },
            publisher: { '@type': 'Organization', name: 'Aneka Karya' },
          },
        }
      : { title: 'Not found', path: `/insights/${slug}` },
  )

  if (!a)
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-3xl text-ink">{t('nf.title')}</h1>
        <Link to="/insights" className="mt-4 text-leaf">← {t('nav.insights')}</Link>
      </div>
    )

  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3)
  const dateStr = new Date(a.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="pt-24">
      <div className="container-x">
        <Link to="/insights" className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-forest">
          ← {t('nav.insights')}
        </Link>

        {/* header */}
        <header className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="rounded-full bg-leaf/10 px-2.5 py-1 font-semibold text-forest">{tl(a.tag)}</span>
            <span className="text-muted">{dateStr}</span>
            <span className="text-black/25">·</span>
            <span className="text-muted">{a.readMins} {t('ins.min')}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl leading-[1.08] text-ink sm:text-5xl">{tl(a.title)}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{tl(a.excerpt)}</p>
        </header>

        {/* hero image */}
        <figure className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_4px_30px_-16px_rgba(31,42,36,0.4)]">
          <Img src={a.photo} alt={tl(a.title)} label={tl(a.tag)} className="aspect-[16/8] h-full w-full object-cover" />
        </figure>

        {/* body */}
        <div className="mx-auto mt-12 max-w-2xl">
          <p className="text-lg leading-[1.85] text-ink/85 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.72] first-letter:text-forest">
            {tl(a.body)}
          </p>

          {/* end note */}
          <div className="mt-12 rounded-2xl border border-black/[0.06] bg-paper p-6 text-center">
            <p className="text-sm text-muted">{t('ins.endnote')}</p>
            <Link to="/catalog" className="btn btn-primary mt-4">
              {t('hero.cta1')}
            </Link>
          </div>
        </div>
      </div>

      {/* more insights */}
      <div className="mt-20 border-t border-black/[0.06] bg-paper py-16">
        <div className="container-x">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-px w-7 bg-forest/60" />
            <h2 className="font-display text-2xl text-ink">{t('ins.more')}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {more.map((m) => (
              <Link
                key={m.slug}
                to={`/insights/${m.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_16px_-12px_rgba(31,42,36,0.2)] transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <Img src={m.photo} alt={tl(m.title)} label={tl(m.tag)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-forest">{tl(m.tag)}</span>
                  <h3 className="mt-1 font-display text-lg leading-snug text-ink">{tl(m.title)}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
