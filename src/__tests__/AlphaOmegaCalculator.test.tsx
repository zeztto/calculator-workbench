import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AlphaOmegaCalculator } from '@/app/components/AlphaOmegaCalculator'

describe('AlphaOmegaCalculator', () => {
  it('has all four tabs', () => {
    render(<AlphaOmegaCalculator />)
    expect(screen.getByRole('tab', { name: '기본' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '삼각' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '통계' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '고급' })).toBeInTheDocument()
  })
})
