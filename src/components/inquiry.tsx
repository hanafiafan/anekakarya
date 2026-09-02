import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type InquiryItem = { slug: string; qty: number }

type Ctx = {
  items: InquiryItem[]
  count: number
  add: (slug: string, qty?: number) => void
  remove: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  clear: () => void
  has: (slug: string) => boolean
  toast: string | null
}

const InquiryContext = createContext<Ctx | null>(null)
const KEY = 'aneka.inquiry'

export function useInquiry() {
  const c = useContext(InquiryContext)
  if (!c) throw new Error('useInquiry must be used within InquiryProvider')
  return c
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]')
    } catch {
      return []
    }
  })
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items))
  }, [items])

  const add = (slug: string, qty = 1) => {
    setItems((prev) =>
      prev.some((i) => i.slug === slug)
        ? prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { slug, qty }],
    )
    setToast(slug)
    window.clearTimeout((add as unknown as { _t?: number })._t)
    ;(add as unknown as { _t?: number })._t = window.setTimeout(() => setToast(null), 2200)
  }
  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug))
  const setQty = (slug: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)))
  const clear = () => setItems([])
  const has = (slug: string) => items.some((i) => i.slug === slug)

  return (
    <InquiryContext.Provider
      value={{ items, count: items.length, add, remove, setQty, clear, has, toast }}
    >
      {children}
    </InquiryContext.Provider>
  )
}
