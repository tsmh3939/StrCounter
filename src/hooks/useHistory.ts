import { useState, useEffect } from 'react'

export interface HistoryItem {
  id: string
  text: string
  timestamp: number
}

const HISTORY_KEY = 'strcounter_history'
const MAX_HISTORY_ITEMS = 20

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  // 初回読み込み
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      if (saved) {
        setHistory(JSON.parse(saved))
      }
    } catch (err) {
      console.error('履歴の読み込みに失敗しました:', err)
    }
  }, [])

  // 履歴を保存
  const saveHistory = (updatedHistory: HistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory))
      setHistory(updatedHistory)
    } catch (err) {
      console.error('履歴の保存に失敗しました:', err)
    }
  }

  // 新しい履歴を追加
  const addHistory = (text: string) => {
    if (!text.trim()) return

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
    }

    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS)
    saveHistory(updatedHistory)
  }

  // 履歴を削除
  const deleteHistory = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id)
    saveHistory(updatedHistory)
  }

  // すべての履歴を削除
  const clearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_KEY)
      setHistory([])
    } catch (err) {
      console.error('履歴のクリアに失敗しました:', err)
    }
  }

  return {
    history,
    addHistory,
    deleteHistory,
    clearHistory,
  }
}
