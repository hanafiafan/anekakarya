import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useI18n, type Lang } from '../i18n'
import { useRfq } from './rfq'
import { useInquiry } from './inquiry'

function Logo({ light = false }: { light?: boolean }) {
  const tile = light ? '#ffffff' : '#C8322C'
  const mark = light ? '#C8322C' : '#ffffff'
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden>
        <rect width="64" height="64" rx="15" fill={tile} />
        <path d="M19 46 L32 17 L45 46" fill="none" stroke={mark} strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.5 35.5 H39.5" fill="none" stroke={mark} strokeWidth="5.4" strokeLinecap="round" />
        <path d="M15 51 Q32 58 49 51" fill="none" stroke={mark} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </svg>
      <span className={`font-sans text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        Aneka&nbsp;<span className={light ? 'text-white/85' : 'text-forest'}>Karya</span>
      </span>
    </Link>
  )
}

function LangToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div className="flex items-center rounded-full bg-black/5 p-0.5 text-xs font-semibold">
      {(['en', 'id'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition ${
            lang === l ? 'bg-white text-forest shadow-sm' : 'text-muted'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function Navbar() {
  const { t } = useI18n()
  const { open } = useRfq()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const loc = useLocation()
  const onHome = loc.pathname === '/'

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setMenu(false), [loc.pathname])

  const solid = scrolled || !onHome
  const { count } = useInquiry()
  const links = [
    { to: '/catalog', label: t('nav.catalog') },
    { to: '/insights', label: t('nav.insights') },
    { to: '/how-it-works', label: t('nav.how') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        solid ? 'bg-paper/85 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Logo light={!solid} />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => {
                const base =
                  'relative pb-1 text-sm font-medium transition after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:transition-all after:duration-300 hover:after:w-full'
                const color = solid
                  ? isActive
                    ? 'text-forest'
                    : 'text-ink/70 hover:text-forest'
                  : 'text-white/85 hover:text-white'
                const underline = `${solid ? 'after:bg-forest' : 'after:bg-white'} ${isActive ? 'after:w-full' : 'after:w-0'}`
                return `${base} ${color} ${underline}`
              }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <Link
            to="/inquiry"
            className={`relative flex h-9 w-9 items-center justify-center rounded-full transition ${
              solid ? 'text-ink hover:bg-cream' : 'text-white hover:bg-white/15'
            }`}
            aria-label={t('inq.title')}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16l-1.5 11a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 6zM9 6V4.5A2.5 2.5 0 0 1 11.5 2h1A2.5 2.5 0 0 1 15 4.5V6" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terra px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => open()}
            className="hidden btn btn-primary btn-sm sm:inline-flex"
          >
            {t('nav.inquiry')}
          </button>
          <button
            className={`md:hidden ${solid ? 'text-ink' : 'text-white'}`}
            onClick={() => setMenu((m) => !m)}
            aria-label="Menu"
          >
            {menu ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menu && (
        <div className="border-t border-black/5 bg-paper px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="text-sm font-medium text-ink">
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/faq" className="text-sm font-medium text-ink">{t('nav.faq')}</NavLink>
            <NavLink to="/register-umkm" className="text-sm font-medium text-ink">{t('nav.register')}</NavLink>
            <button
              onClick={() => open()}
              className="mt-2 btn btn-primary"
            >
              {t('nav.inquiry')}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-white/60">{t('footer.tagline')}</p>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-white/50">
            {t('footer.explore')}
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/catalog" className="hover:text-white">{t('nav.catalog')}</Link></li>
            <li><Link to="/insights" className="hover:text-white">{t('nav.insights')}</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white">{t('nav.how')}</Link></li>
            <li><Link to="/faq" className="hover:text-white">{t('nav.faq')}</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-white/50">
            {t('footer.company')}
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">{t('nav.about')}</Link></li>
            <li><Link to="/register-umkm" className="hover:text-white">{t('nav.register')}</Link></li>
            <li><Link to="/contact" className="hover:text-white">{t('nav.contact')}</Link></li>
            <li className="text-white/60">export@anekakarya.id</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Aneka Karya. {t('footer.rights')}</span>
          <span>Boyolali → The World</span>
        </div>
      </div>
    </footer>
  )
}

function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setW(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-forest via-terra to-sun transition-[width] duration-150"
        style={{ width: `${w}%` }}
      />
    </div>
  )
}

function InquiryToast() {
  const { toast } = useInquiry()
  const { t } = useI18n()
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Link
        to="/inquiry"
        className="flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-xl"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf text-xs">✓</span>
        {t('inq.toast')}
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{t('inq.view')} →</span>
      </Link>
    </div>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-white shadow-[0_10px_26px_-10px_rgba(200,50,44,0.7)] transition-all duration-300 hover:bg-leaf ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}

export default function Layout() {
  const loc = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loc.pathname])
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <div key={loc.pathname} className="page-fade">
          <Outlet />
        </div>
      </main>
      <Footer />
      <InquiryToast />
      <BackToTop />
    </div>
  )
}
