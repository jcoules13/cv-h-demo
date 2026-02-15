export function parseJsonArray<T = string>(value: unknown): T[] {
  if (!value) return []
  if (Array.isArray(value)) return value as T[]
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

export function normalizeExperience(exp: Record<string, unknown>) {
  return {
    poste: (exp.poste || exp.titre || '') as string,
    entreprise: (exp.entreprise || '') as string,
    duree: (exp.duree || exp.periode || '') as string,
    description: (exp.description || '') as string,
  }
}

export function normalizeFormation(f: Record<string, unknown>) {
  return {
    diplome: (f.diplome || '') as string,
    ecole: (f.ecole || f.etablissement || '') as string,
    annee: (f.annee || '') as string,
  }
}
