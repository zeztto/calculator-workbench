import { useState } from 'react'
import { evaluate } from 'mathjs'
import { AngleMode, transformTrigExpression } from '@/app/utils/trigTransform'

export type { AngleMode }

export interface HistoryItem {
  expression: string
  result: string
}

export interface UseCalculatorOptions {
  defaultAngleMode?: AngleMode
}

export interface UseCalculatorReturn {
  expression: string
  history: HistoryItem[]
  historyIndex: number
  angleMode: AngleMode
  setExpression: (value: string | ((prev: string) => string)) => void
  appendValue: (value: string) => void
  clear: () => void
  clearAll: () => void
  deleteLast: () => void
  calculate: () => void
  historyUp: () => void
  historyDown: () => void
  insertAns: () => void
  setAngleMode: (mode: AngleMode) => void
  toggleAngleMode: () => void
}

export function useCalculator(options: UseCalculatorOptions = {}): UseCalculatorReturn {
  const { defaultAngleMode = 'DEG' } = options
  const [expression, setExpression] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [angleMode, setAngleMode] = useState<AngleMode>(defaultAngleMode)

  const toggleAngleMode = () => {
    setAngleMode((prev) => (prev === 'DEG' ? 'RAD' : 'DEG'))
  }

  const appendValue = (value: string) => {
    setExpression((prev) => prev + value)
  }

  const clear = () => {
    setExpression('')
  }

  const clearAll = () => {
    setExpression('')
    setHistory([])
    setHistoryIndex(-1)
  }

  const deleteLast = () => {
    setExpression((prev) => prev.slice(0, -1))
  }

  const calculate = () => {
    if (!expression) return

    try {
      const transformedExpr = transformTrigExpression(expression, angleMode)
      const result = evaluate(transformedExpr)
      const rawResult = typeof result === 'number' ? result.toString() : String(result)
      setHistory((prev) => [...prev, { expression, result: rawResult }])
      setExpression(rawResult)
      setHistoryIndex(-1)
    } catch {
      setHistory((prev) => [...prev, { expression, result: '오류' }])
      setExpression('')
      setHistoryIndex(-1)
    }
  }

  const historyUp = () => {
    if (history.length === 0) return

    if (historyIndex === -1) {
      setHistoryIndex(history.length - 1)
      setExpression(history[history.length - 1].expression)
    } else if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1)
      setExpression(history[historyIndex - 1].expression)
    }
  }

  const historyDown = () => {
    if (history.length === 0) return

    if (historyIndex < history.length - 1 && historyIndex !== -1) {
      setHistoryIndex((prev) => prev + 1)
      setExpression(history[historyIndex + 1].expression)
    } else if (historyIndex === history.length - 1) {
      setHistoryIndex(-1)
      setExpression('')
    }
  }

  const insertAns = () => {
    if (history.length > 0) {
      setExpression((prev) => prev + history[history.length - 1].result)
    }
  }

  return {
    expression,
    history,
    historyIndex,
    angleMode,
    setExpression,
    appendValue,
    clear,
    clearAll,
    deleteLast,
    calculate,
    historyUp,
    historyDown,
    insertAns,
    setAngleMode,
    toggleAngleMode,
  }
}
