import { useEffect } from 'react'

export const SITE = 'https://anekakarya.run-web.tech'
const DEFAULT_IMG = `${SITE}/photos/highlands-a.jpg`

type SeoInput = {
  title: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
  jsonLd?: object | object[]
}

function upsertMeta(selectorAttr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${selectorAttr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(selectorAttr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Imperatively manage <head> per route — updates existing tags, no duplicates. */
export function useSeo({ title, description, image, path = '', type = 'website', jsonLd }: SeoInput) {
  const desc =
    description ??
    'Aneka Karya — export platform connecting Boyolali’s UMKM to global markets.'
  const url = `${SITE}${path}`
  const img = image ? (image.startsWith('http') ? image : `${SITE}${image}`) : DEFAULT_IMG
  const fullTitle = title.includes('Aneka Karya') ? title : `${title} · Aneka Karya`

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', desc)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', img)
    upsertLink('canonical', url)

    const id = 'ld-json-route'
    document.getElementById(id)?.remove()
    if (jsonLd) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = id
      s.text = JSON.stringify(jsonLd)
      document.head.appendChild(s)
    }
    return () => {
      document.getElementById(id)?.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullTitle, desc, url, img, type, JSON.stringify(jsonLd ?? null)])
}
