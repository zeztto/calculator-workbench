import { describe, it, expect } from 'vitest'
import { evaluate } from 'mathjs'

describe('precision tests', () => {
  describe('Basic Arithmetic', () => {
    it('123 + 456 = 579', () => {
      expect(evaluate('123+456')).toBe(579)
    })

    it('1000 - 1 = 999', () => {
      expect(evaluate('1000-1')).toBe(999)
    })

    it('12 * 12 = 144', () => {
      expect(evaluate('12*12')).toBe(144)
    })

    it('100 / 4 = 25', () => {
      expect(evaluate('100/4')).toBe(25)
    })

    it('2 + 3 * 4 = 14', () => {
      expect(evaluate('2+3*4')).toBe(14)
    })

    it('(2 + 3) * 4 = 20', () => {
      expect(evaluate('(2+3)*4')).toBe(20)
    })
  })

  describe('Floating Point', () => {
    it('0.1 + 0.2 ≈ 0.3', () => {
      expect(evaluate('0.1+0.2')).toBeCloseTo(0.3, 10)
    })

    it('0.7 * 0.8 ≈ 0.56', () => {
      expect(evaluate('0.7*0.8')).toBeCloseTo(0.56, 10)
    })

    it('1 / 3 ≈ 0.333', () => {
      expect(evaluate('1/3')).toBeCloseTo(0.333, 3)
    })
  })

  describe('Scientific', () => {
    it('sqrt(4) = 2', () => {
      expect(evaluate('sqrt(4)')).toBe(2)
    })

    it('sqrt(2) ≈ 1.414', () => {
      expect(evaluate('sqrt(2)')).toBeCloseTo(1.414, 3)
    })

    it('sin(0) = 0', () => {
      expect(evaluate('sin(0)')).toBe(0)
    })

    it('cos(0) = 1', () => {
      expect(evaluate('cos(0)')).toBe(1)
    })

    it('tan(pi/4) ≈ 1', () => {
      expect(evaluate('tan(pi/4)')).toBeCloseTo(1, 10)
    })

    it('log10(100) = 2', () => {
      expect(evaluate('log10(100)')).toBe(2)
    })

    it('log(e) ≈ 1', () => {
      expect(evaluate('log(e)')).toBeCloseTo(1, 10)
    })

    it('2^10 = 1024', () => {
      expect(evaluate('2^10')).toBe(1024)
    })

    it('e^1 ≈ 2.718', () => {
      expect(evaluate('e^1')).toBeCloseTo(2.718, 3)
    })
  })

  describe('Edge Cases', () => {
    it('1/0 = Infinity', () => {
      expect(evaluate('1/0')).toBe(Infinity)
    })

    it('0/0 = NaN', () => {
      expect(evaluate('0/0')).toBeNaN()
    })

    it('0^0 = 1', () => {
      expect(evaluate('0^0')).toBe(1)
    })

    it('0! = 1', () => {
      expect(evaluate('0!')).toBe(1)
    })

    it('10! = 3628800', () => {
      expect(evaluate('10!')).toBe(3628800)
    })

    it('10^100 large number', () => {
      expect(evaluate('10^100')).toBe(1e100)
    })

    it('10^-100 small number', () => {
      expect(evaluate('10^-100')).toBe(1e-100)
    })
  })
})
