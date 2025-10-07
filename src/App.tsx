import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TextInput from './components/TextInput'
import Stats from './components/Stats'
import Footer from './components/Footer'
import { useCharacterCounter } from './hooks/useDigitCounter'
import { useHistory } from './hooks/useHistory'

function App() {
  const [text, setText] = useState('')
  const [theme, setTheme] = useState('dim')
  const {
    totalCharacters,
    totalLines,
    totalWords,
    totalSpaces,
    totalAlphabets,
    totalDigits,
    totalSymbols
  } = useCharacterCounter(text)

  const { history, addHistory, deleteHistory, clearHistory } = useHistory()

  const handleSaveToHistory = () => {
    addHistory(text)
  }

  const handleLoadFromHistory = (historyText: string) => {
    setText(historyText)
  }

  return (
    <div className="min-h-screen bg-base-200" data-theme={theme}>
      <Navbar
        theme={theme}
        onThemeChange={setTheme}
        history={history}
        onSelectHistory={handleLoadFromHistory}
        onDeleteHistory={deleteHistory}
        onClearHistory={clearHistory}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <TextInput value={text} onChange={setText} />
            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-primary"
                onClick={handleSaveToHistory}
                disabled={!text.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                履歴に保存
              </button>
            </div>
          </div>
        </div>

        <Stats
          totalCharacters={totalCharacters}
          totalLines={totalLines}
          totalWords={totalWords}
          totalSpaces={totalSpaces}
          totalAlphabets={totalAlphabets}
          totalDigits={totalDigits}
          totalSymbols={totalSymbols}
        />
      </main>

      <Footer />
    </div>
  )
}

export default App
