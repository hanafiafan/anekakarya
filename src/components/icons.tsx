// Minimal inline line icons — consistent 1.6 stroke, currentColor.
type P = { className?: string }
const base = 'none'

export function Icon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5l2.5 2.5 4.5-5" />
      </>
    ),
    doc: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4M9.5 13h6M9.5 16.5h6" />
      </>
    ),
    ship: (
      <>
        <path d="M4 15l1.5 4h13L20 15z" />
        <path d="M6 15V9h8l3 3v3M9 6V4h3v2" />
      </>
    ),
    quote: <path d="M9 7c-2.5 1-4 3-4 6h3v4H4v-4c0-4 2-6.5 5-7zM19 7c-2.5 1-4 3-4 6h3v4h-4v-4c0-4 2-6.5 5-7z" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill={base}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name] ?? null}
    </svg>
  )
}

export function VerifiedCheck({ className = 'h-4 w-4' }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.5l.9-2.9-.9-2.9 2.4-1.8 1-2.8 3-.1z"
      />
      <path fill="#fff" d="M10.6 14.6l-2.1-2.1-1.2 1.2 3.3 3.3 6-6-1.2-1.2z" />
    </svg>
  )
}
