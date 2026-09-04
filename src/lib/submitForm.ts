// Form delivery. Set VITE_WEB3FORMS_KEY (a free access key from web3forms.com) to
// deliver real emails from the static site — no backend/secret required. Without a
// key, submissions are logged and accepted (demo mode) so the UI keeps working.

const KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export async function submitForm(
  subject: string,
  payload: Record<string, unknown>,
): Promise<{ ok: boolean }> {
  if (!KEY) {
    console.info(`[form:demo] ${subject}`, payload)
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true }
  }
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: KEY,
        subject,
        from_name: 'Aneka Karya website',
        ...payload,
      }),
    })
    const data = await res.json()
    return { ok: Boolean(data?.success) }
  } catch {
    return { ok: false }
  }
}
