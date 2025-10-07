interface StatsProps {
  totalCharacters: number
  totalLines: number
  totalWords: number
  totalSpaces: number
  totalAlphabets: number
  totalDigits: number
  totalSymbols: number
}

export default function Stats({
  totalCharacters,
  totalLines,
  totalWords,
  totalSpaces,
  totalAlphabets,
  totalDigits,
  totalSymbols
}: StatsProps) {
  return (
    <div className="space-y-6">
      <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full">
        <div className="stat">
          <div className="stat-title">総文字数</div>
          <div className="stat-value text-primary">{totalCharacters}</div>
          <div className="stat-desc">すべての文字</div>
        </div>

        <div className="stat">
          <div className="stat-title">行数</div>
          <div className="stat-value text-secondary">{totalLines}</div>
          <div className="stat-desc">改行を含む</div>
        </div>

        <div className="stat">
          <div className="stat-title">単語数</div>
          <div className="stat-value text-accent">{totalWords}</div>
          <div className="stat-desc">空白区切り</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">文字種別のカウント</h2>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">空白文字</div>
              <div className="stat-value text-sm">{totalSpaces}</div>
            </div>

            <div className="stat">
              <div className="stat-title">アルファベット</div>
              <div className="stat-value text-sm">{totalAlphabets}</div>
            </div>

            <div className="stat">
              <div className="stat-title">数字</div>
              <div className="stat-value text-sm">{totalDigits}</div>
            </div>

            <div className="stat">
              <div className="stat-title">記号</div>
              <div className="stat-value text-sm">{totalSymbols}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
