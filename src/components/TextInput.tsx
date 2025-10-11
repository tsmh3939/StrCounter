import { useState } from 'react'
import { Icon } from './icons'
import ActionButton from './ActionButton'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onSaveToHistory: () => void
}

export default function TextInput({ value, onChange, onSaveToHistory }: TextInputProps) {
  const [copied, setCopied] = useState(false)
  const [pasted, setPasted] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveToHistory = () => {
    onSaveToHistory()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }


  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
      setPasted(true)
      setTimeout(() => {
        setPasted(false)
      }, 2000)
    } catch (err) {
      console.error('貼り付けに失敗しました:', err)
    }
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
        <ActionButton
          onClick={handleSaveToHistory}
          disabled={!value.trim()}
          isActive={saved}
          activeIcon={<Icon name="check" />}
          activeLabel="保存しました"
          defaultIcon={<Icon name="download" />}
          defaultLabel="履歴に保存"
        />
        <div className="flex gap-2">
          <ActionButton
            onClick={handlePaste}
            isActive={pasted}
            activeIcon={<Icon name="check" />}
            activeLabel="貼り付けました"
            defaultIcon={<Icon name="clipboardPaste" />}
            defaultLabel="貼り付け"
            defaultClassName="btn-secondary btn-outline"
          />
        </div>
      </div>
      <textarea
        className="textarea textarea-bordered w-full h-48 sm:h-64 lg:h-96 text-base resize-none focus:textarea-primary focus:outline-none"
        placeholder="ここにテキストを貼り付けてください..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-end items-center gap-2">
        <ActionButton
          onClick={handleCopy}
          disabled={!value}
          isActive={copied}
          activeIcon={<Icon name="check" />}
          activeLabel="コピーしました"
          defaultIcon={<Icon name="clipboardCopy" />}
          defaultLabel="コピー"
          defaultClassName="btn-primary btn-outline"
        />
      </div>
    </div>
  )
}
