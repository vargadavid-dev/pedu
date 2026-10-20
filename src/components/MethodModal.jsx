import { X, Heart, Clock, Users, Zap, Lightbulb, AlertTriangle, Wrench, Brain } from 'lucide-react'
import { useEffect } from 'react'

export default function MethodModal({ method, psychologyData, isFavorite, onToggleFavorite, onClose }) {
  const linkedPsych = psychologyData?.find(p => p.id === method.psychologyLink)

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in" onClick={onClose}>
      {/* Light Alabaster Backdrop with blur */}
      <div className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" />

      {/* Sheet Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-zinc-200 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col animate-scale-in"
      >
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur px-6 py-5 border-b border-zinc-150 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="badge-minimal font-mono uppercase text-[10px] tracking-wider bg-zinc-100 text-zinc-600">
              {method.category}
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-xs font-mono text-zinc-400">ID: {method.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(method.id)}
              className="p-2 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
              title={isFavorite ? 'Eltávolítás a kedvencekből' : 'Mentés a kedvencekhez'}
            >
              <Heart size={20} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Reading Area */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10">
          
          {/* Masthead Headline */}
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-zinc-900 tracking-tight mb-4">
              {method.name}
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
              {method.summary}
            </p>
          </div>

          {/* Quick Meta Stats Row */}
          <div className="flex flex-wrap gap-3 py-4 border-y border-zinc-150 font-mono text-xs text-zinc-700">
            <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-md border border-zinc-200/60">
              <Clock size={14} className="text-zinc-400" />
              <span>Időigény: <strong className="font-bold text-zinc-900">{method.timeEstimate}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-md border border-zinc-200/60">
              <Users size={14} className="text-zinc-400" />
              <span>Csoport: <strong className="font-bold text-zinc-900">{method.groupSize}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-md border border-zinc-200/60">
              <Zap size={14} className="text-amber-500" />
              <span>Energia: <strong className="font-bold text-zinc-900">{method.energy}</strong></span>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div>
            <h3 className="font-display font-bold text-lg text-zinc-900 uppercase tracking-wider text-xs font-mono mb-5">
              Megvalósítási Útmutató (Lépésről lépésre)
            </h3>
            <div className="space-y-4 border-l border-zinc-200 ml-3.5 pl-6 relative">
              {method.steps.map((step, i) => (
                <div key={i} className="relative group">
                  {/* Circle number dot */}
                  <span className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-zinc-900 text-white font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                  <p className="text-zinc-800 text-sm sm:text-base leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Psychology Link Callout */}
          {linkedPsych && (
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 relative">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
                <Brain size={16} className="text-indigo-600" />
                Pedagógiai-Pszichológiai Elméleti Háttér
              </div>
              <h4 className="font-display font-bold text-lg text-indigo-950 mb-1.5">
                {linkedPsych.name}
              </h4>
              <p className="text-sm text-indigo-900/80 font-serif italic leading-relaxed">
                "{linkedPsych.summary}"
              </p>
            </div>
          )}

          {/* Tools Required */}
          {method.tools && method.tools.length > 0 && (
            <div>
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <Wrench size={14} /> Szükséges Eszközök
              </h3>
              <div className="flex flex-wrap gap-2">
                {method.tools.map((tool, i) => (
                  <span key={i} className="bg-zinc-100 text-zinc-800 text-xs px-3 py-1.5 rounded-lg border border-zinc-200/80 font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pro Tips & Mistakes */}
          <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-150">
            {/* Pro Tips */}
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5">
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
                <Lightbulb size={15} className="text-emerald-600" /> Pro Tippek Tanároknak
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {method.proTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-5">
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5">
                <AlertTriangle size={15} className="text-amber-600" /> Gyakori Hibák
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
                {method.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="bg-zinc-50 border-t border-zinc-150 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">Pedu Tudástár</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Bezárás
          </button>
        </div>

      </div>
    </div>
  )
}
