import { Sparkles } from "lucide-react"

export default function Header() {
  return (
    <header className="relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,.45)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold leading-none">FLAME Designer</p>
            <p className="text-xs text-cyan-200/70">AI UI/UX Generator</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-cyan-200/70">
          <a href="/test" className="text-sm hover:text-white transition-colors">System Test</a>
          <a href="https://flames.blue" target="_blank" className="text-sm hover:text-white transition-colors">Inspiration</a>
        </div>
      </div>
    </header>
  )
}
