/**
 * mathjs evaluates trigonometric arguments in radians. In DEG mode, convert
 * each supported call recursively, including repeated nested function names.
 * Group inverse results so exponentiation and surrounding arithmetic keep the
 * same precedence. Quoted mathjs strings are copied without interpretation.
 */
export type AngleMode = 'DEG' | 'RAD'

const INPUT_DEG_FUNCTIONS = new Set(['sin', 'cos', 'tan', 'sec', 'csc', 'cot'])
const OUTPUT_DEG_FUNCTIONS = new Set(['asin', 'acos', 'atan', 'asec', 'acsc', 'acot', 'atan2'])

function quotedEnd(expression: string, start: number): number {
  const quote = expression[start]
  for (let index = start + 1; index < expression.length; index++) {
    if (expression[index] === '\\') index++
    else if (expression[index] === quote) return index
  }
  return expression.length - 1
}

function matchingParen(expression: string, start: number): number {
  let depth = 1
  for (let index = start + 1; index < expression.length; index++) {
    const char = expression[index]
    if (char === '"' || char === "'") index = quotedEnd(expression, index)
    else if (char === '(') depth++
    else if (char === ')' && --depth === 0) return index
  }
  return -1
}

export function transformTrigExpression(expression: string, mode: AngleMode): string {
  if (mode === 'RAD') return expression

  let result = ''
  let index = 0
  while (index < expression.length) {
    const char = expression[index]
    if (char === '"' || char === "'") {
      const end = quotedEnd(expression, index)
      result += expression.slice(index, end + 1)
      index = end + 1
      continue
    }
    if (!/[a-zA-Z_$]/.test(char)) {
      result += char
      index++
      continue
    }

    const start = index
    while (index < expression.length && /[a-zA-Z0-9_$]/.test(expression[index])) index++
    const name = expression.slice(start, index)
    while (/\s/.test(expression[index] ?? '') && index < expression.length) index++
    const open = index
    const close = expression[open] === '(' ? matchingParen(expression, open) : -1
    if (close === -1) {
      result += expression.slice(start, index)
      continue
    }

    const args = transformTrigExpression(expression.slice(open + 1, close), mode)
    if (INPUT_DEG_FUNCTIONS.has(name)) result += `${name}((${args})*pi/180)`
    else if (OUTPUT_DEG_FUNCTIONS.has(name)) result += `((${name}(${args}))*180/pi)`
    else result += `${expression.slice(start, open)}(${args})`
    index = close + 1
  }
  return result
}
