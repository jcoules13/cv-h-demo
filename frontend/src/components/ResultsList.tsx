import { Users, Bell } from 'lucide-react'
import type { CandidatPublic } from '../types'
import CandidatCard from './CandidatCard'

interface Props {
  results: CandidatPublic[]
  selectedId: string | null
  onSelect: (candidat: CandidatPublic) => void
  onRequestAccess: () => void
}

export default function ResultsList({ results, selectedId, onSelect, onRequestAccess }: Props) {
  if (results.length === 0) {
    return (
      <div className="card card-body text-center text-gray-500 py-12">
        <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="font-medium">Aucun profil correspondant pour le moment</p>
        <p className="text-sm mt-1 mb-4">
          Nos profils sont mis a jour quotidiennement.
          Demandez un acces pour etre notifie des nouveaux candidats RQTH.
        </p>
        <button onClick={onRequestAccess} className="btn-outline inline-flex items-center mx-auto">
          <Bell className="h-4 w-4 mr-2" />
          M'alerter des nouveaux profils
        </button>
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
