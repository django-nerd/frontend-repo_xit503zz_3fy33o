import Spline from '@splinetool/react-spline'

export default function Preview({ design }) {
  if (!design) return null

  const hero = design.sections.find(s => s.kind === 'hero')
  const features = design.sections.find(s => s.kind === 'features')

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 pt-10 space-y-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-cyan-200/80 text-sm mb-2">AI Generated Preview</p>
          <h1 className="text-5xl font-bold leading-tight mb-4">{hero?.title}</h1>
          <p className="text-slate-300 mb-6">{hero?.subtitle}</p>
          <div className="flex items-center gap-4">
            <a className="px-5 py-3 rounded-xl shadow-[0_0_30px_var(--glow)]" style={{ background: 'var(--primary)' }}>Use this</a>
            <a className="px-5 py-3 rounded-xl glass">Regenerate</a>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-white/10">
          <Spline scene={design.spline_url} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="col-span-1 glass p-8 rounded-2xl">
          <h3 className="text-xl mb-4">{features?.title}</h3>
          <ul className="space-y-3">
            {features?.bullets?.map((b, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: design.primary }} />
                <span className="text-slate-300">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 grid sm:grid-cols-2 gap-6">
          <div className="h-48 rounded-2xl glass"></div>
          <div className="h-48 rounded-2xl glow"></div>
          <div className="h-48 rounded-2xl glow"></div>
          <div className="h-48 rounded-2xl glass"></div>
        </div>
      </div>
    </section>
  )
}
