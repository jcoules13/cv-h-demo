import { useState } from 'react'
import { X, Send, Loader2, CheckCircle } from 'lucide-react'

interface Props {
  webhookUrl: string
  onClose: () => void
}

export default function ContactModal({ webhookUrl, onClose }: Props) {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', entreprise: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || (data && data.success === false)) {
        throw new Error(data?.error || 'Erreur lors de l\'envoi')
      }

      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi')
    } finally {
      setSending(false)
    }
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Demander un acces recruteur</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Demande envoyee !</h4>
            <p className="text-sm text-gray-600 mb-6">
              Nous avons bien recu votre demande et vous recontacterons rapidement.
            </p>
            <button onClick={onClose} className="btn-primary">Fermer</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input type="text" className="input" required value={form.nom} onChange={update('nom')} disabled={sending} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
              <input type="email" className="input" required value={form.email} onChange={update('email')} disabled={sending} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
              <input type="tel" className="input" value={form.telephone} onChange={update('telephone')} disabled={sending} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
              <input type="text" className="input" required value={form.entreprise} onChange={update('entreprise')} disabled={sending} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                className="input min-h-[80px]"
                placeholder="Dites-nous en plus sur vos besoins en recrutement..."
                value={form.message}
                onChange={update('message')}
                disabled={sending}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-outline" disabled={sending}>
                Annuler
              </button>
              <button type="submit" className="btn-primary" disabled={sending}>
                {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                {sending ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
