import { Brain, ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import { useState } from 'react'

export default function PsychologyCard({ item }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="editorial-card p-6 sm:p-8 bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
            <Brain size={13} /> Alapvetés
          </span>
          <span className="font-mono text-xs text-zinc-400">#{item.id}</span>
        </div>

        <h3 className="font-display font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight mb-3">
          {item.name}
        </h3>

        <p className="text-sm sm:text-base text-zinc-600 font-serif italic leading-relaxed mb-6">
          "{item.summary}"
        </p>

        {expanded && (
          <div className="space-y-6 pt-6 border-t border-zinc-150 animate-fade-in text-sm text-zinc-700 leading-relaxed">
            <p className="font-normal">
              {item.description}
            </p>

            {item.examples && item.examples.length > 0 && (
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5">
                <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-zinc-500 mb-3.5 flex items-center gap-1.5">
                  <BookOpen size={14} /> Tantermi Gyakorlati Példák:
                </h4>
                <ul className="space-y-2.5">
                  {item.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                      <span className="font-mono font-bold text-indigo-600 bg-indigo-100/60 px-1.5 rounded text-[10px] mt-0.5">
                        {i + 1}
                      </span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-6 mt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          {expanded ? (
            <>Összecsukás <ChevronUp size={14} /></>
          ) : (
            <>Teljes elmélet elolvasása <ChevronDown size={14} /></>
          )}
        </button>
      </div>
    </div>
  )
}
