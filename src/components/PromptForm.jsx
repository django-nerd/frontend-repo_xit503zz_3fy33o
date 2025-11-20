import { useEffect, useMemo, useState } from 'react'

export default function PromptForm({ onGenerate, loading, styleToken, onStyleTokenChange }) {
  const [prompt, setPrompt] = useState(
    'Generate a futuristic dark-themed landing page for a Web3 gaming platform with neon green highlights and a central 3D graphic.'
  )
  const [live, setLive] = useState(true)

  // Debounce utility
  const debounce = (fn, delay) => {
    let t
    return (...args) => {
      clearTimeout(t)
      t = setTimeout(() => fn(...args), delay)
    }
  }

  const debouncedGenerate = useMemo(() => debounce((p) => onGenerate(p, { styleToken }), 500), [onGenerate, styleToken])

  useEffect(() => {
    if (live && prompt.trim()) {
      debouncedGenerate(prompt.trim())
    }
  }, [prompt, live, debouncedGenerate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    onGenerate(prompt.trim(), { styleToken })
  }

  return (
    <form onSubmit={handleSubmit} className="relative z-10 max-w-3xl mx-auto w-full">
      <div className="glass rounded-2xl p-2 flex gap-2 items-center">
        <input
          className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400 px-4 py-3"
          placeholder="Describe the UI you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl font-semibold text-slate-900 disabled:opacity-60"
          style={{ background: 'var(--primary)' }}
        >
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </div>

      <div className="flex items-center justify-between mt-2 px-1">
        <label className="flex items-center gap-2 text-sm text-cyan-200/80">
          <input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} />
          Live preview
        </label>
        {typeof styleToken === 'string' && styleToken.length > 0 ? (
          <div className="text-xs text-cyan-200/70 truncate max-w-[60%]" title={styleToken}>
            Style profile applied
          </div>
        ) : (
          <button type="button" onClick={() => onStyleTokenChange?.('')} className="text-xs text-cyan-200/60 hover:text-cyan-200/90">
            Use style analyzer below to influence colors
          </button>
        )}
      </div>
    </form>
  )
}
