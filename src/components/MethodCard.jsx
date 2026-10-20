import { Heart, Clock, Users, Zap, ArrowUpRight } from 'lucide-react'

export default function MethodCard({ method, isFavorite, onToggleFavorite, onOpenDetail }) {
  return (
    <div 
      onClick={() => onOpenDetail(method)}
      className="editorial-card group relative p-6 flex flex-col justify-between cursor-pointer bg-white"
    >
      <div>
        {/* Top Meta Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="badge-minimal font-mono uppercase tracking-wider text-[10px]">
            {method.category}
          </span>

          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(method.id) }}
            className="p-1.5 rounded-full text-zinc-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
            title={isFavorite ? 'Eltávolítás a kedvencekből' : 'Mentés a kedvencekhez'}
          >
            <Heart size={18} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />
          </button>
        </div>

        {/* Headline */}
        <h3 className="font-display font-bold text-lg text-zinc-900 group-hover:text-indigo-600 transition-colors tracking-tight mb-2 flex items-start justify-between">
          <span>{method.name}</span>
          <ArrowUpRight size={18} className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-zinc-400 flex-shrink-0 ml-2" />
        </h3>

        {/* Summary */}
        <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3 mb-6">
          {method.summary}
        </p>
      </div>

      <div>
        {/* Badges Grid */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-100 font-mono text-xs text-zinc-500 mb-3">
          <span className="inline-flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded text-zinc-700">
            <Clock size={12} className="text-zinc-400" /> {method.timeEstimate}
          </span>
          <span className="inline-flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded text-zinc-700">
            <Users size={12} className="text-zinc-400" /> {method.groupSize}
          </span>
          <span className="inline-flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded text-zinc-700">
            <Zap size={12} className="text-amber-500" /> {method.energy}
          </span>
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1">
          {method.subjects.map(sub => (
            <span key={sub} className="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
              #{sub}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
