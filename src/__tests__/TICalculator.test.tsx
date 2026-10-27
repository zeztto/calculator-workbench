import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TICalculator } from '@/app/components/TICalculator'

describe('TICalculator', () => {
  it('2nd toggles', () => {
    render(<TICalculator />)
    const secondButton = screen.getByRole('button', { name: '2nd' })
    expect(secondButton).toHaveClass('bg-secondary')
    fireEvent.click(secondButton)
    expect(secondButton).toHaveClass('bg-primary')
  })
})
