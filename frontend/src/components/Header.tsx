import { FileSearch } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileSearch className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CV-H</h1>
            <p className="text-xs text-gray-500">Recrutement inclusif par l'IA</p>
          </div>
        </div>
      </div>
    </header>
  )
}
