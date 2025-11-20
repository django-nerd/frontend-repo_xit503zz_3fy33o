import { useState } from 'react'

export default function PromptForm({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState(
    'Generate a futuristic dark-themed landing page for a Web3 gaming platform with neon green highlights and a central 3D graphic.'
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    onGenerate(prompt.trim())
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
    </form>
  )
}
