import { Route, Routes, Link } from 'react-router-dom'
import Layout from './components/Layout'
import { RfqProvider } from './components/rfq'
import { InquiryProvider } from './components/inquiry'
import { useI18n } from './i18n'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Category from './pages/Category'
import Umkm from './pages/Umkm'
import Product from './pages/Product'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Inquiry from './pages/Inquiry'
import Insights from './pages/Insights'
import Article from './pages/Article'
import RegisterUmkm from './pages/RegisterUmkm'

function NotFound() {
  const { t } = useI18n()
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
      <div className="font-display text-7xl text-forest">404</div>
      <h1 className="mt-4 font-display text-2xl text-ink">{t('nf.title')}</h1>
      <Link to="/" className="mt-6 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white">
        {t('nf.home')}
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <InquiryProvider>
      <RfqProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="catalog/:slug" element={<Category />} />
            <Route path="umkm/:slug" element={<Umkm />} />
            <Route path="product/:slug" element={<Product />} />
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="insights" element={<Insights />} />
            <Route path="insights/:slug" element={<Article />} />
            <Route path="register-umkm" element={<RegisterUmkm />} />
            <Route path="about" element={<About />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RfqProvider>
    </InquiryProvider>
  )
}
