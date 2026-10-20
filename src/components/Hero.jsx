import { Search, Sparkles, ArrowRight } from 'lucide-react'

export default function Hero({ searchQuery, onSearchChange, dailyTip, onOpenTipDetail }) {
  return (
    <section className="relative border-b border-[#e5e5e4] bg-[#f8f8f7] pt-12 pb-16 sm:pt-16 sm:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-200/60 text-zinc-700 font-mono text-[11px] font-bold uppercase tracking-widest mb-6">
          <Sparkles size={13} className="text-amber-600" />
          Korszerű Óravezetési Tudástár
        </div>

        {/* Masthead Headline */}
        <h1 className="masthead-title text-4xl sm:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto">
          Inspiráló módszerek,{' '}
          <span className="font-serif italic font-normal text-zinc-800">
            pszichológiai
          </span>{' '}
          mélységgel.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Tantárgyakon átívelő gyakorlatok az azonnali tantermi bevetéshez — megnyugtató, mentálhigiénés háttérrel.
        </p>

        {/* Minimalist Prominent Search Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center shadow-sm">
            <Search size={20} className="absolute left-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Keresés: 'csoportmunka', 'figyelemhiány', 'kilépőjegy'..."
              className="w-full bg-white pl-12 pr-16 py-4 rounded-xl border border-zinc-300 text-zinc-900 text-base sm:text-lg font-medium placeholder:text-zinc-400 outline-none transition-all duration-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
            <div className="absolute right-3 hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 border border-zinc-200 text-zinc-500 font-mono text-xs font-semibold pointer-events-none">
              ⌘K
            </div>
          </div>
        </div>

        {/* Editorial Daily Tip Spotlight */}
        {dailyTip && (
          <div 
            onClick={() => onOpenTipDetail(dailyTip)}
            className="max-w-2xl mx-auto text-left bg-white border border-zinc-200/90 hover:border-zinc-400 rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Left Terracotta accent line */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#ea580c]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#ea580c]">
                    💡 Napi Módszertani Tipp
                  </span>
                  <span className="text-zinc-300">·</span>
                  <span className="text-xs font-medium text-zinc-500">{dailyTip.timeEstimate}</span>
                </div>
                
                <h3 className="font-display font-bold text-lg text-zinc-900 group-hover:text-[#ea580c] transition-colors mb-1">
                  {dailyTip.name}
                </h3>
                
                <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                  {dailyTip.summary}
                </p>
              </div>

              <div className="flex sm:flex-col items-center justify-end flex-shrink-0 pt-2 sm:pt-0">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 group-hover:translate-x-1 transition-transform">
                  Megnézem <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
