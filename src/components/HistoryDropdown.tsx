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

  const truncateText = (text: string, maxLength: number = 30) => {
    const oneLine = text.split('\n')[0]
    if (oneLine.length <= maxLength) return oneLine
    return oneLine.substring(0, maxLength) + '...'
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>履歴</span>
        {history.length > 0 && (
          <span className="badge badge-primary badge-sm">{history.length}</span>
        )}
      </div>
      <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-80 p-2 shadow-2xl bg-base-300">
        <div className="card-body">
          {history.length === 0 ? (
            <p className="text-sm text-base-content/60">履歴がありません</p>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">履歴</h3>
                <button
                  className="btn btn-xs btn-ghost btn-error"
                  onClick={onClearAll}
                >
                  すべて削除
                </button>
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 p-2 hover:bg-base-200 rounded-lg cursor-pointer"
                    onClick={() => onSelect(item.text)}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-mono">{truncateText(item.text)}</p>
                      <p className="text-xs text-base-content/60">{formatDate(item.timestamp)}</p>
                    </div>
                    <button
                      className="btn btn-xs btn-ghost btn-circle"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(item.id)
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
