import { Link } from 'react-router-dom'
import { Img, Reveal, SectionHead } from '../components/ui'
import { Icon } from '../components/icons'
import { guarantees, stats } from '../data'
import { useI18n } from '../i18n'

export default function About() {
  const { t, tl } = useI18n()
  return (
    <div>
      {/* hero */}
      <div className="relative h-[56vh] min-h-[22rem] w-full overflow-hidden">
        <Img src="/photos/highlands-b.jpg" alt="Boyolali" accent="forest" label="Boyolali highlands" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/45" />
        <div className="container-x absolute inset-0 flex flex-col justify-center">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-px w-7 bg-leaf-soft" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-leaf-soft">
                {t('about.kicker')}
              </span>
            </div>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">{t('about.title')}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{t('about.lead')}</p>
          </div>
        </div>
      </div>

      {/* who we are */}
      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHead
              kicker={tl({ en: 'Who we are', id: 'Siapa kami' })}
              title={tl({ en: 'A bridge, not a middleman', id: 'Jembatan, bukan perantara' })}
            />
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              {tl({
                en: 'Aneka Karya is the export arm of a Boyolali regional enterprise (BUMD) — a public-purpose bridge that helps small producers reach international buyers without losing what makes their work special.',
                id: 'Aneka Karya adalah lengan ekspor perusahaan daerah (BUMD) Boyolali — jembatan berorientasi publik yang membantu produsen kecil menjangkau pembeli internasional tanpa kehilangan keistimewaan karyanya.',
              })}
            </p>
            <p>
              {tl({
                en: 'World-class craft and produce from Boyolali rarely reached global markets, because exporting is complex. We take on that complexity — certification, quality control, documentation, consolidation and logistics — so producers can focus on what they do best.',
                id: 'Karya dan hasil kelas dunia dari Boyolali jarang sampai ke pasar global karena ekspor itu rumit. Kami menangani kerumitan itu — sertifikasi, kontrol mutu, dokumentasi, konsolidasi, dan logistik — agar produsen fokus pada keahliannya.',
              })}
            </p>
          </Reveal>
        </div>
      </section>

      {/* mission / vision */}
      <section className="container-x pb-4">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_16px_-12px_rgba(31,42,36,0.2)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10 text-forest">
              <Icon name="target" className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl text-ink">{t('about.mission.t')}</h2>
            <p className="mt-3 text-muted">{t('about.mission.d')}</p>
          </Reveal>
          <Reveal delay={100} className="rounded-3xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_16px_-12px_rgba(31,42,36,0.2)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean/12 text-ocean">
              <Icon name="globe" className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl text-ink">{t('about.vision.t')}</h2>
            <p className="mt-3 text-muted">{t('about.vision.d')}</p>
          </Reveal>
        </div>
      </section>

      {/* stats */}
      <section className="mt-20 bg-ink text-white">
        <div className="container-x grid grid-cols-2 gap-6 py-14 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <div className="font-display text-4xl sm:text-5xl">{s.value}</div>
              <div className="mt-1 text-sm text-white/70">{tl(s.label)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* what we handle */}
      <section className="bg-paper py-20">
        <div className="container-x">
          <Reveal>
            <SectionHead
              kicker={t('guar.kicker')}
              title={tl({ en: 'What we handle for you', id: 'Yang kami tangani untuk Anda' })}
              sub={t('guar.sub')}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="h-full rounded-3xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/10 text-forest">
                    <Icon name={g.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg text-ink">{tl(g.title)}</h3>
                  <p className="mt-2 text-sm text-muted">{tl(g.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* governance narrative + image */}
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-3xl border border-black/[0.06] shadow-[0_4px_30px_-16px_rgba(31,42,36,0.4)]">
          <Img src="/photos/seaport.jpg" alt="Export" accent="ocean" label="Export logistics" className="aspect-4/3 h-full w-full object-cover" />
        </Reveal>
        <Reveal delay={100}>
          <SectionHead
            kicker={tl({ en: 'Governance', id: 'Tata kelola' })}
            title={tl({ en: 'Public-backed, commercially run', id: 'Didukung publik, dikelola komersial' })}
          />
          <p className="mt-5 text-lg leading-relaxed text-ink/80">
            {tl({
              en: 'Backed by the regional government, we combine public accountability with commercial discipline. Producers keep their craft and identity; we take on the hard parts of exporting — certification guidance, quality control, documentation, consolidation and logistics.',
              id: 'Didukung pemerintah daerah, kami memadukan akuntabilitas publik dengan disiplin komersial. Produsen tetap memegang karya dan identitasnya; kami menangani bagian sulit ekspor — pendampingan sertifikasi, kontrol mutu, dokumentasi, konsolidasi, dan logistik.',
            })}
          </p>
          <ul className="mt-6 space-y-3">
            {[
              { en: 'Registered regional enterprise (BUMD)', id: 'Perusahaan daerah terdaftar (BUMD)' },
              { en: 'Transparent, producer-first terms', id: 'Syarat transparan, mengutamakan produsen' },
              { en: 'Export licenses & documentation in-house', id: 'Izin ekspor & dokumentasi ditangani sendiri' },
            ].map((li, i) => (
              <li key={i} className="flex items-start gap-3 text-ink/80">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                {tl(li)}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-x pb-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-br from-forest to-ocean px-8 py-12 text-center text-white sm:flex-row sm:px-14 sm:text-left">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">{t('cta.title')}</h2>
            <p className="mt-2 max-w-md text-white/85">{t('cta.sub')}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/catalog" className="btn btn-ondark">{t('hero.cta1')}</Link>
            <Link to="/contact" className="btn btn-secondary">{t('nav.contact')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
