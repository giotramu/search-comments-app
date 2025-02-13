import { describe, expect } from 'vitest'
import { isNonEmptyArray, isValidInputValue } from '../utils'

describe('isValidInputValue()', () => {
  it('should return `true` for valid numbers', () => {
    expect(isValidInputValue(42)).toBe(true)

    expect(isValidInputValue(-10)).toBe(true)

    expect(isValidInputValue(0)).toBe(true)
  })

  it('should return `false` for `NaN`', () => {
    expect(isValidInputValue(Number.NaN)).toBe(false)
  })

  it('should return `true` for non-empty strings', () => {
    expect(isValidInputValue('hello')).toBe(true)

    expect(isValidInputValue(' 42 ')).toBe(true)
  })

  it('should return `false` for empty strings', () => {
    expect(isValidInputValue('')).toBe(false)

    expect(isValidInputValue('   ')).toBe(false)
  })

  it('should return `false` for `null` and `undefined`', () => {
    expect(isValidInputValue(null)).toBe(false)

    expect(isValidInputValue(undefined)).toBe(false)
  })

  it('should return `false` for non-string, non-number types', () => {
    expect(isValidInputValue({})).toBe(false)

    expect(isValidInputValue([])).toBe(false)

    // biome-ignore lint/suspicious/noEmptyBlockStatements: Test an empty object.
    expect(isValidInputValue(() => {})).toBe(false)

    expect(isValidInputValue(Symbol('test'))).toBe(false)
  })
})

describe('isNonEmptyArray()', () => {
  it('should return `true` for non-empty arrays', () => {
    expect(isNonEmptyArray([1, 2, 3])).toBe(true)

    expect(isNonEmptyArray(['a', 'b', 'c'])).toBe(true)

    expect(isNonEmptyArray([null])).toBe(true)

    expect(isNonEmptyArray([{}])).toBe(true)
  })

  it('should return `false` for empty arrays', () => {
    expect(isNonEmptyArray([])).toBe(false)
  })

  it('should return `false` for non-array values', () => {
    expect(isNonEmptyArray(undefined)).toBe(false)

    expect(isNonEmptyArray(null)).toBe(false)

    expect(isNonEmptyArray(42)).toBe(false)

    expect(isNonEmptyArray('hello')).toBe(false)

    expect(isNonEmptyArray({ length: 1 })).toBe(false)
  })
})
