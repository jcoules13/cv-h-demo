import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SearchForm from './components/SearchForm'
import ResultsList from './components/ResultsList'
import CandidatDetail from './components/CandidatDetail'
import ContactModal from './components/ContactModal'
import Footer from './components/Footer'
import type { CandidatPublic, SearchResult } from './types'

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.vertigocomhandicap.cloud/webhook'

export default function App() {
  const [results, setResults] = useState<CandidatPublic[]>([])
  const [selectedCandidat, setSelectedCandidat] = useState<CandidatPublic | null>(null)
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string, city: string, threshold: number) => {
    setSearching(true)
    setError(null)
    setSelectedCandidat(null)

    try {
      const response = await fetch(`${N8N_WEBHOOK_URL}/demo-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, city: city || undefined, threshold })
      })

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`)
      }

      const data: SearchResult = await response.json()
      setResults(data.results || [])
      setHasSearched(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche')
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchForm onSearch={handleSearch} searching={searching} />

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {hasSearched && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ResultsList
                  results={results}
                  selectedId={selectedCandidat?.id || null}
                  onSelect={setSelectedCandidat}
                />
              </div>
              <div className="lg:col-span-2">
                {selectedCandidat ? (
                  <CandidatDetail
                    candidat={selectedCandidat}
                    onRequestAccess={() => setShowContact(true)}
                  />
                ) : (
                  <div className="card card-body text-center text-gray-500 py-16">
                    <p className="text-lg">Selectionnez un profil pour voir les details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {showContact && (
        <ContactModal
          webhookUrl={`${N8N_WEBHOOK_URL}/demo-contact`}
          onClose={() => setShowContact(false)}
        />
      )}
    </div>
  )
}
