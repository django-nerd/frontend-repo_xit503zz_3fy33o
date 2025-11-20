import { useState } from 'react'

export default function StyleAnalyzer({ onToken }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState('')

  const submitText = async () => {
    if (!text.trim()) return
    await analyze({ text })
  }

  const onFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    await analyze({ file })
    e.target.value = ''
  }

  const analyze = async ({ text, file }) => {
    try {
      setLoading(true)
      setNotes('')
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      let res
      if (file) {
        const form = new FormData()
        form.append('file', file)
        res = await fetch(`${baseUrl}/api/style/analyze`, { method: 'POST', body: form })
      } else {
        const form = new FormData()
        form.append('text', text)
        res = await fetch(`${baseUrl}/api/style/analyze`, { method: 'POST', body: form })
      }
      if (!res.ok) throw new Error(`Analyze failed (${res.status})`)
      const data = await res.json()
      const p = data?.profile || {}
      const tokenParts = []
      if (p.primary) tokenParts.push(`primary:${p.primary}`)
      if (p.secondary) tokenParts.push(`secondary:${p.secondary}`)
      if (p.background_from) tokenParts.push(`background_from:${p.background_from}`)
      if (p.background_to) tokenParts.push(`background_to:${p.background_to}`)
      if (p.neon_glow) tokenParts.push(`neon_glow:${p.neon_glow}`)
      const token = tokenParts.join(',')
      onToken?.(token)
      setNotes(data?.notes || '')
    } catch (e) {
      setNotes(e.message || 'Analyze error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-6">
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
          <div className="text-white/90 font-medium">Style analyzer</div>
          <label className="text-sm text-cyan-200/80 cursor-pointer inline-flex items-center gap-2">
            <input type="file" accept="text/html,text/css,.html,.css" className="hidden" onChange={onFileChange} />
            <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">Upload HTML/CSS</span>
          </label>
        </div>
        <div className="mt-3 grid gap-3">
          <textarea
            rows={3}
            className="w-full bg-transparent outline-none text-white placeholder:text-slate-400 px-3 py-2 border border-white/10 rounded-lg"
            placeholder="Paste HTML or CSS to infer palette (optional)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <button
              onClick={submitText}
              disabled={loading}
              className="px-4 py-2 rounded-xl font-semibold text-slate-900 disabled:opacity-60"
              style={{ background: 'var(--primary)' }}
            >{loading ? 'Analyzing…' : 'Analyze'}</button>
            <p className="text-xs text-cyan-200/70">We analyze only what you upload. Do not submit content you don't have rights to.</p>
          </div>
          {notes && <div className="text-sm text-slate-300">{notes}</div>}
        </div>
      </div>
    </div>
  )
}
