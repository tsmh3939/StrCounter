import { useState } from 'react'
import type { HistoryItem } from '../hooks/useHistory'

interface HistoryDropdownProps {
  history: HistoryItem[]
  onSelect: (text: string) => void
  onDelete: (id: string) => void
  onClearAll: () => void
}

export default function HistoryDropdown({
  history,
  onSelect,
  onDelete,
  onClearAll
}: HistoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)

    if (diffMinutes < 1) return 'たった今'
    if (diffMinutes < 60) return `${diffMinutes}分前`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}時間前`

    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateText = (text: string, maxLength: number = 50) => {
    const oneLine = text.split('\n')[0]
    if (oneLine.length <= maxLength) return oneLine
    return oneLine.substring(0, maxLength) + '...'
  }

  const handleSelect = (text: string) => {
    onSelect(text)
    setIsOpen(false)
  }

  return (
    <>
      <button className="btn btn-ghost gap-1" onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>履歴</span>
        {history.length > 0 && (
          <span className="badge badge-primary badge-sm">{history.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div className="fixed inset-x-0 top-16 bottom-0 bg-base-200 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-full flex flex-col">
              <div className="bg-base-100 p-4 shadow-lg flex justify-between items-center">
                <h2 className="text-2xl font-bold">履歴</h2>
                <div className="flex gap-2">
                  {history.length > 0 && (
                    <button
                      className="btn btn-sm btn-error btn-outline"
                      onClick={onClearAll}
                    >
                      すべて削除
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-circle btn-ghost"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {history.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-base-content/60">履歴がありません</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-w-4xl mx-auto">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => handleSelect(item.text)}
                      >
                        <div className="card-body p-4">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-mono break-all">{truncateText(item.text, 100)}</p>
                              <p className="text-xs text-base-content/60 mt-2">{formatDate(item.timestamp)}</p>
                            </div>
                            <button
                              className="btn btn-sm btn-ghost btn-circle flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDelete(item.id)
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
