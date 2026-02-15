import { AlertTriangle, Users, Brain, Shield } from 'lucide-react'

interface Props {
  onScrollToCalculator: () => void
  onScrollToSearch: () => void
}

export default function HeroSection({ onScrollToCalculator, onScrollToSearch }: Props) {
  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 rounded-full px-4 py-1.5 mb-6">
            <AlertTriangle className="h-4 w-4 text-amber-300" />
            <span className="text-sm font-medium text-amber-200">Obligation legale — entreprises de 20+ salaries</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
            4 752 &euro; par poste manquant.
            <br />
            <span className="text-blue-200">Chaque annee.</span>
          </h2>

          <p className="text-lg text-blue-100 mb-4 max-w-2xl mx-auto">
            65% des entreprises ne respectent pas leur obligation d'emploi de travailleurs handicapes.
            Fin des accords agrees en 2026, suppression des abattements en 2025.
          </p>
          <p className="text-xl font-semibold text-white mb-8">
            Ne restez pas du mauvais cote.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={onScrollToCalculator}
              className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-8 py-3.5 rounded-lg transition-colors text-lg shadow-lg"
            >
              Calculer ma penalite OETH
            </button>
            <button
              onClick={onScrollToSearch}
              className="bg-white/10 hover:bg-white/20 border border-white/30 font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
            >
              Decouvrir les profils RQTH
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg px-4 py-3">
              <Users className="h-5 w-5 text-blue-200" />
              <span>700+ candidats RQTH actifs</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg px-4 py-3">
              <Brain className="h-5 w-5 text-blue-200" />
              <span>Matching IA semantique</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg px-4 py-3">
              <Shield className="h-5 w-5 text-blue-200" />
              <span>100% anonymise & RGPD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
