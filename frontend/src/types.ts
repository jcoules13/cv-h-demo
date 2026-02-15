export interface CandidatPublic {
  id: string
  titre_profil: string | null
  resume_profil: string | null
  ville: string | null
  age: number | null
  rqth_actif: boolean | null
  competences_techniques: string | string[] | null
  experiences: string | Experience[] | null
  formations: string | Formation[] | null
  langues: string | string[] | null
  loisirs: string | string[] | null
  score: number
}

export interface Experience {
  poste?: string
  titre?: string
  entreprise?: string
  duree?: string
  periode?: string
  description?: string
}

export interface Formation {
  diplome?: string
  ecole?: string
  annee?: string
  etablissement?: string
}

export interface SearchResult {
  results: CandidatPublic[]
  count: number
}

export interface ContactForm {
  nom: string
  email: string
  telephone: string
  entreprise: string
  message: string
}
