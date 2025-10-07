import type { HistoryItem } from '../hooks/useHistory'
import HistoryDropdown from './HistoryDropdown'
import ThemeSelector from './ThemeSelector'

interface NavbarProps {
  theme: string
  onThemeChange: (theme: string) => void
  history: HistoryItem[]
  onSelectHistory: (text: string) => void
  onDeleteHistory: (id: string) => void
  onClearHistory: () => void
}

export default function Navbar({
  theme,
  onThemeChange,
  history,
  onSelectHistory,
  onDeleteHistory,
  onClearHistory
}: NavbarProps) {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1 gap-3">
        <a className="btn btn-ghost text-xl">StrCounter</a>
        <span className="text-sm text-base-content/60 hidden sm:inline">文字数カウンター</span>
      </div>
      <div className="flex-none gap-2">
        <HistoryDropdown
          history={history}
          onSelect={onSelectHistory}
          onDelete={onDeleteHistory}
          onClearAll={onClearHistory}
        />
        <ThemeSelector
          currentTheme={theme}
          onThemeChange={onThemeChange}
        />
      </div>
    </div>
  )
}
