import { useState, useEffect, useRef } from 'react'
import { Calculator, AlertTriangle, ArrowDown } from 'lucide-react'

interface Props {
  onScrollToSearch: () => void
}

const getRate = (effectif: number): number => {
  if (effectif >= 750) return 7212   // 600 x 12.02 EUR SMIC 2026
  if (effectif >= 250) return 6010   // 500 x 12.02 EUR
  return 4808                        // 400 x 12.02 EUR
}

const getSurcontributionRate = (effectif: number): number => {
  // Apres 3 ans de non-conformite totale (0 TH) : 1500 x SMIC horaire
  return 18030 // 1500 x 12.02 EUR
}

const formatEuro = (n: number): string =>
  n.toLocaleString('fr-FR') + ' \u20ac'

function useAnimatedCounter(target: number, duration = 800): number {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (target === 0) { setValue(0); return }

    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration])

  return value
}

export default function OethCalculator({ onScrollToSearch }: Props) {
  const [effectif, setEffectif] = useState<string>('')
  const [actuels, setActuels] = useState<string>('0')
  const [calculated, setCalculated] = useState(false)

  const effectifNum = parseInt(effectif) || 0
  const actuelsNum = parseInt(actuels) || 0

  const objectif = Math.ceil(effectifNum * 0.06)
  const manquants = Math.max(0, objectif - actuelsNum)
  const rate = getRate(effectifNum)
  const penalite = manquants * rate
  const surcontribution = manquants * getSurcontributionRate(effectifNum)

  const animatedPenalite = useAnimatedCounter(calculated ? penalite : 0)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (effectifNum >= 20) {
      setCalculated(true)
    }
  }

  const showSurcontributionWarning = calculated && actuelsNum === 0 && manquants > 0

  return (
    <div className="card-warning card card-body" id="calculator">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
          <Calculator className="h-6 w-6 text-amber-700" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Calculateur de penalite OETH</h3>
          <p className="text-sm text-gray-600">Estimez votre contribution Agefiph 2026</p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Effectif total de l'entreprise
          </label>
          <input
            type="number"
            className="input"
            min="20"
            placeholder="Ex: 100"
            value={effectif}
            onChange={e => { setEffectif(e.target.value); setCalculated(false) }}
          />
          <p className="text-xs text-gray-400 mt-1">Minimum 20 salaries (seuil OETH)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Travailleurs handicapes employes
          </label>
          <input
            type="number"
            className="input"
            min="0"
            placeholder="0"
            value={actuels}
            onChange={e => { setActuels(e.target.value); setCalculated(false) }}
          />
          <p className="text-xs text-gray-400 mt-1">Nombre actuel de BOETH dans l'entreprise</p>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={effectifNum < 20}
            className="btn-primary w-full sm:w-auto"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculer ma penalite
          </button>
        </div>
      </form>

      {calculated && effectifNum >= 20 && (
        <div className="border-t border-amber-200 pt-6">
          {manquants === 0 ? (
            <div className="text-center py-4">
              <p className="text-2xl font-bold text-green-600">Felicitations !</p>
              <p className="text-gray-600 mt-2">
                Votre entreprise respecte son obligation OETH de {objectif} travailleur{objectif > 1 ? 's' : ''} handicape{objectif > 1 ? 's' : ''}.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Votre penalite annuelle estimee</p>
                <p className="text-4xl lg:text-5xl font-extrabold text-red-600">
                  {formatEuro(animatedPenalite)}
                  <span className="text-lg font-normal text-red-400"> / an</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-2xl font-bold text-gray-900">{objectif}</p>
                  <p className="text-xs text-gray-500">Objectif OETH (6%)</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-2xl font-bold text-red-600">{manquants}</p>
                  <p className="text-xs text-gray-500">Poste{manquants > 1 ? 's' : ''} manquant{manquants > 1 ? 's' : ''}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-2xl font-bold text-gray-900">{formatEuro(rate)}</p>
                  <p className="text-xs text-gray-500">Cout unitaire / poste</p>
                </div>
              </div>

              {showSurcontributionWarning && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      Surcontribution apres 3 ans de non-conformite
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      Sans aucun travailleur handicape pendant 3 ans, le cout passe a{' '}
                      <strong>{formatEuro(surcontribution)} / an</strong> (18 030 &euro; par poste).
                    </p>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={onScrollToSearch}
                  className="btn-primary text-lg px-8 py-3"
                >
                  <ArrowDown className="h-5 w-5 mr-2" />
                  Trouvez vos candidats RQTH maintenant
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Recherche semantique IA parmi nos profils anonymises
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
