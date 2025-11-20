export default function Downloader({ design }) {
  if (!design) return null

  const handleDownload = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/api/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ design }),
    })
    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-ui.zip'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleDownloadReact = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/api/export/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ design }),
    })
    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-react-ui.zip'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
      <div className="glass rounded-2xl px-6 py-5 flex items-center justify-between flex-col sm:flex-row gap-3">
        <div className="text-center sm:text-left">
          <p className="text-white font-medium">Your design is ready</p>
          <p className="text-slate-300 text-sm">Download the complete project</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleDownload} className="px-5 py-2.5 rounded-xl font-semibold text-slate-900" style={{ background: 'var(--primary)' }}>
            Download HTML
          </button>
          <button onClick={handleDownloadReact} className="px-5 py-2.5 rounded-xl font-semibold text-slate-900/90 bg-white/10 border border-white/10">
            Download React
          </button>
        </div>
      </div>
    </div>
  )
}
