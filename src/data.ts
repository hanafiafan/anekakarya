// Central content for the platform. Swap/extend freely — this is the seed catalog.
// Bilingual fields use { en, id }.

export type L = { en: string; id: string }

export type Category = {
  slug: string
  name: L
  tagline: L
  photo: string
  accent: 'leaf' | 'ocean' | 'terra' | 'forest'
}

export type Umkm = {
  slug: string
  name: string
  category: string // category slug
  location: L
  since: number
  photo: string
  story: L
  certifications: string[]
  capacity: L
  moq: L
  leadTime: L
  languages: string[]
  productSlugs: string[]
}

export type Product = {
  slug: string
  name: L
  umkm: string // umkm slug
  category: string
  photo: string
  description: L
  hsCode: string
  moq: L
  priceHint: L
  specs: { label: L; value: L }[]
}

export const categories: Category[] = [
  {
    slug: 'dairy',
    name: { en: 'Dairy & Processed Food', id: 'Susu & Makanan Olahan' },
    tagline: {
      en: "From Boyolali — Indonesia's dairy heartland.",
      id: 'Dari Boyolali — pusat susu Indonesia.',
    },
    photo: '/photos/food.jpg',
    accent: 'leaf',
  },
  {
    slug: 'copper',
    name: { en: 'Copper Handicraft', id: 'Kerajinan Tembaga' },
    tagline: {
      en: 'Hand-hammered heritage from Tumang & Cepogo.',
      id: 'Warisan tempa tangan dari Tumang & Cepogo.',
    },
    photo: '/photos/copper-vessels.jpg',
    accent: 'terra',
  },
  {
    slug: 'textile',
    name: { en: 'Textiles & Craft', id: 'Tekstil & Kriya' },
    tagline: {
      en: 'Handwoven fabrics with natural character.',
      id: 'Kain tenun tangan berkarakter alami.',
    },
    photo: '/photos/textiles.jpg',
    accent: 'ocean',
  },
  {
    slug: 'agri',
    name: { en: 'Agriculture & Fresh', id: 'Pertanian & Segar' },
    tagline: {
      en: 'Highland produce grown in volcanic soil.',
      id: 'Hasil dataran tinggi di tanah vulkanik.',
    },
    photo: '/photos/dairy-cows.jpg',
    accent: 'forest',
  },
]

export const umkms: Umkm[] = [
  {
    slug: 'sumber-rejeki-dairy',
    name: 'Sumber Rejeki Dairy',
    category: 'dairy',
    location: { en: 'Cepogo, Boyolali', id: 'Cepogo, Boyolali' },
    since: 2011,
    photo: '/photos/farmer.jpg',
    story: {
      en: 'A cooperative of 40 highland dairy farmers turning fresh Boyolali milk into shelf-stable products built for export — from packaged milk to premium cheese.',
      id: 'Koperasi 40 peternak dataran tinggi yang mengolah susu segar Boyolali menjadi produk tahan simpan siap ekspor — dari susu kemasan hingga keju premium.',
    },
    certifications: ['HALAL', 'BPOM', 'ISO 22000', 'HACCP'],
    capacity: { en: '12,000 units / month', id: '12.000 unit / bulan' },
    moq: { en: '500 units', id: '500 unit' },
    leadTime: { en: '3–4 weeks', id: '3–4 minggu' },
    languages: ['English', 'Bahasa Indonesia'],
    productSlugs: ['boyolali-milk-pack', 'highland-cheese'],
  },
  {
    slug: 'tumang-copper-works',
    name: 'Tumang Copper Works',
    category: 'copper',
    location: { en: 'Tumang, Cepogo, Boyolali', id: 'Tumang, Cepogo, Boyolali' },
    since: 1998,
    photo: '/photos/copper-hands.jpg',
    story: {
      en: 'Third-generation coppersmiths hand-hammering vessels, lamps and decor. Trusted by interior brands across Europe and the Middle East.',
      id: 'Perajin tembaga generasi ketiga yang menempa bejana, lampu, dan dekorasi. Dipercaya merek interior di Eropa dan Timur Tengah.',
    },
    certifications: ['SNI', 'Export License', 'Handmade Verified'],
    capacity: { en: '800 pieces / month', id: '800 buah / bulan' },
    moq: { en: '50 pieces', id: '50 buah' },
    leadTime: { en: '5–7 weeks', id: '5–7 minggu' },
    languages: ['English', 'Bahasa Indonesia'],
    productSlugs: ['hammered-copper-vase', 'copper-bowl-set'],
  },
  {
    slug: 'lestari-weaving',
    name: 'Lestari Weaving House',
    category: 'textile',
    location: { en: 'Ampel, Boyolali', id: 'Ampel, Boyolali' },
    since: 2015,
    photo: '/photos/textiles.jpg',
    story: {
      en: 'Women-led weaving house producing natural-dye textiles and home fabrics with a low-waste, small-batch approach.',
      id: 'Rumah tenun yang dipimpin perempuan, memproduksi tekstil pewarna alami dan kain rumah dengan pendekatan minim limbah dan batch kecil.',
    },
    certifications: ['Natural Dye', 'Fair Craft', 'Export License'],
    capacity: { en: '2,500 m / month', id: '2.500 m / bulan' },
    moq: { en: '100 m', id: '100 m' },
    leadTime: { en: '4–6 weeks', id: '4–6 minggu' },
    languages: ['English', 'Bahasa Indonesia'],
    productSlugs: ['handwoven-throw'],
  },
  {
    slug: 'merapi-highland-farm',
    name: 'Merapi Highland Farm',
    category: 'agri',
    location: { en: 'Selo, Boyolali', id: 'Selo, Boyolali' },
    since: 2018,
    photo: '/photos/highlands-b.jpg',
    story: {
      en: 'Highland horticulture on the slopes of Mount Merapi — vegetables and specialty produce grown in mineral-rich volcanic soil.',
      id: 'Hortikultura dataran tinggi di lereng Gunung Merapi — sayuran dan produk spesialti di tanah vulkanik kaya mineral.',
    },
    certifications: ['GAP', 'Organic (in transition)'],
    capacity: { en: '8 tons / month', id: '8 ton / bulan' },
    moq: { en: '500 kg', id: '500 kg' },
    leadTime: { en: '1–2 weeks', id: '1–2 minggu' },
    languages: ['Bahasa Indonesia'],
    productSlugs: [],
  },
]

export const products: Product[] = [
  {
    slug: 'boyolali-milk-pack',
    name: { en: 'Boyolali UHT Milk (Export Pack)', id: 'Susu UHT Boyolali (Kemasan Ekspor)' },
    umkm: 'sumber-rejeki-dairy',
    category: 'dairy',
    photo: '/photos/food.jpg',
    description: {
      en: 'Shelf-stable UHT milk from grass-fed highland cows, packed in export-grade cartons with multilingual labeling.',
      id: 'Susu UHT tahan simpan dari sapi dataran tinggi, dikemas dalam karton kelas ekspor dengan label multibahasa.',
    },
    hsCode: '0401.20',
    moq: { en: '500 cartons', id: '500 karton' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Shelf life', id: 'Masa simpan' }, value: { en: '9 months', id: '9 bulan' } },
      { label: { en: 'Packaging', id: 'Kemasan' }, value: { en: '1L × 12 / carton', id: '1L × 12 / karton' } },
    ],
  },
  {
    slug: 'highland-cheese',
    name: { en: 'Highland Artisan Cheese', id: 'Keju Artisan Dataran Tinggi' },
    umkm: 'sumber-rejeki-dairy',
    category: 'dairy',
    photo: '/photos/food.jpg',
    description: {
      en: 'Small-batch semi-hard cheese aged for depth of flavour. Vacuum-sealed and cold-chain ready.',
      id: 'Keju semi-keras batch kecil yang dimatangkan untuk cita rasa mendalam. Vakum dan siap rantai dingin.',
    },
    hsCode: '0406.90',
    moq: { en: '200 units', id: '200 unit' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Weight', id: 'Berat' }, value: { en: '250 g / wheel', id: '250 g / roda' } },
      { label: { en: 'Aging', id: 'Pematangan' }, value: { en: '3 months', id: '3 bulan' } },
    ],
  },
  {
    slug: 'hammered-copper-vase',
    name: { en: 'Hand-Hammered Copper Vase', id: 'Vas Tembaga Tempa Tangan' },
    umkm: 'tumang-copper-works',
    category: 'copper',
    photo: '/photos/copper-vessels.jpg',
    description: {
      en: 'A sculptural vase hand-hammered from a single sheet of copper. Each piece carries a unique artisan texture.',
      id: 'Vas patungan yang ditempa tangan dari satu lembar tembaga. Tiap buah memiliki tekstur perajin yang unik.',
    },
    hsCode: '7418.20',
    moq: { en: '50 pieces', id: '50 buah' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Height', id: 'Tinggi' }, value: { en: '30 cm', id: '30 cm' } },
      { label: { en: 'Finish', id: 'Finishing' }, value: { en: 'Natural / antique', id: 'Natural / antik' } },
    ],
  },
  {
    slug: 'copper-bowl-set',
    name: { en: 'Copper Bowl Set (4 pcs)', id: 'Set Mangkuk Tembaga (4 buah)' },
    umkm: 'tumang-copper-works',
    category: 'copper',
    photo: '/photos/copper-vessels.jpg',
    description: {
      en: 'Nested set of hammered copper bowls for hospitality and premium retail.',
      id: 'Set mangkuk tembaga tempa bertingkat untuk perhotelan dan ritel premium.',
    },
    hsCode: '7418.20',
    moq: { en: '80 sets', id: '80 set' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Diameter', id: 'Diameter' }, value: { en: '8–20 cm', id: '8–20 cm' } },
      { label: { en: 'Material', id: 'Material' }, value: { en: '99% copper', id: 'Tembaga 99%' } },
    ],
  },
  {
    slug: 'handwoven-throw',
    name: { en: 'Natural-Dye Handwoven Throw', id: 'Selimut Tenun Pewarna Alami' },
    umkm: 'lestari-weaving',
    category: 'textile',
    photo: '/photos/textiles.jpg',
    description: {
      en: 'Handwoven cotton throw coloured with plant-based natural dyes. Soft, breathable and slow-made.',
      id: 'Selimut katun tenun tangan dengan pewarna alami nabati. Lembut, bernapas, dan dibuat perlahan.',
    },
    hsCode: '6304.91',
    moq: { en: '100 pieces', id: '100 buah' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Size', id: 'Ukuran' }, value: { en: '130 × 170 cm', id: '130 × 170 cm' } },
      { label: { en: 'Material', id: 'Material' }, value: { en: '100% cotton', id: 'Katun 100%' } },
    ],
  },
  {
    slug: 'copper-pendant-lamp',
    name: { en: 'Copper Pendant Lamp', id: 'Lampu Gantung Tembaga' },
    umkm: 'tumang-copper-works',
    category: 'copper',
    photo: '/photos/copper-hands.jpg',
    description: {
      en: 'Statement pendant lamp with a hand-textured copper shade — a favourite for hospitality projects.',
      id: 'Lampu gantung dengan kap tembaga bertekstur tangan — favorit untuk proyek perhotelan.',
    },
    hsCode: '9405.20',
    moq: { en: '30 pieces', id: '30 buah' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Diameter', id: 'Diameter' }, value: { en: '35 cm', id: '35 cm' } },
      { label: { en: 'Wiring', id: 'Kelistrikan' }, value: { en: 'E27, CE-ready', id: 'E27, siap CE' } },
    ],
  },
  {
    slug: 'butter-cookies-tin',
    name: { en: 'Highland Butter Cookies (Tin)', id: 'Kue Mentega Dataran Tinggi (Kaleng)' },
    umkm: 'sumber-rejeki-dairy',
    category: 'dairy',
    photo: '/photos/food.jpg',
    description: {
      en: 'Rich butter cookies made with local dairy butter, packed in export gift tins.',
      id: 'Kue mentega kaya rasa dari mentega susu lokal, dikemas dalam kaleng hadiah ekspor.',
    },
    hsCode: '1905.31',
    moq: { en: '300 tins', id: '300 kaleng' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Net weight', id: 'Berat bersih' }, value: { en: '400 g', id: '400 g' } },
      { label: { en: 'Shelf life', id: 'Masa simpan' }, value: { en: '12 months', id: '12 bulan' } },
    ],
  },
  {
    slug: 'batik-table-runner',
    name: { en: 'Hand-Stamped Batik Table Runner', id: 'Pelari Meja Batik Cap Tangan' },
    umkm: 'lestari-weaving',
    category: 'textile',
    photo: '/photos/linen.jpg',
    description: {
      en: 'Cotton table runner with hand-stamped batik motifs in natural dyes.',
      id: 'Pelari meja katun dengan motif batik cap tangan berpewarna alami.',
    },
    hsCode: '6304.92',
    moq: { en: '150 pieces', id: '150 buah' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Size', id: 'Ukuran' }, value: { en: '40 × 180 cm', id: '40 × 180 cm' } },
      { label: { en: 'Dye', id: 'Pewarna' }, value: { en: 'Natural indigo', id: 'Indigo alami' } },
    ],
  },
  {
    slug: 'mozzarella-blocks',
    name: { en: 'Fresh Mozzarella Blocks', id: 'Blok Mozzarella Segar' },
    umkm: 'sumber-rejeki-dairy',
    category: 'dairy',
    photo: '/photos/food.jpg',
    description: {
      en: 'Cold-chain mozzarella blocks for food service, made from fresh highland milk.',
      id: 'Blok mozzarella rantai dingin untuk food service, dari susu dataran tinggi segar.',
    },
    hsCode: '0406.10',
    moq: { en: '300 units', id: '300 unit' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Weight', id: 'Berat' }, value: { en: '1 kg / block', id: '1 kg / blok' } },
      { label: { en: 'Storage', id: 'Penyimpanan' }, value: { en: '2–4°C', id: '2–4°C' } },
    ],
  },
  {
    slug: 'highland-coffee-beans',
    name: { en: 'Merapi Highland Coffee (Green Beans)', id: 'Kopi Dataran Tinggi Merapi (Biji Hijau)' },
    umkm: 'merapi-highland-farm',
    category: 'agri',
    photo: '/photos/dairy-cows.jpg',
    description: {
      en: 'Volcanic-soil arabica green beans, hand-picked and sun-dried on the slopes of Mount Merapi.',
      id: 'Biji hijau arabika tanah vulkanik, dipetik tangan dan dijemur di lereng Gunung Merapi.',
    },
    hsCode: '0901.11',
    moq: { en: '1,000 kg', id: '1.000 kg' },
    priceHint: { en: 'Quote on request', id: 'Harga sesuai permintaan' },
    specs: [
      { label: { en: 'Process', id: 'Proses' }, value: { en: 'Natural / washed', id: 'Natural / washed' } },
      { label: { en: 'Altitude', id: 'Ketinggian' }, value: { en: '1,400–1,700 masl', id: '1.400–1.700 mdpl' } },
    ],
  },
]

export type Article = {
  slug: string
  title: L
  excerpt: L
  body: L
  date: string
  readMins: number
  tag: L
  photo: string
}

export const articles: Article[] = [
  {
    slug: 'incoterms-explained',
    title: { en: 'FOB, CIF, DDP: Incoterms explained for first-time buyers', id: 'FOB, CIF, DDP: Incoterms untuk pembeli pemula' },
    excerpt: {
      en: 'A plain-English guide to the shipping terms that decide who pays for what — and when risk transfers.',
      id: 'Panduan sederhana tentang istilah pengiriman yang menentukan siapa membayar apa — dan kapan risiko berpindah.',
    },
    body: {
      en: 'Incoterms are standardized trade terms published by the ICC. FOB (Free On Board) means the seller delivers goods onto the vessel; risk passes to the buyer at that point. CIF adds cost, insurance and freight to the destination port. DDP (Delivered Duty Paid) places maximum responsibility on the seller, including import duties. For most first orders through Aneka Karya, we recommend FOB or CIF — clear, common, and easy to insure.',
      id: 'Incoterms adalah istilah dagang baku yang diterbitkan ICC. FOB (Free On Board) berarti penjual mengirim barang ke atas kapal; risiko berpindah ke pembeli di titik itu. CIF menambahkan biaya, asuransi, dan pengangkutan ke pelabuhan tujuan. DDP menempatkan tanggung jawab maksimum pada penjual, termasuk bea impor. Untuk pesanan pertama lewat Aneka Karya, kami sarankan FOB atau CIF — jelas, umum, dan mudah diasuransikan.',
    },
    date: '2026-08-12',
    readMins: 5,
    tag: { en: 'Logistics', id: 'Logistik' },
    photo: '/photos/seaport.jpg',
  },
  {
    slug: 'boyolali-dairy-story',
    title: { en: 'Why Boyolali is Indonesia’s dairy heartland', id: 'Mengapa Boyolali adalah pusat susu Indonesia' },
    excerpt: {
      en: 'Cool highland air, volcanic pasture and generations of know-how make Boyolali milk special.',
      id: 'Udara sejuk dataran tinggi, padang vulkanik, dan keahlian turun-temurun membuat susu Boyolali istimewa.',
    },
    body: {
      en: 'At 700–1,700 metres on the slopes of Mount Merapi, Boyolali offers the cool climate and mineral-rich pasture that dairy cattle thrive in. The regency has produced milk for over a century, and today its cooperatives are modernising into export-grade processing — UHT, cheese and butter — while keeping smallholder farmers at the centre.',
      id: 'Di ketinggian 700–1.700 meter di lereng Gunung Merapi, Boyolali menawarkan iklim sejuk dan padang kaya mineral tempat sapi perah tumbuh baik. Kabupaten ini telah memproduksi susu lebih dari seabad, dan kini koperasinya memodernkan pengolahan kelas ekspor — UHT, keju, dan mentega — sambil tetap menempatkan peternak kecil sebagai pusat.',
    },
    date: '2026-07-28',
    readMins: 4,
    tag: { en: 'Origin', id: 'Asal' },
    photo: '/photos/dairy-cows.jpg',
  },
  {
    slug: 'copper-craft-tumang',
    title: { en: 'The coppersmiths of Tumang: heritage meets export', id: 'Perajin tembaga Tumang: warisan bertemu ekspor' },
    excerpt: {
      en: 'How a village of artisans became a supplier to interior brands across three continents.',
      id: 'Bagaimana desa perajin menjadi pemasok merek interior di tiga benua.',
    },
    body: {
      en: 'Tumang, in the Cepogo district, has hammered copper for generations. What began as household utensils is now a craft economy exporting lamps, vessels and architectural panels. Aneka Karya helps these workshops meet export documentation and quality standards without losing the handmade character buyers love.',
      id: 'Tumang, di kecamatan Cepogo, telah menempa tembaga selama generasi. Yang bermula sebagai perkakas rumah kini menjadi ekonomi kriya yang mengekspor lampu, bejana, dan panel arsitektur. Aneka Karya membantu bengkel-bengkel ini memenuhi dokumentasi ekspor dan standar mutu tanpa kehilangan karakter buatan tangan yang disukai pembeli.',
    },
    date: '2026-07-05',
    readMins: 4,
    tag: { en: 'Craft', id: 'Kriya' },
    photo: '/photos/copper-hands.jpg',
  },
  {
    slug: 'halal-certification-for-export',
    title: { en: 'HALAL certification: what it means for your imports', id: 'Sertifikasi HALAL: artinya bagi impor Anda' },
    excerpt: {
      en: 'Why HALAL matters beyond Muslim-majority markets, and how our producers get certified.',
      id: 'Mengapa HALAL penting melampaui pasar mayoritas Muslim, dan bagaimana produsen kami tersertifikasi.',
    },
    body: {
      en: 'HALAL certification signals that a product meets strict sourcing, hygiene and traceability standards — increasingly valued even outside Muslim-majority markets as a mark of quality assurance. In Indonesia, HALAL is issued by BPJPH with audits by accredited bodies (LPH). Every food producer on Aneka Karya either holds active HALAL certification or is guided through it before listing, so your shipments arrive with documentation buyers and customs expect.',
      id: 'Sertifikasi HALAL menandakan produk memenuhi standar sumber bahan, higienitas, dan ketertelusuran yang ketat — makin dihargai bahkan di luar pasar mayoritas Muslim sebagai tanda jaminan mutu. Di Indonesia, HALAL diterbitkan BPJPH dengan audit oleh lembaga terakreditasi (LPH). Setiap produsen makanan di Aneka Karya memegang sertifikat HALAL aktif atau kami dampingi sampai memilikinya sebelum tampil, agar kiriman Anda datang dengan dokumen yang diharapkan pembeli dan bea cukai.',
    },
    date: '2026-08-20',
    readMins: 5,
    tag: { en: 'Compliance', id: 'Kepatuhan' },
    photo: '/photos/food.jpg',
  },
  {
    slug: 'moq-sampling-first-orders',
    title: { en: 'MOQ, samples and your first order: how it works', id: 'MOQ, sampel, dan pesanan pertama: cara kerjanya' },
    excerpt: {
      en: 'A practical walkthrough from first inquiry to a confirmed, sampled, quality-checked shipment.',
      id: 'Panduan praktis dari pertanyaan awal hingga kiriman yang dikonfirmasi, disampel, dan dicek mutu.',
    },
    body: {
      en: 'Minimum order quantities (MOQ) exist so small producers can run efficient batches — but we can consolidate across producers to reach them. A typical first order runs: RFQ → quotation with Incoterms → paid or free samples couriered to you → PO and deposit → production → independent pre-shipment inspection → export documents and shipping. Most buyers reach a confirmed order within two to three weeks of the first inquiry.',
      id: 'Minimum order (MOQ) ada agar produsen kecil bisa menjalankan batch yang efisien — tapi kami bisa mengonsolidasi lintas produsen untuk memenuhinya. Alur pesanan pertama biasanya: RFQ → penawaran dengan Incoterms → sampel berbayar/gratis dikirim ke Anda → PO dan deposit → produksi → inspeksi pra-kirim independen → dokumen ekspor dan pengiriman. Kebanyakan pembeli mencapai pesanan terkonfirmasi dalam dua sampai tiga minggu sejak pertanyaan pertama.',
    },
    date: '2026-08-02',
    readMins: 6,
    tag: { en: 'Sourcing', id: 'Sourcing' },
    photo: '/photos/warehouse.jpg',
  },
  {
    slug: 'export-packaging-labeling',
    title: { en: 'Packaging & labeling that clears customs', id: 'Kemasan & label yang lolos bea cukai' },
    excerpt: {
      en: 'Export-grade packaging protects your goods and satisfies destination-country labeling rules.',
      id: 'Kemasan kelas ekspor melindungi barang dan memenuhi aturan pelabelan negara tujuan.',
    },
    body: {
      en: 'Getting to port is only half the job — goods must survive weeks in a container and satisfy the destination market’s labeling rules. That means moisture-resistant, stackable packaging, correct net-weight and country-of-origin marks, ingredient and allergen declarations where required, and multilingual labels. Aneka Karya reviews packaging and artwork against your market’s requirements before production, avoiding costly rejections at the border.',
      id: 'Sampai ke pelabuhan baru separuh pekerjaan — barang harus bertahan berminggu-minggu dalam kontainer dan memenuhi aturan pelabelan pasar tujuan. Artinya kemasan tahan lembap dan bisa ditumpuk, tanda berat bersih dan negara asal yang benar, deklarasi bahan dan alergen bila diperlukan, serta label multibahasa. Aneka Karya meninjau kemasan dan desain terhadap persyaratan pasar Anda sebelum produksi, menghindari penolakan mahal di perbatasan.',
    },
    date: '2026-07-18',
    readMins: 5,
    tag: { en: 'Quality', id: 'Mutu' },
    photo: '/photos/textiles.jpg',
  },
]

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug)

// helpers
export const byCategory = (slug: string) => products.filter((p) => p.category === slug)
export const umkmBySlug = (slug: string) => umkms.find((u) => u.slug === slug)
export const productBySlug = (slug: string) => products.find((p) => p.slug === slug)
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)
export const umkmsByCategory = (slug: string) => umkms.filter((u) => u.category === slug)

export const stats = [
  { value: '4', label: { en: 'Product categories', id: 'Kategori produk' } },
  { value: '120+', label: { en: 'UMKM onboarded', id: 'UMKM tergabung' } },
  { value: '18', label: { en: 'Destination countries', id: 'Negara tujuan' } },
  { value: '100%', label: { en: 'Verified producers', id: 'Produsen terverifikasi' } },
]

// Master certification list shown in the trust strip.
export const certifications: { code: string; name: L }[] = [
  { code: 'HALAL', name: { en: 'Halal Certified', id: 'Bersertifikat Halal' } },
  { code: 'BPOM', name: { en: 'Food & Drug Registered', id: 'Terdaftar BPOM' } },
  { code: 'ISO 22000', name: { en: 'Food Safety Mgmt', id: 'Manajemen Keamanan Pangan' } },
  { code: 'HACCP', name: { en: 'Hazard Analysis', id: 'Analisis Bahaya' } },
  { code: 'SNI', name: { en: 'Indonesian Standard', id: 'Standar Nasional' } },
  { code: 'FDA', name: { en: 'US FDA Ready', id: 'Siap FDA AS' } },
]

// Trade-assurance guarantees — the "hard parts of export" the agency handles.
export const guarantees: { icon: string; title: L; desc: L }[] = [
  {
    icon: 'shield',
    title: { en: 'Verified & vetted producers', id: 'Produsen terverifikasi' },
    desc: {
      en: 'Legality, capacity and certifications checked before any producer is listed.',
      id: 'Legalitas, kapasitas, dan sertifikasi diperiksa sebelum produsen tampil.',
    },
  },
  {
    icon: 'check',
    title: { en: 'Independent quality control', id: 'Kontrol mutu independen' },
    desc: {
      en: 'Pre-shipment inspection to agreed export specification, every order.',
      id: 'Inspeksi pra-kirim sesuai spesifikasi ekspor yang disepakati, setiap pesanan.',
    },
  },
  {
    icon: 'doc',
    title: { en: 'Export documents handled', id: 'Dokumen ekspor ditangani' },
    desc: {
      en: 'CoO, phytosanitary, HS classification and customs paperwork managed for you.',
      id: 'CoO, phytosanitary, klasifikasi HS, dan dokumen bea cukai diurus untuk Anda.',
    },
  },
  {
    icon: 'ship',
    title: { en: 'Consolidated & insured shipping', id: 'Pengiriman terkonsolidasi & terasuransi' },
    desc: {
      en: 'FCL/LCL consolidation, tracking and cargo insurance to your port.',
      id: 'Konsolidasi FCL/LCL, pelacakan, dan asuransi kargo ke pelabuhan Anda.',
    },
  },
]

export const testimonials: { quote: L; name: string; role: L; flag: string }[] = [
  {
    quote: {
      en: 'Aneka Karya made sourcing from Central Java effortless. One contract, verified quality, documents handled end to end.',
      id: 'Aneka Karya membuat sourcing dari Jawa Tengah jadi mudah. Satu kontrak, mutu terverifikasi, dokumen diurus tuntas.',
    },
    name: 'Laura M.',
    role: { en: 'Buyer · Netherlands', id: 'Pembeli · Belanda' },
    flag: '🇳🇱',
  },
  {
    quote: {
      en: 'The copper craft quality is exceptional and shipping was on schedule. Our retail partners were impressed.',
      id: 'Kualitas kerajinan tembaganya luar biasa dan pengiriman tepat waktu. Mitra ritel kami terkesan.',
    },
    name: 'Kenji T.',
    role: { en: 'Importer · Japan', id: 'Importir · Jepang' },
    flag: '🇯🇵',
  },
  {
    quote: {
      en: 'Clear communication in English, honest lead times, and a single point of contact. Exactly what we needed.',
      id: 'Komunikasi jelas dalam bahasa Inggris, lead time jujur, dan satu titik kontak. Persis yang kami butuhkan.',
    },
    name: 'Sarah K.',
    role: { en: 'Procurement · Australia', id: 'Pengadaan · Australia' },
    flag: '🇦🇺',
  },
]

export const markets: { flag: string; name: L }[] = [
  { flag: '🇳🇱', name: { en: 'Netherlands', id: 'Belanda' } },
  { flag: '🇩🇪', name: { en: 'Germany', id: 'Jerman' } },
  { flag: '🇯🇵', name: { en: 'Japan', id: 'Jepang' } },
  { flag: '🇦🇺', name: { en: 'Australia', id: 'Australia' } },
  { flag: '🇦🇪', name: { en: 'UAE', id: 'UEA' } },
  { flag: '🇺🇸', name: { en: 'United States', id: 'Amerika Serikat' } },
  { flag: '🇸🇬', name: { en: 'Singapore', id: 'Singapura' } },
  { flag: '🇰🇷', name: { en: 'South Korea', id: 'Korea Selatan' } },
]

export const faqs: { q: L; a: L }[] = [
  {
    q: { en: 'Do I need an account to request a quote?', id: 'Apakah perlu akun untuk minta penawaran?' },
    a: {
      en: 'No. Simply send a Request for Quote (RFQ) with your details and our export team responds within 2 business days.',
      id: 'Tidak. Cukup kirim Permintaan Penawaran (RFQ) beserta detail Anda, dan tim ekspor kami merespons dalam 2 hari kerja.',
    },
  },
  {
    q: { en: 'What are your minimum order quantities?', id: 'Berapa minimum order (MOQ)?' },
    a: {
      en: 'MOQ varies by product and is shown on each product page. We can also consolidate smaller quantities across producers.',
      id: 'MOQ bervariasi per produk dan tertera di tiap halaman produk. Kami juga bisa mengonsolidasi kuantitas kecil lintas produsen.',
    },
  },
  {
    q: { en: 'Which Incoterms do you support?', id: 'Incoterms apa yang didukung?' },
    a: {
      en: 'We commonly quote FOB and CIF from Indonesian ports, and can arrange EXW or DDP on request.',
      id: 'Kami umumnya menawarkan FOB dan CIF dari pelabuhan Indonesia, serta bisa mengatur EXW atau DDP sesuai permintaan.',
    },
  },
  {
    q: { en: 'How is quality guaranteed?', id: 'Bagaimana mutu dijamin?' },
    a: {
      en: 'Every order undergoes independent pre-shipment inspection against the agreed export specification before dispatch.',
      id: 'Setiap pesanan menjalani inspeksi pra-kirim independen sesuai spesifikasi ekspor yang disepakati sebelum dikirim.',
    },
  },
  {
    q: { en: 'Can you handle export documentation?', id: 'Apakah dokumen ekspor diurus?' },
    a: {
      en: 'Yes. Certificate of Origin, phytosanitary certificates, HS classification and customs paperwork are all handled by our team.',
      id: 'Ya. Sertifikat Asal (CoO), sertifikat phytosanitary, klasifikasi HS, dan dokumen bea cukai diurus tim kami.',
    },
  },
  {
    q: { en: 'How do samples work?', id: 'Bagaimana proses sampel?' },
    a: {
      en: 'After an RFQ we coordinate paid or free samples with the producer, including courier to your address.',
      id: 'Setelah RFQ, kami koordinasikan sampel berbayar atau gratis dengan produsen, termasuk kurir ke alamat Anda.',
    },
  },
]
