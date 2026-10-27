import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCalculator } from '@/app/hooks/useCalculator'

describe('useCalculator', () => {
  describe('expression management', () => {
    it('appendValue adds to expression', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('5'))
      expect(result.current.expression).toBe('5')
      act(() => result.current.appendValue('+'))
      expect(result.current.expression).toBe('5+')
    })

    it('clear empties expression only', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('5+3'))
      act(() => result.current.calculate())
      act(() => result.current.clear())
      expect(result.current.expression).toBe('')
      expect(result.current.history).toHaveLength(1)
    })

    it('clearAll empties expression and history', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('5+3'))
      act(() => result.current.calculate())
      act(() => result.current.clearAll())
      expect(result.current.expression).toBe('')
      expect(result.current.history).toHaveLength(0)
    })

    it('deleteLast removes last character', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('123'))
      act(() => result.current.deleteLast())
      expect(result.current.expression).toBe('12')
    })
  })

  describe('calculate', () => {
    it('success: expression becomes rawResult', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('2+3'))
      act(() => result.current.calculate())
      expect(result.current.expression).toBe('5')
    })

    it('success: history adds { expression, result }', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('2+3'))
      act(() => result.current.calculate())
      expect(result.current.history).toEqual([{ expression: '2+3', result: '5' }])
    })

    it('success: historyIndex becomes -1', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('2+3'))
      act(() => result.current.calculate())
      expect(result.current.historyIndex).toBe(-1)
    })

    it('error: expression becomes empty string', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('2+*3'))
      act(() => result.current.calculate())
      expect(result.current.expression).toBe('')
    })

    it('error: history adds { expression, result: "오류" }', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('invalid'))
      act(() => result.current.calculate())
      expect(result.current.history[0].result).toBe('오류')
    })

    it('1/0: expression becomes "Infinity"', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('1/0'))
      act(() => result.current.calculate())
      expect(result.current.expression).toBe('Infinity')
    })

    it('0/0: expression becomes "NaN"', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('0/0'))
      act(() => result.current.calculate())
      expect(result.current.expression).toBe('NaN')
    })
  })

  describe('historyIndex', () => {
    it('initial value is -1', () => {
      const { result } = renderHook(() => useCalculator())
      expect(result.current.historyIndex).toBe(-1)
    })

    it('historyUp from -1 goes to last', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('1+1'))
      act(() => result.current.calculate())
      act(() => result.current.clear())
      act(() => result.current.appendValue('2+2'))
      act(() => result.current.calculate())
      act(() => result.current.clear())
      act(() => result.current.historyUp())
      expect(result.current.historyIndex).toBe(1)
      expect(result.current.expression).toBe('2+2')
    })

    it('historyUp from 0 stays at 0', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('1+1'))
      act(() => result.current.calculate())
      act(() => result.current.clear())
      act(() => result.current.historyUp())
      act(() => result.current.historyUp())
      expect(result.current.historyIndex).toBe(0)
    })

    it('historyDown from last goes to -1', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('1+1'))
      act(() => result.current.calculate())
      act(() => result.current.clear())
      act(() => result.current.historyUp())
      act(() => result.current.historyDown())
      expect(result.current.historyIndex).toBe(-1)
    })

    it('historyDown sets expression to empty string', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('1+1'))
      act(() => result.current.calculate())
      act(() => result.current.clear())
      act(() => result.current.historyUp())
      act(() => result.current.historyDown())
      expect(result.current.expression).toBe('')
    })
  })

  describe('insertAns', () => {
    it('appends last history.result (raw)', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('5+5'))
      act(() => result.current.calculate())
      act(() => result.current.clear())
      act(() => result.current.insertAns())
      expect(result.current.expression).toBe('10')
    })

    it('does nothing when history empty', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('5'))
      act(() => result.current.insertAns())
      expect(result.current.expression).toBe('5')
    })
  })

  describe('edge cases', () => {
    it('empty expression calculate does nothing', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.calculate())
      expect(result.current.expression).toBe('')
      expect(result.current.history).toHaveLength(0)
    })

    it('multiple calculates chain correctly', () => {
      const { result } = renderHook(() => useCalculator())
      act(() => result.current.appendValue('2+3'))
      act(() => result.current.calculate())
      act(() => result.current.appendValue('+5'))
      act(() => result.current.calculate())
      expect(result.current.expression).toBe('10')
      expect(result.current.history).toHaveLength(2)
    })
  })
})
