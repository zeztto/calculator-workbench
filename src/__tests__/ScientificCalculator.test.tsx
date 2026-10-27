import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ScientificCalculator } from '@/app/components/ScientificCalculator'

describe('ScientificCalculator', () => {
  it('SHIFT toggles button variant', () => {
    render(<ScientificCalculator />)
    const shiftButton = screen.getByRole('button', { name: 'SHIFT' })
    expect(shiftButton).toHaveClass('bg-secondary')
    fireEvent.click(shiftButton)
    expect(shiftButton).toHaveClass('bg-primary')
  })

  it('sin button appends sin(', () => {
    render(<ScientificCalculator />)
    fireEvent.click(screen.getByRole('button', { name: /sin/i }))
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('sin(')
  })
})
