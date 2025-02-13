import '@testing-library/jest-dom'
import { cleanup } from '@solidjs/testing-library'
import { afterEach } from 'vitest'
import { vi } from 'vitest'

afterEach(cleanup)

type DebounceCb = (...rest: unknown[]) => unknown

vi.mock('@solid-primitives/scheduled', () => ({
  debounce: vi.fn(
    (fn: DebounceCb) =>
      (...args: unknown[]) =>
        fn(...args)
  )
}))
