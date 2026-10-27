import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BasicCalculator } from '@/app/components/BasicCalculator'

describe('BasicCalculator', () => {
  it('renders number buttons 0-9', () => {
    render(<BasicCalculator />)
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByRole('button', { name: String(i) })).toBeInTheDocument()
    }
  })

  it('clicking digit updates input value', () => {
    render(<BasicCalculator />)
    fireEvent.click(screen.getByRole('button', { name: '5' }))
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('5')
  })

  it('= calculates', () => {
    render(<BasicCalculator />)
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '3' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('5')
  })

  it('M+ stores value', () => {
    render(<BasicCalculator />)
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '0' }))
    fireEvent.click(screen.getByRole('button', { name: 'M+' }))
    fireEvent.click(screen.getByRole('button', { name: 'C' }))
    fireEvent.click(screen.getByRole('button', { name: 'MR' }))
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('10')
  })

  it('keyboard Enter calculates', () => {
    render(<BasicCalculator />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '2+3' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(input).toHaveValue('5')
  })
})
