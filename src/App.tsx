import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TextInput from './components/TextInput'
import Stats from './components/Stats'
import Footer from './components/Footer'
import { useCharacterCounter } from './hooks/useDigitCounter'
import { useHistory } from './hooks/useHistory'

const TEXT_STORAGE_KEY = 'strcounter_current_text'

function App() {
  const [text, setText] = useState(() => {
    // 初回読み込み時にsessionStorageからテキストを復元
    const savedText = sessionStorage.getItem(TEXT_STORAGE_KEY)
    return savedText || ''
  })

  // テキストが変更されるたびにsessionStorageに保存
  useEffect(() => {
    sessionStorage.setItem(TEXT_STORAGE_KEY, text)
  }, [text])

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
    <div className="min-h-screen bg-base-200 flex flex-col" data-theme="dim">
      <Navbar
        history={history}
        onSelectHistory={handleLoadFromHistory}
        onDeleteHistory={deleteHistory}
        onClearHistory={clearHistory}
      />

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <TextInput value={text} onChange={setText} onSaveToHistory={handleSaveToHistory} />
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
