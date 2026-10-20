import { BookOpen, Brain, Heart, Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'methods', label: 'Módszerek' },
  { id: 'planner', label: 'AI Óratervező ✨' },
  { id: 'psychology', label: 'Pszichológia' },
  { id: 'favorites', label: 'Kedvencek' },
]

export default function Header({ activeSection, onSectionChange, favoriteCount }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e5e5e4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onSectionChange('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#18181b] text-white flex items-center justify-center font-display font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-extrabold tracking-tight text-[#18181b]">
                Pedu
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-400">
                Tudástár
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id || (activeSection === 'home' && id === 'methods')
              return (
                <button
                  key={id}
                  onClick={() => onSectionChange(id)}
                  className={`relative py-2 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5
                    ${isActive ? 'text-[#18181b]' : 'text-zinc-500 hover:text-[#18181b]'}`}
                >
                  <span>{label}</span>
                  {id === 'favorites' && favoriteCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-zinc-100 text-zinc-700 font-bold">
                      {favoriteCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#18181b] rounded-full animate-scale-in" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Menü"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-zinc-100 flex flex-col gap-2 animate-fade-in">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id
              return (
                <button
                  key={id}
                  onClick={() => { onSectionChange(id); setMobileOpen(false) }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer
                    ${isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
                >
                  <span>{label}</span>
                  {id === 'favorites' && favoriteCount > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-mono
                      ${isActive ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-800'}`}>
                      {favoriteCount}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
