import { useState } from 'react'
import FormOption from './components/formOptions/FormOptions'
import './App.css'

type SearchOption = 'recomend' | 'tag' | 'compare'

interface OptionConfig {
  label: string;
  select: SearchOption;
  text: string;
  placeholder1: string;
  placeholder2?: string;
}

function App() {
  const [searchOption, setSearchOption] = useState<SearchOption>('recomend')

  const options: OptionConfig[] = [
    {
      label: 'Search recommended movies',
      select: 'recomend',
      text: 'recommend',
      placeholder1: 'Spider-Man 3'
    },
    {
      label: 'Search movies by tags',
      select: 'tag',
      text: 'search by tag',
      placeholder1: 'sci-fi, space, adventure'
    },
    {
      label: 'Compare movies',
      select: 'compare',
      text: 'compare',
      placeholder1: 'Spider-Man 3',
      placeholder2: 'Spider-Man 1',
    }
  ]

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOption(e.target.value as SearchOption)
  }

  const selectedOption = options.find(opt => opt.select === searchOption)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className='max-w-4xl mx-auto'>
        <header className='text-center mb-8 pt-8'>
          <h1 className='text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
            Movie Recommendations
          </h1>
          <p className='text-gray-400'>Discover and compare your favorite movies</p>
        </header>

        <main className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700'>
          <div className='mb-6'>
            <label htmlFor="search-mode" className='block text-sm font-medium text-gray-300 mb-2'>
              Search Mode
            </label>
            <div className="relative">
              <select 
                id="search-mode"
                value={searchOption}
                onChange={handleChangeOption}
                className="w-full px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer transition-all hover:bg-gray-900"
              >
                <option value="recomend">🎬 Get Recommendations</option>
                <option value="tag">🏷️ Search by Tags</option>
                <option value="compare">⚖️ Compare Movies</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {selectedOption && (
              <FormOption {...selectedOption} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App