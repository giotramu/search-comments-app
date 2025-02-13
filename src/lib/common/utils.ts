import type { NonEmptyArray } from './types'

export const isValidInputValue = (a: unknown): a is string | number => {
  if (typeof a === 'number') {
    return !Number.isNaN(a)
  }

  if (typeof a === 'string') {
    const trimmed = a.trim()

    return trimmed.length > 0 || !Number.isNaN(Number.parseInt(trimmed))
  }

  return false
}

export const isNonEmptyArray = <T = unknown>(
  a: unknown
): a is NonEmptyArray<T> => Array.isArray(a) && a.length > 0
