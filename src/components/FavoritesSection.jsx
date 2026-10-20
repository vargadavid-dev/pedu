import { Heart, Bookmark } from 'lucide-react'
import MethodCard from './MethodCard'
import PsychologyCard from './PsychologyCard'

export default function FavoritesSection({ methods, psychology, favorites, onToggleFavorite, onOpenDetail }) {
  const favMethods = methods.filter(m => favorites.includes(m.id))
  const favPsych = psychology.filter(p => favorites.includes(p.id))

  const isEmpty = favMethods.length === 0 && favPsych.length === 0

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-zinc-200 pb-6 mb-10 flex items-center justify-between">
        <div>
          <h2 className="section-headline text-2xl sm:text-3xl font-extrabold mb-1.5 flex items-center gap-2">
            <Bookmark className="text-rose-600" /> Elmentett Gyűjteményem
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            A könyvjelzőzött óravezetési gyakorlataid és mentálhigiénés alapelveid
          </p>
        </div>
        <div className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest hidden sm:block">
          {favorites.length} elem mentve
        </div>
      </div>

      {isEmpty ? (
        <div className="text-center py-20 bg-white border border-zinc-200/80 rounded-2xl shadow-sm max-w-xl mx-auto">
          <Heart size={40} className="mx-auto mb-4 text-zinc-300 font-light" />
          <h3 className="font-display font-bold text-lg text-zinc-800 mb-1">
            Még üres a gyűjteményed
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
            Böngéssz a módszerek között, és kattints a kártyák jobb felső sarkában lévő szív ikonra a mentéshez.
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {favMethods.length > 0 && (
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                Gyakorlati Módszerek ({favMethods.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favMethods.map(method => (
                  <MethodCard
                    key={method.id}
                    method={method}
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                    onOpenDetail={onOpenDetail}
                  />
                ))}
              </div>
            </div>
          )}

          {favPsych.length > 0 && (
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                Pszichológiai Alapelvek ({favPsych.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favPsych.map(item => (
                  <PsychologyCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
