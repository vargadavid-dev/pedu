const SUBJECT_FILTERS = ['Mind', 'Humán', 'Reál', 'Művészet/Készség', 'Általános']
const CATEGORY_FILTERS = ['Mind', 'Jégtörő', 'Levezetés', 'Projektmunka', 'Konfliktuskezelés', 'Általános']

export default function CategoryFilters({ activeSubject, activeCategory, onSubjectChange, onCategoryChange }) {
  return (
    <div className="border-b border-[#e5e5e4] bg-[#f8f8f7] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Subject Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 min-w-[120px]">
            Tantárgyi irány:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SUBJECT_FILTERS.map(subject => {
              const isActive = activeSubject === subject
              return (
                <button
                  key={subject}
                  onClick={() => onSubjectChange(subject)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
                    ${isActive 
                      ? 'bg-[#18181b] text-white shadow-sm' 
                      : 'bg-zinc-200/70 text-zinc-600 hover:bg-zinc-300/80 hover:text-zinc-900'}`}
                >
                  {subject}
                </button>
              )
            })}
          </div>
        </div>

        {/* Category Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 min-w-[120px]">
            Pedagógiai cél:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_FILTERS.map(cat => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
                    ${isActive 
                      ? 'bg-[#4f46e5] text-white shadow-sm' 
                      : 'bg-zinc-200/70 text-zinc-600 hover:bg-zinc-300/80 hover:text-zinc-900'}`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
