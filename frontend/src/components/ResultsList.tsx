import { Users } from 'lucide-react'
import type { CandidatPublic } from '../types'
import CandidatCard from './CandidatCard'

interface Props {
  results: CandidatPublic[]
  selectedId: string | null
  onSelect: (candidat: CandidatPublic) => void
}

export default function ResultsList({ results, selectedId, onSelect }: Props) {
  if (results.length === 0) {
    return (
      <div className="card card-body text-center text-gray-500 py-12">
        <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="font-medium">Aucun profil trouve</p>
        <p className="text-sm mt-1">Essayez avec d'autres mots-cles ou reduisez la precision</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">
        {results.length} profil{results.length > 1 ? 's' : ''} trouve{results.length > 1 ? 's' : ''}
      </p>
      <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
        {results.map(candidat => (
          <CandidatCard
            key={candidat.id}
            candidat={candidat}
            selected={candidat.id === selectedId}
            onClick={() => onSelect(candidat)}
          />
        ))}
      </div>
    </div>
  )
}
