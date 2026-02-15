import { useState } from 'react'
import { Search, MapPin, Target, Loader2 } from 'lucide-react'

interface Props {
  onSearch: (query: string, city: string, threshold: number) => void
  searching: boolean
}

export default function SearchForm({ onSearch, searching }: Props) {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [threshold, setThreshold] = useState(0.47)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query.trim(), city.trim(), threshold)
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Search className="h-4 w-4 inline mr-1" />
            Poste, competences, mots-cles...
          </label>
          <input
            type="text"
            className="input"
            placeholder='Ex: "developpeur web", "aide-soignant", "comptable"'
            value={query}
            onChange={e => setQuery(e.target.value)}
            disabled={searching}
          />
        </div>
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="h-4 w-4 inline mr-1" />
            Ville (optionnel)
          </label>
          <input
            type="text"
            className="input"
            placeholder="Ex: Paris, Lyon"
            value={city}
            onChange={e => setCity(e.target.value)}
            disabled={searching}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-end gap-4">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Target className="h-4 w-4 inline mr-1" />
            Precision : {threshold.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.30"
            max="0.70"
            step="0.01"
            value={threshold}
            onChange={e => setThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            disabled={searching}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Plus large</span>
            <span>Plus precis</span>
          </div>
        </div>
        <button type="submit" className="btn-primary whitespace-nowrap" disabled={searching || !query.trim()}>
          {searching ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          {searching ? 'Recherche...' : 'Rechercher'}
        </button>
      </div>
    </form>
  )
}
