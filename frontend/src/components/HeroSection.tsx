import { Sparkles, Shield, Brain } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trouvez le candidat ideal grace a l'IA
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Notre moteur de recherche semantique comprend le sens de votre recherche,
            pas seulement les mots-cles. Testez-le sur nos profils anonymises.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg px-4 py-3">
              <Brain className="h-5 w-5 text-blue-200" />
              <span>Recherche semantique IA</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg px-4 py-3">
              <Shield className="h-5 w-5 text-blue-200" />
              <span>Profils 100% anonymises</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg px-4 py-3">
              <Sparkles className="h-5 w-5 text-blue-200" />
              <span>Matching intelligent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
