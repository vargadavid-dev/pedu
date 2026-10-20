import { useState } from 'react'
import { Sparkles, ArrowRight, Copy, Check, Clock, BookOpen, RefreshCw, Wand2, MessageSquare } from 'lucide-react'
import methodsData from '../data/methods.json'

const SAMPLE_PROMPTS = [
  "8. osztály, péntek 6. óra, történelem: hőség van és fáradtak. Téma: Ipari forradalom mozgalmasan.",
  "10. osztály, szerda reggel 8:00, matematika. Kába társaság, téma: Másodfokú egyenletek bevezetése.",
  "5. osztály, osztályfőnöki óra: konfliktus volt a szünetben, feszült a hangulat a diákok között."
]

export default function VibePlanner({ onOpenMethodDetail }) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)
  const [generatedPlan, setGeneratedPlan] = useState(null)
  const [copied, setCopied] = useState(false)

  const SIMULATION_STEPS = [
    "Diákok energiaszintjének és a terhelésnek analizálása...",
    "0-5. perc: Ráhangoló légkörteremtési technika kiválasztása...",
    "5-15. perc: Kíváncsiságfelkeltő páros gondolkodás beillesztése...",
    "15-30. perc: Mozgásos, aktív csoportos feldolgozás tervezése...",
    "30-40. perc: Szintézis és állásfoglalás összerendezése...",
    "40-45. perc: Villámgyors lezáró reflexió harmonizálása..."
  ]

  const handleGenerate = (customText) => {
    const inputText = typeof customText === 'string' ? customText : prompt
    if (!inputText || !inputText.trim()) return

    if (typeof customText === 'string') {
      setPrompt(customText)
    }

    setIsGenerating(true)
    setSimulationStep(0)
    setGeneratedPlan(null)

    // Simulate AI reasoning timeline step by step
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step < SIMULATION_STEPS.length) {
        setSimulationStep(step)
      } else {
        clearInterval(interval)
        setIsGenerating(false)
        generateFivePhasePlan(inputText)
      }
    }, 400)
  }

  const generateFivePhasePlan = (inputPrompt) => {
    const getMethod = (id) => methodsData.find(m => m.id === id) || methodsData[0]

    // Determine context clues from prompt
    const lower = inputPrompt.toLowerCase()
    const isTired = lower.includes('fáradt') || lower.includes('hőség') || lower.includes('péntek') || lower.includes('kába')
    const isConflict = lower.includes('konfliktus') || lower.includes('feszült')
    const isMath = lower.includes('matematika') || lower.includes('egyenlet') || lower.includes('reál')

    // 5-Phase structure (45 minutes total)
    const phases = [
      {
        time: "0–5. perc",
        phaseName: "Ráhangolódás & Jégtörés",
        method: isConflict ? getMethod('m9') : (isTired ? getMethod('m4') : getMethod('m9')),
        teacherInstruction: isConflict 
          ? "Kérd meg a diákokat, hogy szavak nélkül, a Hangulat-hőmérőn jelöljék, milyen belső feszültséget éreznek épp. Ezzel oldod a nyomást a téma előtt."
          : "Egy gyors ál-állításos jégtörővel kapcsold be a figyelmet: mondj 2 meglepő tényt és 1 hazugságot a mai témakörből (pl. találmányok vagy képletek)."
      },
      {
        time: "5–15. perc",
        phaseName: "Tudásaktiválás & Problémafelvetés",
        method: isMath ? getMethod('m2') : getMethod('m1'),
        teacherInstruction: isMath
          ? "Írj fel egy látszólag megoldhatatlan másodfokú problémát a táblára. 2 perc csendes gondolkodás után padtárssal kell vitatkozniuk a lehetséges megoldásról."
          : "Edward de Bono 6 kalapja közül válasszátok ki a Fehér (tények) és a Sárga (lehetőségek) kalapot az új tananyag bevezető vitájához."
      },
      {
        time: "15–30. perc",
        phaseName: "Mozgásos Főaktív Feldolgozás",
        method: isTired ? getMethod('m5') : getMethod('m6'),
        teacherInstruction: isTired
          ? "A terem 4 sarkába helyezz ki posztereket vagy forrásokat a tananyagról! A fáradt diákoknak muszáj felállniuk és kis csoportokban sétálva elemezniük."
          : "Forgószínpad stílusban adogassák körbe a csoportlapokat, minden állomáson 3 perccel bővítve a közös gondolattérképet."
      },
      {
        time: "30–40. perc",
        phaseName: "Szintézis & Állásfoglalás / Gyakorlás",
        method: isConflict ? getMethod('m10') : getMethod('m8'),
        teacherInstruction: isConflict
          ? "A 4 sarok módszerrel mindenki álljon oda ahhoz az állításhoz, amivel az órai téma kapcsán a leginkább egyetért, majd kulturáltan érveljenek egymásnak."
          : "Kérj fel 2 diákot, hogy 5 percre vegyék át a tanár szerepét, és ők tegyék fel a legnehezebb keresztkérdéseket az osztálynak!"
      },
      {
        time: "40–45. perc",
        phaseName: "Lezárás & Összegző Reflexió",
        method: getMethod('m3'),
        teacherInstruction: "Kivesző papírfecnikre vagy digitális felületre írjanak fel 1 dolgot, amit ma megértettek, és 1 kérdést, ami tisztázatlan maradt bennük."
      }
    ]

    setGeneratedPlan({
      promptTitle: inputPrompt,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      phases
    })
  }

  const handleCopyPlan = () => {
    if (!generatedPlan) return
    const text = `🧠 PEDU AI ÓRATERV (45 perc - 5 fázis)\nKiinduló helyzet: "${generatedPlan.promptTitle}"\n\n` +
      generatedPlan.phases.map(p => 
        `⏱️ ${p.time} | ${p.phaseName}\n📌 Módszer: ${p.method.name}\n💡 Tanári instrukció: ${p.teacherInstruction}\n`
      ).join('\n---\n')

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Title Header */}
      <div className="border-b border-zinc-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold uppercase tracking-widest mb-2.5">
            <Sparkles size={12} className="text-indigo-600" />
            AI Óradramaturgia Generátor
          </div>
          <h1 className="section-headline text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Vibe Planner
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 mt-1">
            Írd le természetes nyelven az osztályt és a hangulatot – az AI megtervezi a 45 perces, 5 fázisú forgatókönyvet.
          </p>
        </div>
      </div>

      {/* Input Box Card */}
      <div className="editorial-card p-6 sm:p-8 bg-white mb-10 shadow-sm">
        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2.5 flex items-center gap-1.5">
          <MessageSquare size={14} className="text-zinc-400" />
          Milyen osztályba mész most és mi a kihívás?
        </label>
        
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="pl. 7. osztály, péntek utolsó óra, fizika. Fáradt és nyüzsgő csoport, az energia megmaradásról kellene egy interaktív óra..."
          className="w-full p-4 rounded-xl border border-zinc-300 text-zinc-900 text-sm sm:text-base outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 resize-none mb-4 bg-[#f8f8f7]"
        />

        {/* Generate Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !prompt.trim()}
              className="px-6 py-3 bg-zinc-900 hover:bg-black disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wand2 size={16} className={isGenerating ? "animate-spin text-amber-400" : "text-amber-400"} />
              <span>{isGenerating ? "Óradramaturgia tervezése..." : "✨ 5 fázisú óraterv generálása"}</span>
            </button>
          </div>
        </div>

        {/* Sample Prompt Chips */}
        <div className="mt-6 pt-5 border-t border-zinc-150">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
            vagy próbáld ki 1 kattintással a mintahelyzetek egyikét:
          </span>
          <div className="flex flex-col sm:flex-row gap-2.5">
            {SAMPLE_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleGenerate(sample)}
                className="text-left text-xs bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 px-3.5 py-2.5 rounded-xl border border-zinc-200/80 transition-colors flex items-start gap-2 cursor-pointer leading-relaxed flex-1"
              >
                <span className="font-mono font-bold text-indigo-600 mt-0.5">#{idx + 1}</span>
                <span>{sample}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Generating Animation State */}
      {isGenerating && (
        <div className="editorial-card p-8 bg-white text-center animate-pulse my-8">
          <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="animate-spin" />
          </div>
          <h3 className="font-display font-bold text-lg text-zinc-900 mb-2">
            AI Pedagógiai Szintézis folyamatban...
          </h3>
          <p className="font-mono text-xs text-indigo-600 uppercase tracking-widest">
            {SIMULATION_STEPS[simulationStep]}
          </p>
        </div>
      )}

      {/* Generated 5-Phase Plan Output */}
      {generatedPlan && !isGenerating && (
        <div className="space-y-6 animate-slide-up pt-2">
          
          {/* Plan Header Bar */}
          <div className="editorial-card p-6 bg-white border-l-4 border-l-[#ea580c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#ea580c]">
                  💡 Elkészült 45 perces forgatókönyv (5 Fázis)
                </span>
                <span className="text-zinc-300">·</span>
                <span className="font-mono text-xs text-zinc-400">{generatedPlan.createdAt}</span>
              </div>
              <h2 className="font-display font-bold text-lg text-zinc-900">
                "{generatedPlan.promptTitle}"
              </h2>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={handleCopyPlan}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-xl border border-zinc-200/80 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? "Másolva!" : "Másolás vágólapra"}</span>
              </button>
              <button
                onClick={() => handleGenerate(generatedPlan.promptTitle)}
                className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-xl transition-colors cursor-pointer"
                title="Újragenerálás más módszerekkel"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* 5-Phase Timeline Card Grid */}
          <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-zinc-200">
            {generatedPlan.phases.map((phase, idx) => (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                
                {/* Phase Badge Circle */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-zinc-900 text-white flex flex-col items-center justify-center flex-shrink-0 z-10 shadow-sm border-4 border-[#f8f8f7]">
                  <span className="font-mono font-bold text-xs sm:text-sm text-amber-400">{idx + 1}.</span>
                  <span className="text-[9px] font-mono uppercase tracking-tighter text-zinc-300 font-semibold">fázis</span>
                </div>

                {/* Phase Content Box */}
                <div className="editorial-card p-5 sm:p-6 bg-white flex-1 transition-all group-hover:border-zinc-400">
                  
                  {/* Phase Time & Title */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded font-bold">
                        <Clock size={12} className="text-zinc-500" /> {phase.time}
                      </span>
                      <span className="text-zinc-400">|</span>
                      <span className="font-bold text-zinc-600 uppercase tracking-wider">{phase.phaseName}</span>
                    </div>

                    <button
                      onClick={() => onOpenMethodDetail(phase.method)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <BookOpen size={13} /> Teljes módszerleírás →
                    </button>
                  </div>

                  {/* Method Name */}
                  <h3 className="font-display font-bold text-lg text-zinc-900 mb-2">
                    {phase.method.name}
                  </h3>

                  {/* Teacher Customized Instruction */}
                  <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3.5 text-xs sm:text-sm text-amber-950 leading-relaxed font-normal">
                    <strong className="font-bold text-amber-900 uppercase font-mono text-[11px] block mb-1">
                      💡 Tanári alkalmazási instrukció ehhez az órához:
                    </strong>
                    {phase.teacherInstruction}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </section>
  )
}
