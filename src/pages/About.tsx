import { Img, Reveal, SectionHead } from '../components/ui'
import { stats } from '../data'
import { useI18n } from '../i18n'

export default function About() {
  const { t, tl } = useI18n()
  return (
    <div>
      {/* hero */}
      <div className="relative h-[52vh] min-h-80 w-full overflow-hidden">
        <Img src="/photos/highlands-b.jpg" alt="Boyolali" accent="forest" label="Boyolali highlands" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40" />
        <div className="container-x absolute inset-0 flex flex-col justify-center">
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-leaf-soft">
              {t('about.kicker')}
            </div>
            <h1 className="font-display text-4xl text-white sm:text-5xl">{t('about.title')}</h1>
            <p className="mt-4 max-w-xl text-white/85">{t('about.lead')}</p>
          </div>
        </div>
      </div>

      {/* mission / vision */}
      <section className="container-x py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-3xl bg-white p-8 ring-1 ring-black/5">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/12 text-xl">🎯</div>
            <h2 className="font-display text-2xl text-ink">{t('about.mission.t')}</h2>
            <p className="mt-3 text-muted">{t('about.mission.d')}</p>
          </Reveal>
          <Reveal delay={100} className="rounded-3xl bg-white p-8 ring-1 ring-black/5">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean/12 text-xl">🌏</div>
            <h2 className="font-display text-2xl text-ink">{t('about.vision.t')}</h2>
            <p className="mt-3 text-muted">{t('about.vision.d')}</p>
          </Reveal>
        </div>
      </section>

      {/* stats */}
      <section className="bg-ink text-white">
        <div className="container-x grid grid-cols-2 gap-6 py-14 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <div className="font-display text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-white/70">{tl(s.label)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* narrative + image */}
      <section className="container-x grid items-center gap-10 py-20 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-3xl">
          <Img src="/photos/seaport.jpg" alt="Export" accent="ocean" label="Export logistics" className="aspect-4/3 h-full w-full object-cover" />
        </Reveal>
        <Reveal delay={100}>
          <SectionHead title={t('about.kicker')} />
          <p className="mt-4 text-ink/80">{tl({
            en: 'Backed by the regional government, we combine public accountability with commercial discipline. Producers keep their craft and identity; we take on the hard parts of exporting — certification guidance, quality control, documentation, consolidation and logistics.',
            id: 'Didukung pemerintah daerah, kami memadukan akuntabilitas publik dengan disiplin komersial. Produsen tetap memegang karya dan identitasnya; kami menangani bagian sulit ekspor — pendampingan sertifikasi, kontrol mutu, dokumentasi, konsolidasi, dan logistik.',
          })}</p>
        </Reveal>
      </section>
    </div>
  )
}
