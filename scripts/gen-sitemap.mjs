// Generates public/sitemap.xml from the slugs in src/data.ts at build time.
import fs from 'node:fs'

const SITE = 'https://anekakarya.run-web.tech'
const src = fs.readFileSync(new URL('../src/data.ts', import.meta.url), 'utf8')

function slugsBetween(startMarker, endMarker) {
  const s = src.indexOf(`export const ${startMarker}`)
  const e = endMarker ? src.indexOf(`export const ${endMarker}`) : src.length
  const block = src.slice(s, e)
  return [...block.matchAll(/slug: '([^']+)'/g)].map((m) => m[1])
}

const categories = slugsBetween('categories', 'umkms')
const umkms = slugsBetween('umkms', 'products')
const products = slugsBetween('products', 'articles')
const articles = slugsBetween('articles', 'articleBySlug')

const routes = [
  ['/', '1.0'],
  ['/catalog', '0.9'],
  ['/about', '0.7'],
  ['/how-it-works', '0.7'],
  ['/insights', '0.7'],
  ['/faq', '0.6'],
  ['/contact', '0.6'],
  ['/register-umkm', '0.6'],
  ...categories.map((s) => [`/catalog/${s}`, '0.7']),
  ...umkms.map((s) => [`/umkm/${s}`, '0.6']),
  ...products.map((s) => [`/product/${s}`, '0.6']),
  ...articles.map((s) => [`/insights/${s}`, '0.5']),
]

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map(([u, p]) => `  <url><loc>${SITE}${u}</loc><priority>${p}</priority></url>`).join('\n') +
  `\n</urlset>\n`

fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml: ${routes.length} urls (${categories.length} cat, ${umkms.length} umkm, ${products.length} product, ${articles.length} article)`)
