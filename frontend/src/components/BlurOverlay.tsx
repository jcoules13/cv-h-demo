import { Lock } from 'lucide-react'

interface Props {
  onRequestAccess: () => void
}

export default function BlurOverlay({ onRequestAccess }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
      <div className="text-center px-6 py-8 max-w-sm">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-7 w-7 text-blue-600" />
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          Profil complet reserve aux recruteurs
        </h4>
        <p className="text-sm text-gray-600 mb-5">
          Pour acceder aux experiences, formations et contacter les candidats,
          demandez votre acces recruteur.
        </p>
        <button onClick={onRequestAccess} className="btn-primary">
          Demander un acces
        </button>
      </div>
    </div>
  )
}
