import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img, Reveal, SectionHead } from '../components/ui'
import { articles } from '../data'
import { useI18n } from '../i18n'
import { useSeo } from '../lib/seo'

export default function Insights() {
  const { t, tl } = useI18n()
  useSeo({ title: t('ins.title'), description: t('ins.sub'), path: '/insights' })
  const [tag, setTag] = useState<string>('all')

  const tags = Array.from(new Set(articles.map((a) => a.tag.en)))
  const list = tag === 'all' ? articles : articles.filter((a) => a.tag.en === tag)
  const [featured, ...rest] = list

  return (
    <div className="pt-28">
      <div className="container-x pb-20">
        <SectionHead kicker={t('ins.kicker')} title={t('ins.title')} sub={t('ins.sub')} />

        {/* tag filter */}
        <div className="mt-8 flex flex-wrap gap-1.5">
          <TagChip active={tag === 'all'} onClick={() => setTag('all')}>
            {t('catalog.all')}
          </TagChip>
          {tags.map((tg) => {
            const label = articles.find((a) => a.tag.en === tg)!.tag
            return (
              <TagChip key={tg} active={tag === tg} onClick={() => setTag(tg)}>
                {tl(label)}
              </TagChip>
            )
          })}
        </div>

        {/* featured */}
        {featured && (
          <Reveal>
            <Link
              to={`/insights/${featured.slug}`}
              className="group mt-8 grid overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_2px_20px_-12px_rgba(31,42,36,0.25)] transition hover:shadow-xl lg:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Img
                  src={featured.photo}
                  alt={tl(featured.title)}
                  label={tl(featured.tag)}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-leaf/10 px-2.5 py-1 font-semibold text-forest">
                    {tl(featured.tag)}
                  </span>
                  <span className="text-muted">
                    {featured.readMins} {t('ins.min')}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink">{tl(featured.title)}</h2>
                <p className="mt-3 text-muted">{tl(featured.excerpt)}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest">
                  {t('ins.read')} →
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* grid */}
        {rest.length > 0 && (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 60}>
                <Link
                  to={`/insights/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_2px_16px_-12px_rgba(31,42,36,0.2)] transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <Img
                      src={a.photo}
                      alt={tl(a.title)}
                      label={tl(a.tag)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-leaf/10 px-2.5 py-1 font-semibold text-forest">{tl(a.tag)}</span>
                      <span className="text-muted">
                        {a.readMins} {t('ins.min')}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl leading-snug text-ink">{tl(a.title)}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted">{tl(a.excerpt)}</p>
                    <span className="mt-4 text-sm font-semibold text-forest">{t('ins.read')} →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TagChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? 'bg-forest text-white shadow-[0_6px_16px_-8px_rgba(200,50,44,0.7)]'
          : 'bg-cream text-ink/70 ring-1 ring-black/[0.06] hover:bg-white hover:ring-black/10'
      }`}
    >
      {children}
    </button>
  )
}
