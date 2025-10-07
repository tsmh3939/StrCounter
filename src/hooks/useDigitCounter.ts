import { useMemo } from 'react'

interface CountResult {
  totalCharacters: number
  totalLines: number
  totalWords: number
  totalSpaces: number
  totalAlphabets: number
  totalDigits: number
  totalSymbols: number
}

export function useCharacterCounter(text: string): CountResult {
  return useMemo(() => {
    const totalCharacters = text.length
    const totalLines = text.length === 0 ? 0 : text.split('\n').length
    const totalWords = text.trim() ? text.trim().split(/\s+/).length : 0

    let totalSpaces = 0
    let totalAlphabets = 0
    let totalDigits = 0
    let totalSymbols = 0

    for (const char of text) {
      if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
        totalSpaces++
      } else if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
        totalAlphabets++
      } else if (char >= '0' && char <= '9') {
        totalDigits++
      } else {
        totalSymbols++
      }
    }

    return {
      totalCharacters,
      totalLines,
      totalWords,
      totalSpaces,
      totalAlphabets,
      totalDigits,
      totalSymbols
    }
  }, [text])
}
