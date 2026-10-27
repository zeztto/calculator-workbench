import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { evaluate } from 'mathjs'
import { transformTrigExpression } from '@/app/utils/trigTransform'
import { BasicCalculator } from '@/app/components/BasicCalculator'
import { ScientificCalculator } from '@/app/components/ScientificCalculator'
import { AlphaOmegaCalculator } from '@/app/components/AlphaOmegaCalculator'
import { TICalculator } from '@/app/components/TICalculator'

describe('public source edition regressions', () => {
  it.each([BasicCalculator, ScientificCalculator, TICalculator, AlphaOmegaCalculator])('preserves native Enter activation on focused buttons (%s)', (Component) => {
    render(<Component />)
    const button = screen.getAllByRole('button')[0]
    button.focus()
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    button.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
  })

  it('converts nested calls of the same trigonometric function', () => {
    const actual = evaluate(transformTrigExpression('sin(sin(30))', 'DEG'))
    expect(actual).toBeCloseTo(Math.sin(0.5 * Math.PI / 180), 12)
  })

  it('preserves precedence for inverse trigonometric results', () => {
    expect(evaluate(transformTrigExpression('asin(0.5)^2', 'DEG'))).toBeCloseTo(900, 10)
  })

  it('accepts whitespace between a trig function and its argument', () => {
    expect(evaluate(transformTrigExpression('sin (30)', 'DEG'))).toBeCloseTo(0.5, 10)
  })

  it('one Enter creates exactly one history entry', () => {
    render(<BasicCalculator />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '2+3' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getAllByText('= 5')).toHaveLength(1)
    expect(screen.queryByText('= 2+3')).not.toBeInTheDocument()
  })

  it('scientific mode does not expose unimplemented device controls', () => {
    render(<ScientificCalculator />)
    for (const name of ['ALPHA', 'STO', 'ENG', 'S⇔D']) {
      expect(screen.queryByRole('button', { name })).not.toBeInTheDocument()
    }
  })

  it('extended mode does not expose unimplemented store/recall controls', () => {
    render(<TICalculator />)
    expect(screen.queryByRole('button', { name: 'sto→' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'rcl' })).not.toBeInTheDocument()
  })
})
