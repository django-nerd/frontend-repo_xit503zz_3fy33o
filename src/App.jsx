import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import PromptForm from './components/PromptForm'
import Preview from './components/Preview'
import Downloader from './components/Downloader'
import StyleAnalyzer from './components/StyleAnalyzer'

function App() {
  const [design, setDesign] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [styleToken, setStyleToken] = useState('')

  const applyTheme = (data) => {
    const root = document.documentElement
    root.style.setProperty('--primary', data.primary)
    root.style.setProperty('--glow', data.neon_glow)
  }

  const generate = useCallback(async (prompt, opts = {}) => {
    if (!prompt) return
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = { prompt }
      const token = opts.styleToken ?? styleToken
      if (token && token.trim()) payload.style_profile = token.trim()
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Generate failed (${res.status}) ${txt}`)
      }
      const data = await res.json()
      setDesign(data)
      applyTheme(data)
    } catch (e) {
      console.error(e)
      setError(e.message || 'Something went wrong while generating')
    } finally {
      setLoading(false)
    }
  }, [styleToken])

  // Apply theme on first paint for a pleasing default
  useEffect(() => {
    if (!design) {
      const root = document.documentElement
      root.style.setProperty('--primary', '#22d3ee')
      root.style.setProperty('--glow', 'rgba(34,211,238,0.65)')
    }
  }, [design])

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0b0f1a, #0b0d16)' }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_0%,rgba(34,211,238,.12),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_90%_20%,rgba(139,92,246,.10),transparent_40%)]" />

      <Header />

      <div className="max-w-5xl mx-auto px-6 pt-6">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">Describe your interface</h1>
        <p className="text-center text-cyan-200/80 mb-8">Natural language to high‑fidelity UI in seconds. Dark, neon, glassmorphic — FLAME style.</p>
        <PromptForm onGenerate={generate} loading={loading} styleToken={styleToken} onStyleTokenChange={setStyleToken} />
        {error && (
          <div className="mt-4 text-center text-sm text-red-300 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <StyleAnalyzer onToken={(t) => setStyleToken(t)} />

      {design && <Preview design={design} />}
      <Downloader design={design} />

      <style>{`
        .glass{ background: rgba(15,23,42,.55); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,.07); }
        .glow{ box-shadow: 0 0 40px var(--glow), 0 0 120px var(--glow) inset; }
      `}</style>
    </div>
  )
}

export default App
