import { useInquiry } from './inquiry'
import { Icon } from './icons'
import { useI18n } from '../i18n'

export function AddToInquiry({
  slug,
  qty = 1,
  variant = 'full',
}: {
  slug: string
  qty?: number
  variant?: 'full' | 'icon'
}) {
  const { add, has } = useInquiry()
  const { t } = useI18n()
  const inList = has(slug)

  if (variant === 'icon') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          add(slug, qty)
        }}
        title={inList ? t('inq.inList') : t('inq.add')}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
          inList ? 'bg-leaf/15 text-forest' : 'bg-cream text-ink/70 hover:bg-forest hover:text-white'
        }`}
        aria-label={t('inq.add')}
      >
        <Icon name={inList ? 'check' : 'plus'} className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      onClick={() => add(slug, qty)}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
        inList
          ? 'bg-leaf/15 text-forest ring-1 ring-leaf/30'
          : 'bg-white text-forest ring-1 ring-forest/25 hover:bg-forest hover:text-white'
      }`}
    >
      <Icon name={inList ? 'check' : 'plus'} className="h-4 w-4" />
      {inList ? t('inq.inList') : t('inq.add')}
    </button>
  )
}
