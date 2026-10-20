import { useState, useMemo } from 'react'
import { useFavorites } from './hooks/useStorage'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryFilters from './components/CategoryFilters'
import MethodCard from './components/MethodCard'
import MethodModal from './components/MethodModal'
import PsychologyCard from './components/PsychologyCard'
import FavoritesSection from './components/FavoritesSection'
import VibePlanner from './components/VibePlanner'

import methodsData from './data/methods.json'
import psychologyData from './data/psychology.json'

export default function App() {
  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites()

  const [activeSection, setActiveSection] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSubject, setActiveSubject] = useState('Mind')
  const [activeCategory, setActiveCategory] = useState('Mind')
  const [selectedMethod, setSelectedMethod] = useState(null)

  // Daily tip
  const dailyTip = useMemo(() => {
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 0)
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24))
    return methodsData[dayOfYear % methodsData.length]
  }, [])

  // Filtered methods
  const filteredMethods = useMemo(() => {
    return methodsData.filter(m => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          m.name.toLowerCase().includes(q) ||
          m.summary.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.subjects.some(s => s.toLowerCase().includes(q))
        if (!matches) return false
      }

      // Subject
      if (activeSubject !== 'Mind' && !m.subjects.includes(activeSubject)) {
        return false
      }

      // Category
      if (activeCategory !== 'Mind' && m.category !== activeCategory) {
        return false
      }

      return true
    })
  }, [searchQuery, activeSubject, activeCategory])

  const handleSectionChange = (section) => {
    setActiveSection(section)
    if (section === 'home' || section === 'methods') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    if (activeSection !== 'methods' && activeSection !== 'home') {
      setActiveSection('home')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8f8f7] text-[#18181b]">

      <div>
        <Header
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          favoriteCount={favorites.length}
        />

        {/* Hero (home & methods) */}
        {(activeSection === 'home' || activeSection === 'methods') && (
          <Hero
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            dailyTip={dailyTip}
            onOpenTipDetail={setSelectedMethod}
          />
        )}

        {/* METHODS & FILTERS */}
        {(activeSection === 'home' || activeSection === 'methods') && (
          <>
            <CategoryFilters
              activeSubject={activeSubject}
              activeCategory={activeCategory}
              onSubjectChange={setActiveSubject}
              onCategoryChange={setActiveCategory}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/80 pb-5 mb-8">
                <div>
                  <h2 className="section-headline text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Módszertani Adatbázis
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1">
                    Azonnal bevethető gyakorlatok, óratervek és jégtörők
                  </p>
                </div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {filteredMethods.length} találat
                </div>
              </div>

              {filteredMethods.length === 0 ? (
                <div className="text-center py-20 bg-white border border-zinc-200 rounded-2xl max-w-lg mx-auto shadow-sm">
                  <p className="font-display font-bold text-lg text-zinc-800 mb-1">
                    Nincs a feltételeknek megfelelő módszer
                  </p>
                  <p className="text-sm text-zinc-500">
                    Próbálj meg törölni a keresőszóból vagy válts vissza "Mind" kategóriára.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMethods.map(method => (
                    <MethodCard
                      key={method.id}
                      method={method}
                      isFavorite={isFavorite(method.id)}
                      onToggleFavorite={toggleFavorite}
                      onOpenDetail={setSelectedMethod}
                    />
                  ))}
                </div>
              )}
            </main>

            {/* Psychology Preview on Home */}
            {activeSection === 'home' && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/80 pb-5 mb-8">
                  <div>
                    <h2 className="section-headline text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Pedagógiai-Pszichológiai Súgó
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1">
                      A háttérben meghúzódó mentális elvek és kiégésmegelőzés
                    </p>
                  </div>
                  <button 
                    onClick={() => handleSectionChange('psychology')}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 hover:underline cursor-pointer"
                  >
                    Összes elmélet ({psychologyData.length}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {psychologyData.map(item => (
                    <PsychologyCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* AI VIBE PLANNER SECTION */}
        {activeSection === 'planner' && (
          <VibePlanner onOpenMethodDetail={setSelectedMethod} />
        )}

        {/* PSYCHOLOGY DEDICATED SECTION */}
        {activeSection === 'psychology' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="border-b border-zinc-200 pb-6 mb-10">
              <h2 className="section-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                Pedagógiai-Pszichológiai Tudástár
              </h2>
              <p className="text-base text-zinc-600 max-w-2xl">
                Modern óravezetési elméletek, önbeteljesítő jóslatok és mentálhigiénés útmutatók tanároknak.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {psychologyData.map(item => (
                <PsychologyCard key={item.id} item={item} />
              ))}
            </div>
          </main>
        )}

        {/* FAVORITES DEDICATED SECTION */}
        {activeSection === 'favorites' && (
          <FavoritesSection
            methods={methodsData}
            psychology={psychologyData}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenDetail={setSelectedMethod}
          />
        )}
      </div>

      {/* METHOD MODAL */}
      {selectedMethod && (
        <MethodModal
          method={selectedMethod}
          psychologyData={psychologyData}
          isFavorite={isFavorite(selectedMethod.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedMethod(null)}
        />
      )}

      {/* Swiss Editorial Footer */}
      <footer className="border-t border-[#e5e5e4] bg-white py-10 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-black text-white font-display font-bold flex items-center justify-center rounded">P</span>
            <span className="font-bold text-zinc-900">Pedu Tudástár</span>
          </div>
          <p>Tervezve Antigravity ágenssel · Swiss Minimalist Edition · 2026</p>
        </div>
      </footer>

    </div>
  )
}
