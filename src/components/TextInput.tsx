import { useState } from 'react'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onSaveToHistory: () => void
}

export default function TextInput({ value, onChange, onSaveToHistory }: TextInputProps) {
  const [copied, setCopied] = useState(false)

  const handleClear = () => {
    onChange('')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('コピーに失敗しました:', err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          className="btn btn-sm btn-primary"
          onClick={onSaveToHistory}
          disabled={!value.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          履歴に保存
        </button>
        <div className="flex gap-2">
          <button
            className={`btn btn-sm ${copied ? 'btn-success' : 'btn-primary btn-outline'}`}
            onClick={handleCopy}
            disabled={!value}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                コピーしました
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                コピー
              </>
            )}
          </button>
          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={handleClear}
            disabled={!value}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            クリア
          </button>
        </div>
      </div>
      <textarea
        className="textarea textarea-bordered w-full h-48 sm:h-64 lg:h-96 text-base resize-none focus:textarea-primary focus:outline-none"
        placeholder="ここにテキストを貼り付けてください..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
