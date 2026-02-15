export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-gray-500">
          <p className="font-medium text-gray-700">CV-H — Recrutement inclusif, propulse par l'IA</p>
          <p className="mt-1">
            Tous les profils affiches sont anonymises. Aucune donnee personnelle n'est accessible sans le consentement explicite du candidat.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Conforme RGPD | Chiffrement AES-256 | Donnees hebergees en France
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Conforme a l'obligation d'emploi des travailleurs handicapes (Art. L5212-1 du Code du travail)
          </p>
        </div>
      </div>
    </footer>
  )
}
