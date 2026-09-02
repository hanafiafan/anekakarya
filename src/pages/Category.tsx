import { Link, useParams } from 'react-router-dom'
import { ProductCard, UmkmCard } from '../components/cards'
import { Img } from '../components/ui'
import { byCategory, categoryBySlug, umkmsByCategory } from '../data'
import { useI18n } from '../i18n'

export default function Category() {
  const { slug = '' } = useParams()
  const { t, tl } = useI18n()
  const c = categoryBySlug(slug)

  if (!c) return <NotFoundish />

  const ums = umkmsByCategory(slug)
  const prods = byCategory(slug)

  return (
    <div>
      {/* hero */}
      <div className="relative h-[46vh] min-h-72 w-full overflow-hidden">
        <Img
          src={c.photo}
          alt={tl(c.name)}
          accent={c.accent}
          label={tl(c.name)}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/20" />
        <div className="container-x absolute inset-0 flex flex-col justify-end pb-10">
          <Link to="/catalog" className="mb-3 text-sm text-white/80 hover:text-white">
            ← {t('nav.catalog')}
          </Link>
          <h1 className="font-display text-4xl text-white sm:text-5xl">{tl(c.name)}</h1>
          <p className="mt-2 max-w-xl text-white/85">{tl(c.tagline)}</p>
        </div>
      </div>

      <div className="container-x py-16">
        <h2 className="font-display text-2xl text-ink">{t('catalog.producers')}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ums.map((u) => (
            <UmkmCard key={u.slug} u={u} />
          ))}
        </div>

        {prods.length > 0 && (
          <>
            <h2 className="mt-16 font-display text-2xl text-ink">{t('catalog.products')}</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {prods.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function NotFoundish() {
  const { t } = useI18n()
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
      <h1 className="font-display text-3xl text-ink">{t('nf.title')}</h1>
      <Link to="/catalog" className="mt-4 text-leaf hover:text-forest">
        ← {t('nav.catalog')}
      </Link>
    </div>
  )
}
