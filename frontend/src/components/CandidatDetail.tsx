import { MapPin, CheckCircle, Briefcase, GraduationCap, Globe, Lock } from 'lucide-react'
import type { CandidatPublic } from '../types'
import { parseJsonArray, normalizeExperience, normalizeFormation } from '../utils'
import BlurOverlay from './BlurOverlay'

interface Props {
  candidat: CandidatPublic
  onRequestAccess: () => void
}

export default function CandidatDetail({ candidat, onRequestAccess }: Props) {
  const skills = parseJsonArray<string>(candidat.competences_techniques)
  const experiences = parseJsonArray<Record<string, unknown>>(candidat.experiences)
  const formations = parseJsonArray<Record<string, unknown>>(candidat.formations)
  const langues = parseJsonArray<string>(candidat.langues)
  const loisirs = parseJsonArray<string>(candidat.loisirs)

  return (
    <div className="card">
      {/* Header - visible */}
      <div className="card-header">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {candidat.titre_profil || 'Profil anonyme'}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              {candidat.ville && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {candidat.ville}
                </span>
              )}
              {candidat.age && <span>{candidat.age} ans</span>}
              {candidat.rqth_actif && (
                <span className="badge badge-green">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  RQTH
                </span>
              )}
            </div>
          </div>
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
            Score : {Math.round(candidat.score * 100)}%
          </span>
        </div>
      </div>

      {/* Resume - visible (tronque) */}
      {candidat.resume_profil && (
        <div className="px-6 py-3 border-b border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            {candidat.resume_profil.length > 200
              ? candidat.resume_profil.substring(0, 200) + '...'
              : candidat.resume_profil}
          </p>
        </div>
      )}

      {/* Competences - visible */}
      {skills.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Competences</h4>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span key={i} className="badge badge-blue">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Section bridee - floute */}
      <div className="relative">
        <div className="px-6 py-4 space-y-6 filter blur-[6px] select-none pointer-events-none" aria-hidden="true">
          {/* Experiences - floute */}
          {experiences.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Experiences ({experiences.length})
              </h4>
              <div className="space-y-3">
                {experiences.slice(0, 3).map((exp, i) => {
                  const e = normalizeExperience(exp)
                  return (
                    <div key={i} className="border-l-2 border-gray-200 pl-3">
                      <p className="text-sm font-medium text-gray-900">{e.poste || 'Poste'}</p>
                      <p className="text-xs text-gray-500">{e.entreprise} {e.duree && `| ${e.duree}`}</p>
                      {e.description && (
                        <p className="text-xs text-gray-400 mt-1">{e.description.substring(0, 100)}...</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Formations - floute */}
          {formations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                Formations ({formations.length})
              </h4>
              <div className="space-y-2">
                {formations.slice(0, 3).map((f, i) => {
                  const form = normalizeFormation(f)
                  return (
                    <div key={i} className="border-l-2 border-gray-200 pl-3">
                      <p className="text-sm font-medium text-gray-900">{form.diplome || 'Diplome'}</p>
                      <p className="text-xs text-gray-500">{form.ecole} {form.annee && `(${form.annee})`}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Langues - floute */}
          {langues.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Globe className="h-4 w-4" />
                Langues
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {langues.map((l, i) => (
                  <span key={i} className="badge badge-gray">{l}</span>
                ))}
              </div>
            </div>
          )}

          {/* Loisirs - floute */}
          {loisirs.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Centres d'interet</h4>
              <div className="flex flex-wrap gap-1.5">
                {loisirs.map((l, i) => (
                  <span key={i} className="badge badge-gray">{l}</span>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder si rien a montrer */}
          {experiences.length === 0 && formations.length === 0 && langues.length === 0 && (
            <div className="py-8">
              <p className="text-sm text-gray-500">Experiences, formations, langues et plus encore...</p>
            </div>
          )}
        </div>

        {/* Overlay CTA */}
        <BlurOverlay onRequestAccess={onRequestAccess} />
      </div>
    </div>
  )
}
