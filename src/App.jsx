import { useState } from 'react'
import Header from './components/Header'
import PromptForm from './components/PromptForm'
import Preview from './components/Preview'
import Downloader from './components/Downloader'

function App() {
  const [design, setDesign] = useState(null)
  const [loading, setLoading] = useState(false)

  const generate = async (prompt) => {
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setDesign(data)
      // set CSS variables for theme
      const root = document.documentElement
      root.style.setProperty('--primary', data.primary)
      root.style.setProperty('--glow', data.neon_glow)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0b0f1a, #0b0d16)' }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_0%,rgba(34,211,238,.12),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_90%_20%,rgba(139,92,246,.10),transparent_40%)]" />

      <Header />

      <div className="max-w-5xl mx-auto px-6 pt-6">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">Describe your interface</h1>
        <p className="text-center text-cyan-200/80 mb-8">Natural language to high‑fidelity UI in seconds. Dark, neon, glassmorphic — FLAME style.</p>
        <PromptForm onGenerate={generate} loading={loading} />
      </div>

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
