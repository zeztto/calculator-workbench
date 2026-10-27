import { describe, it, expect } from 'vitest'
import { evaluate } from 'mathjs'
import { transformTrigExpression, AngleMode } from '@/app/utils/trigTransform'

function evaluateWithMode(expr: string, mode: AngleMode): number {
  const transformed = transformTrigExpression(expr, mode)
  return evaluate(transformed)
}

describe('trigTransform', () => {
  describe('transformTrigExpression', () => {
    it('RAD mode returns expression unchanged', () => {
      expect(transformTrigExpression('sin(1)', 'RAD')).toBe('sin(1)')
      expect(transformTrigExpression('asin(0.5)', 'RAD')).toBe('asin(0.5)')
    })

    it('DEG mode transforms sin(x) to sin((x)*pi/180)', () => {
      const result = transformTrigExpression('sin(90)', 'DEG')
      expect(result).toContain('pi/180')
    })

    it('DEG mode transforms asin(x) to (asin(x))*180/pi', () => {
      const result = transformTrigExpression('asin(0.5)', 'DEG')
      expect(result).toContain('180/pi')
    })
  })

  describe('DEG mode basic trig', () => {
    it('sin(0°) = 0', () => {
      expect(evaluateWithMode('sin(0)', 'DEG')).toBe(0)
    })

    it('sin(30°) ≈ 0.5', () => {
      expect(evaluateWithMode('sin(30)', 'DEG')).toBeCloseTo(0.5, 10)
    })

    it('sin(90°) = 1', () => {
      expect(evaluateWithMode('sin(90)', 'DEG')).toBeCloseTo(1, 10)
    })

    it('cos(0°) = 1', () => {
      expect(evaluateWithMode('cos(0)', 'DEG')).toBe(1)
    })

    it('cos(60°) ≈ 0.5', () => {
      expect(evaluateWithMode('cos(60)', 'DEG')).toBeCloseTo(0.5, 10)
    })

    it('cos(90°) ≈ 0', () => {
      expect(evaluateWithMode('cos(90)', 'DEG')).toBeCloseTo(0, 10)
    })

    it('tan(45°) = 1', () => {
      expect(evaluateWithMode('tan(45)', 'DEG')).toBeCloseTo(1, 10)
    })
  })

  describe('DEG mode inverse trig', () => {
    it('asin(0) = 0°', () => {
      expect(evaluateWithMode('asin(0)', 'DEG')).toBe(0)
    })

    it('asin(0.5) = 30°', () => {
      expect(evaluateWithMode('asin(0.5)', 'DEG')).toBeCloseTo(30, 10)
    })

    it('asin(1) = 90°', () => {
      expect(evaluateWithMode('asin(1)', 'DEG')).toBeCloseTo(90, 10)
    })

    it('acos(1) = 0°', () => {
      expect(evaluateWithMode('acos(1)', 'DEG')).toBe(0)
    })

    it('acos(0.5) = 60°', () => {
      expect(evaluateWithMode('acos(0.5)', 'DEG')).toBeCloseTo(60, 10)
    })

    it('atan(1) = 45°', () => {
      expect(evaluateWithMode('atan(1)', 'DEG')).toBeCloseTo(45, 10)
    })
  })

  describe('DEG mode nested trig (9 test)', () => {
    it('asin(acos(atan(tan(cos(sin(9)))))) ≈ 9', () => {
      const result = evaluateWithMode('asin(acos(atan(tan(cos(sin(9))))))', 'DEG')
      expect(result).toBeCloseTo(9, 8)
    })

    it('sin(asin(0.5)) = 0.5', () => {
      expect(evaluateWithMode('sin(asin(0.5))', 'DEG')).toBeCloseTo(0.5, 10)
    })

    it('asin(sin(30)) = 30', () => {
      expect(evaluateWithMode('asin(sin(30))', 'DEG')).toBeCloseTo(30, 10)
    })

    it('cos(acos(0.5)) = 0.5', () => {
      expect(evaluateWithMode('cos(acos(0.5))', 'DEG')).toBeCloseTo(0.5, 10)
    })

    it('tan(atan(1)) = 1', () => {
      expect(evaluateWithMode('tan(atan(1))', 'DEG')).toBeCloseTo(1, 10)
    })
  })

  describe('RAD mode (unchanged behavior)', () => {
    it('sin(pi/2) = 1', () => {
      expect(evaluateWithMode('sin(pi/2)', 'RAD')).toBeCloseTo(1, 10)
    })

    it('cos(pi) = -1', () => {
      expect(evaluateWithMode('cos(pi)', 'RAD')).toBeCloseTo(-1, 10)
    })

    it('asin(1) = pi/2', () => {
      expect(evaluateWithMode('asin(1)', 'RAD')).toBeCloseTo(Math.PI / 2, 10)
    })
  })

  describe('hyperbolic functions unaffected', () => {
    it('sinh(1) unchanged in DEG mode', () => {
      const radResult = evaluateWithMode('sinh(1)', 'RAD')
      const degResult = evaluateWithMode('sinh(1)', 'DEG')
      expect(degResult).toBeCloseTo(radResult, 10)
    })

    it('cosh(1) unchanged in DEG mode', () => {
      const radResult = evaluateWithMode('cosh(1)', 'RAD')
      const degResult = evaluateWithMode('cosh(1)', 'DEG')
      expect(degResult).toBeCloseTo(radResult, 10)
    })
  })

  describe('complex expressions', () => {
    it('2 * sin(30) + 1 = 2 in DEG mode', () => {
      expect(evaluateWithMode('2*sin(30)+1', 'DEG')).toBeCloseTo(2, 10)
    })

    it('sin(30)^2 + cos(30)^2 = 1 in DEG mode', () => {
      expect(evaluateWithMode('sin(30)^2+cos(30)^2', 'DEG')).toBeCloseTo(1, 10)
    })
  })
})
