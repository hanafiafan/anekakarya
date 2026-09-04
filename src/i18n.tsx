import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { L } from './data'

export type Lang = 'en' | 'id'

type Dict = Record<string, L>

// UI strings. Content strings live in data.ts.
export const dict: Dict = {
  'nav.catalog': { en: 'Catalog', id: 'Katalog' },
  'nav.about': { en: 'About', id: 'Tentang' },
  'nav.how': { en: 'How it works', id: 'Cara Kerja' },
  'nav.contact': { en: 'Contact', id: 'Kontak' },
  'nav.inquiry': { en: 'Request a quote', id: 'Ajukan Penawaran' },

  'hero.kicker': { en: 'Boyolali → The World', id: 'Boyolali → Dunia' },
  'hero.title': {
    en: 'Export-ready craft from the highlands of Boyolali.',
    id: 'Karya siap ekspor dari dataran tinggi Boyolali.',
  },
  'hero.sub': {
    en: 'A trusted gateway connecting verified UMKM producers with buyers around the world — dairy, copper craft, textiles and more.',
    id: 'Gerbang tepercaya yang menghubungkan UMKM terverifikasi dengan pembeli di seluruh dunia — susu, kerajinan tembaga, tekstil, dan lainnya.',
  },
  'hero.cta1': { en: 'Explore the catalog', id: 'Jelajahi katalog' },
  'hero.cta2': { en: 'Scroll to see the journey', id: 'Scroll untuk lihat perjalanannya' },

  'story.1.t': { en: 'It starts in Boyolali', id: 'Bermula di Boyolali' },
  'story.1.d': {
    en: 'Green highlands on the slopes of Mount Merapi, where our producers grow, craft and create.',
    id: 'Dataran tinggi hijau di lereng Gunung Merapi, tempat produsen kami menanam dan berkarya.',
  },
  'story.2.t': { en: 'Consolidated & quality-checked', id: 'Dikonsolidasi & dicek mutu' },
  'story.2.d': {
    en: 'Goods are gathered, inspected and packed to export standard in our partner warehouses.',
    id: 'Produk dikumpulkan, diperiksa, dan dikemas sesuai standar ekspor di gudang mitra kami.',
  },
  'story.3.t': { en: 'Shipped to the port', id: 'Dikirim ke pelabuhan' },
  'story.3.d': {
    en: 'Containers move to the seaport, where cranes load them onto ocean-going cargo ships.',
    id: 'Kontainer menuju pelabuhan, tempat crane memuatnya ke kapal kargo samudra.',
  },
  'story.4.t': { en: 'Across the ocean', id: 'Menyeberangi samudra' },
  'story.4.d': {
    en: 'Every shipment is tracked, documented and insured on its way to your market.',
    id: 'Setiap kiriman dilacak, didokumentasikan, dan diasuransikan menuju pasar Anda.',
  },
  'story.5.t': { en: 'To the whole world', id: 'Ke seluruh dunia' },
  'story.5.d': {
    en: 'From one regency in Central Java to ports across 18 countries — and growing.',
    id: 'Dari satu kabupaten di Jawa Tengah ke pelabuhan di 18 negara — dan terus bertambah.',
  },

  'cats.title': { en: 'Product categories', id: 'Kategori produk' },
  'cats.sub': {
    en: 'Curated clusters of Boyolali’s finest export-ready producers.',
    id: 'Klaster pilihan produsen terbaik Boyolali yang siap ekspor.',
  },
  'featured.title': { en: 'Featured producers', id: 'Produsen unggulan' },
  'featured.sub': {
    en: 'Verified UMKM with the capacity and certifications to serve global buyers.',
    id: 'UMKM terverifikasi dengan kapasitas dan sertifikasi untuk melayani pembeli global.',
  },

  'why.title': { en: 'Why buyers trust Aneka Karya', id: 'Mengapa pembeli percaya Aneka Karya' },
  'why.1.t': { en: 'Verified producers', id: 'Produsen terverifikasi' },
  'why.1.d': {
    en: 'Every UMKM is vetted for legality, capacity and certification before listing.',
    id: 'Setiap UMKM diperiksa legalitas, kapasitas, dan sertifikasinya sebelum tampil.',
  },
  'why.2.t': { en: 'Export handled', id: 'Ekspor ditangani' },
  'why.2.d': {
    en: 'Documentation, consolidation and logistics coordinated by the regional agency.',
    id: 'Dokumentasi, konsolidasi, dan logistik dikoordinasikan oleh perusda.',
  },
  'why.3.t': { en: 'One point of contact', id: 'Satu titik kontak' },
  'why.3.d': {
    en: 'Deal with a single trusted partner instead of dozens of small workshops.',
    id: 'Berurusan dengan satu mitra tepercaya, bukan puluhan bengkel kecil.',
  },

  'cta.title': { en: 'Ready to source from Boyolali?', id: 'Siap sourcing dari Boyolali?' },
  'cta.sub': {
    en: 'Send a request for quote and our export team will respond within 2 business days.',
    id: 'Kirim permintaan penawaran dan tim ekspor kami merespons dalam 2 hari kerja.',
  },

  'catalog.title': { en: 'Catalog', id: 'Katalog' },
  'catalog.sub': {
    en: 'Browse producers and products by category.',
    id: 'Telusuri produsen dan produk berdasarkan kategori.',
  },
  'catalog.all': { en: 'All', id: 'Semua' },
  'catalog.producers': { en: 'Producers', id: 'Produsen' },
  'catalog.products': { en: 'Products', id: 'Produk' },
  'label.since': { en: 'Since', id: 'Sejak' },
  'label.capacity': { en: 'Capacity', id: 'Kapasitas' },
  'label.moq': { en: 'MOQ', id: 'MOQ' },
  'label.leadtime': { en: 'Lead time', id: 'Waktu produksi' },
  'label.certs': { en: 'Certifications', id: 'Sertifikasi' },
  'label.languages': { en: 'Languages', id: 'Bahasa' },
  'label.hscode': { en: 'HS Code', id: 'Kode HS' },
  'label.price': { en: 'Price', id: 'Harga' },
  'label.producer': { en: 'Producer', id: 'Produsen' },
  'label.specs': { en: 'Specifications', id: 'Spesifikasi' },
  'label.products': { en: 'Products', id: 'Produk' },
  'btn.viewProfile': { en: 'View profile', id: 'Lihat profil' },
  'btn.viewProduct': { en: 'View product', id: 'Lihat produk' },
  'btn.rfq': { en: 'Request quote', id: 'Ajukan penawaran' },
  'btn.back': { en: 'Back', id: 'Kembali' },

  'rfq.title': { en: 'Request for Quote', id: 'Permintaan Penawaran' },
  'rfq.sub': {
    en: 'Tell us what you need. No account required.',
    id: 'Sampaikan kebutuhan Anda. Tanpa perlu akun.',
  },
  'rfq.product': { en: 'Product of interest', id: 'Produk yang diminati' },
  'rfq.name': { en: 'Your name', id: 'Nama Anda' },
  'rfq.company': { en: 'Company', id: 'Perusahaan' },
  'rfq.country': { en: 'Country', id: 'Negara' },
  'rfq.email': { en: 'Email', id: 'Email' },
  'rfq.qty': { en: 'Estimated quantity', id: 'Perkiraan kuantitas' },
  'rfq.message': { en: 'Message', id: 'Pesan' },
  'rfq.send': { en: 'Send request', id: 'Kirim permintaan' },
  'rfq.sending': { en: 'Sending…', id: 'Mengirim…' },
  'rfq.done.t': { en: 'Request received', id: 'Permintaan diterima' },
  'rfq.done.d': {
    en: 'Thank you. Our export team will reach out within 2 business days.',
    id: 'Terima kasih. Tim ekspor kami akan menghubungi dalam 2 hari kerja.',
  },
  'rfq.close': { en: 'Close', id: 'Tutup' },

  'about.kicker': { en: 'The Regional Agency', id: 'Perusahaan Daerah' },
  'about.title': {
    en: 'A public gateway built to take Boyolali global.',
    id: 'Gerbang publik untuk membawa Boyolali mendunia.',
  },
  'about.lead': {
    en: 'Aneka Karya is the export arm of the regional enterprise — a bridge between local UMKM and international buyers, backed by regional government.',
    id: 'Aneka Karya adalah lengan ekspor perusahaan daerah — jembatan antara UMKM lokal dan pembeli internasional, didukung pemerintah daerah.',
  },
  'about.mission.t': { en: 'Our mission', id: 'Misi kami' },
  'about.mission.d': {
    en: 'Open global markets for Boyolali’s producers while safeguarding quality, fairness and heritage.',
    id: 'Membuka pasar global bagi produsen Boyolali sambil menjaga mutu, keadilan, dan warisan.',
  },
  'about.vision.t': { en: 'Our vision', id: 'Visi kami' },
  'about.vision.d': {
    en: 'A recognised origin brand where “Made in Boyolali” signals trust worldwide.',
    id: 'Merek asal yang diakui, di mana “Buatan Boyolali” menandakan kepercayaan di dunia.',
  },

  'how.kicker': { en: 'How it works', id: 'Cara kerja' },
  'how.title': { en: 'From workshop to world, in four steps', id: 'Dari bengkel ke dunia, dalam empat langkah' },
  'how.1.t': { en: 'Discover & inquire', id: 'Temukan & tanyakan' },
  'how.1.d': { en: 'Browse verified producers and send a request for quote.', id: 'Telusuri produsen terverifikasi dan kirim permintaan penawaran.' },
  'how.2.t': { en: 'Sampling & terms', id: 'Sampel & kesepakatan' },
  'how.2.d': { en: 'We coordinate samples, pricing and Incoterms with the producer.', id: 'Kami koordinasikan sampel, harga, dan Incoterms dengan produsen.' },
  'how.3.t': { en: 'Production & QC', id: 'Produksi & QC' },
  'how.3.d': { en: 'Orders are produced and quality-checked to export standard.', id: 'Pesanan diproduksi dan dicek mutu sesuai standar ekspor.' },
  'how.4.t': { en: 'Export & delivery', id: 'Ekspor & pengiriman' },
  'how.4.d': { en: 'We handle documents, consolidation and shipping to your port.', id: 'Kami urus dokumen, konsolidasi, dan pengiriman ke pelabuhan Anda.' },

  'contact.title': { en: 'Contact us', id: 'Hubungi kami' },
  'contact.sub': {
    en: 'Talk to the export team directly.',
    id: 'Bicara langsung dengan tim ekspor.',
  },
  'contact.office': { en: 'Office', id: 'Kantor' },

  'footer.tagline': {
    en: 'Export platform for Boyolali’s UMKM.',
    id: 'Platform ekspor untuk UMKM Boyolali.',
  },
  'footer.rights': { en: 'All rights reserved.', id: 'Hak cipta dilindungi.' },
  'footer.explore': { en: 'Explore', id: 'Jelajahi' },
  'footer.company': { en: 'Company', id: 'Perusahaan' },

  'nf.title': { en: 'Page not found', id: 'Halaman tidak ditemukan' },
  'nf.home': { en: 'Back to home', id: 'Kembali ke beranda' },

  'nav.faq': { en: 'FAQ', id: 'FAQ' },
  'badge.verified': { en: 'Verified', id: 'Terverifikasi' },
  'badge.govt': {
    en: 'A regional government-backed export gateway',
    id: 'Gerbang ekspor yang didukung pemerintah daerah',
  },

  'trust.title': { en: 'Export-grade certifications', id: 'Sertifikasi kelas ekspor' },
  'trust.sub': {
    en: 'Producers on our platform hold the certifications international buyers require.',
    id: 'Produsen di platform kami memegang sertifikasi yang dibutuhkan pembeli internasional.',
  },

  'guar.kicker': { en: 'Trade assurance', id: 'Jaminan dagang' },
  'guar.title': { en: 'We handle the hard parts of exporting', id: 'Kami tangani bagian sulit ekspor' },
  'guar.sub': {
    en: 'So you can source from dozens of small producers with the confidence of a single trusted partner.',
    id: 'Agar Anda bisa sourcing dari puluhan produsen kecil dengan keyakinan satu mitra tepercaya.',
  },

  'testi.title': { en: 'Trusted by buyers worldwide', id: 'Dipercaya pembeli di seluruh dunia' },
  'testi.sub': {
    en: 'What international partners say about sourcing through Aneka Karya.',
    id: 'Kata mitra internasional tentang sourcing lewat Aneka Karya.',
  },

  'markets.kicker': { en: 'Global reach', id: 'Jangkauan global' },
  'markets.title': { en: 'Shipping to buyers across the world', id: 'Mengirim ke pembeli di seluruh dunia' },
  'markets.sub': {
    en: 'From one regency in Central Java to ports in 18 countries — and growing.',
    id: 'Dari satu kabupaten di Jawa Tengah ke pelabuhan di 18 negara — dan terus bertambah.',
  },

  'faq.kicker': { en: 'Help', id: 'Bantuan' },
  'faq.title': { en: 'Frequently asked questions', id: 'Pertanyaan yang sering diajukan' },
  'faq.sub': {
    en: 'Everything you need to know before sourcing from Boyolali.',
    id: 'Semua yang perlu Anda tahu sebelum sourcing dari Boyolali.',
  },
  'faq.cta': { en: 'Still have questions?', id: 'Masih ada pertanyaan?' },

  'news.title': { en: 'Export insights, monthly', id: 'Wawasan ekspor, bulanan' },
  'news.sub': {
    en: 'New producers, market updates and trade tips. No spam.',
    id: 'Produsen baru, kabar pasar, dan tips dagang. Tanpa spam.',
  },
  'news.placeholder': { en: 'Your work email', id: 'Email kerja Anda' },
  'news.btn': { en: 'Subscribe', id: 'Berlangganan' },
  'news.done': { en: 'Subscribed — thank you.', id: 'Berhasil berlangganan — terima kasih.' },

  'form.error': {
    en: 'Couldn’t send — please try again, or email export@anekakarya.id.',
    id: 'Gagal mengirim — coba lagi, atau email export@anekakarya.id.',
  },
  'rfq.trust': {
    en: 'Response within 2 business days · No account required · Free to inquire',
    id: 'Respons dalam 2 hari kerja · Tanpa akun · Gratis bertanya',
  },

  'origin.kicker': { en: 'From the source', id: 'Dari sumbernya' },
  'origin.title': { en: 'Rooted in the highlands of Boyolali', id: 'Berakar di dataran tinggi Boyolali' },
  'origin.body': {
    en: 'On the volcanic slopes of Mount Merapi, generations of farmers and artisans have perfected their craft. We bring their work to the world without diluting what makes it special.',
    id: 'Di lereng vulkanik Gunung Merapi, generasi petani dan perajin menyempurnakan karyanya. Kami membawanya ke dunia tanpa menghilangkan keistimewaannya.',
  },
  'origin.p1.t': { en: 'Volcanic-soil quality', id: 'Kualitas tanah vulkanik' },
  'origin.p1.d': { en: 'Mineral-rich land and cool highland air.', id: 'Tanah kaya mineral dan udara sejuk dataran tinggi.' },
  'origin.p2.t': { en: 'Generational craft', id: 'Kriya turun-temurun' },
  'origin.p2.d': { en: 'Skills passed down for decades.', id: 'Keterampilan diwariskan puluhan tahun.' },
  'origin.p3.t': { en: 'Cooperative model', id: 'Model koperasi' },
  'origin.p3.d': { en: 'Fair value that stays with producers.', id: 'Nilai adil yang tetap di produsen.' },

  'mosaic.kicker': { en: 'In pictures', id: 'Dalam gambar' },
  'mosaic.title': { en: 'From Boyolali to the world', id: 'Dari Boyolali ke dunia' },
  'mosaic.sub': {
    en: 'Real producers, real craft, real export journeys.',
    id: 'Produsen nyata, karya nyata, perjalanan ekspor nyata.',
  },

  // inquiry list
  'nav.register': { en: 'For producers', id: 'Untuk produsen' },
  'nav.insights': { en: 'Insights', id: 'Wawasan' },
  'inq.add': { en: 'Add to inquiry', id: 'Tambah ke inquiry' },
  'inq.added': { en: 'Added', id: 'Ditambahkan' },
  'inq.inList': { en: 'In your inquiry', id: 'Ada di inquiry Anda' },
  'inq.toast': { en: 'Added to your inquiry list', id: 'Ditambahkan ke daftar inquiry' },
  'inq.view': { en: 'View inquiry', id: 'Lihat inquiry' },
  'inq.title': { en: 'Your inquiry list', id: 'Daftar inquiry Anda' },
  'inq.sub': {
    en: 'Review your selected products, then send one consolidated request for quote.',
    id: 'Tinjau produk pilihan Anda, lalu kirim satu permintaan penawaran terkonsolidasi.',
  },
  'inq.empty.t': { en: 'Your inquiry list is empty', id: 'Daftar inquiry Anda kosong' },
  'inq.empty.d': {
    en: 'Browse the catalog and add products to request a consolidated quote.',
    id: 'Telusuri katalog dan tambahkan produk untuk minta penawaran terkonsolidasi.',
  },
  'inq.qty': { en: 'Qty', id: 'Jml' },
  'inq.remove': { en: 'Remove', id: 'Hapus' },
  'inq.clear': { en: 'Clear all', id: 'Hapus semua' },
  'inq.items': { en: 'items', id: 'item' },
  'inq.submit': { en: 'Send consolidated RFQ', id: 'Kirim RFQ terkonsolidasi' },
  'inq.summary': { en: 'Inquiry summary', id: 'Ringkasan inquiry' },

  // catalog advanced
  'cat.search': { en: 'Search products or producers…', id: 'Cari produk atau produsen…' },
  'cat.sort': { en: 'Sort', id: 'Urutkan' },
  'cat.sort.featured': { en: 'Featured', id: 'Unggulan' },
  'cat.sort.az': { en: 'Name A–Z', id: 'Nama A–Z' },
  'cat.sort.moq.low': { en: 'MOQ: low to high', id: 'MOQ: rendah ke tinggi' },
  'cat.filters': { en: 'Filters', id: 'Filter' },
  'cat.cert': { en: 'Certification', id: 'Sertifikasi' },
  'cat.results': { en: 'results', id: 'hasil' },
  'cat.clear': { en: 'Clear filters', id: 'Hapus filter' },
  'cat.none.t': { en: 'No matches', id: 'Tidak ada hasil' },
  'cat.none.d': { en: 'Try adjusting your search or filters.', id: 'Coba ubah pencarian atau filter Anda.' },
  'cat.related': { en: 'Related products', id: 'Produk terkait' },
  'label.quantity': { en: 'Quantity', id: 'Kuantitas' },

  // insights
  'ins.kicker': { en: 'Insights', id: 'Wawasan' },
  'ins.title': { en: 'Export insights & origin stories', id: 'Wawasan ekspor & cerita asal' },
  'ins.sub': {
    en: 'Practical guides and stories from Boyolali’s producers.',
    id: 'Panduan praktis dan cerita dari produsen Boyolali.',
  },
  'ins.read': { en: 'Read article', id: 'Baca artikel' },
  'ins.min': { en: 'min read', id: 'menit baca' },
  'ins.more': { en: 'More articles', id: 'Artikel lainnya' },
  'ins.endnote': {
    en: 'Ready to source verified products from Boyolali? Browse the catalog and send a request for quote.',
    id: 'Siap sourcing produk terverifikasi dari Boyolali? Telusuri katalog dan kirim permintaan penawaran.',
  },

  // register umkm
  'reg.kicker': { en: 'For producers', id: 'Untuk produsen' },
  'reg.title': { en: 'List your UMKM for export', id: 'Daftarkan UMKM Anda untuk ekspor' },
  'reg.sub': {
    en: 'Join verified producers reaching global buyers. It takes a few minutes.',
    id: 'Bergabung dengan produsen terverifikasi yang menjangkau pembeli global. Hanya beberapa menit.',
  },
  'reg.step': { en: 'Step', id: 'Langkah' },
  'reg.of': { en: 'of', id: 'dari' },
  'reg.s1': { en: 'Business', id: 'Usaha' },
  'reg.s2': { en: 'Products', id: 'Produk' },
  'reg.s3': { en: 'Contact', id: 'Kontak' },
  'reg.businessName': { en: 'Business name', id: 'Nama usaha' },
  'reg.category': { en: 'Main category', id: 'Kategori utama' },
  'reg.location': { en: 'Location (village, district)', id: 'Lokasi (desa, kecamatan)' },
  'reg.since': { en: 'Year established', id: 'Tahun berdiri' },
  'reg.capacity': { en: 'Monthly capacity', id: 'Kapasitas bulanan' },
  'reg.certs': { en: 'Certifications (comma separated)', id: 'Sertifikasi (pisahkan koma)' },
  'reg.export': { en: 'Have you exported before?', id: 'Pernah ekspor sebelumnya?' },
  'reg.yes': { en: 'Yes', id: 'Ya' },
  'reg.no': { en: 'Not yet', id: 'Belum' },
  'reg.pic': { en: 'Contact person', id: 'Narahubung' },
  'reg.phone': { en: 'Phone / WhatsApp', id: 'Telepon / WhatsApp' },
  'reg.email': { en: 'Email', id: 'Email' },
  'reg.next': { en: 'Next', id: 'Lanjut' },
  'reg.prev': { en: 'Back', id: 'Kembali' },
  'reg.submit': { en: 'Submit application', id: 'Kirim pendaftaran' },
  'reg.done.t': { en: 'Application received', id: 'Pendaftaran diterima' },
  'reg.done.d': {
    en: 'Thank you. Our onboarding team will review and contact you within 5 business days.',
    id: 'Terima kasih. Tim onboarding kami akan meninjau dan menghubungi Anda dalam 5 hari kerja.',
  },
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; tl: (l?: L) => string }
const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'en')
  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])
  const t = (k: string) => dict[k]?.[lang] ?? k
  const tl = (l?: L) => (l ? l[lang] : '')
  return <I18nContext.Provider value={{ lang, setLang, t, tl }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
