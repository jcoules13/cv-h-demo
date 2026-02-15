import { MapPin, CheckCircle, ChevronRight } from 'lucide-react'
import type { CandidatPublic } from '../types'
import { parseJsonArray } from '../utils'

interface Props {
  candidat: CandidatPublic
  selected: boolean
  onClick: () => void
}

export default function CandidatCard({ candidat, selected, onClick }: Props) {
  const skills = parseJsonArray<string>(candidat.competences_techniques).slice(0, 3)

  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer transition-all hover:shadow-md ${
        selected ? 'ring-2 ring-blue-500 border-blue-500' : ''
      }`}
    >
      <div className="px-4 py-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {candidat.titre_profil || 'Profil anonyme'}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              {candidat.ville && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {candidat.ville}
                </span>
              )}
              {candidat.age && <span>{candidat.age} ans</span>}
              {candidat.rqth_actif && (
                <span className="badge badge-green text-[10px] py-0">
                  <CheckCircle className="h-3 w-3 mr-0.5" />
                  RQTH
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {Math.round(candidat.score * 100)}%
            </span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {skills.map((skill, i) => (
              <span key={i} className="badge badge-blue text-[10px]">{skill}</span>
            ))}
            {parseJsonArray(candidat.competences_techniques).length > 3 && (
              <span className="badge badge-gray text-[10px]">
                +{parseJsonArray(candidat.competences_techniques).length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
