import { createEffect, mergeProps } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { QueryOptions, QueryResult, QueryState } from './types'

export const useQuery = <T = unknown>(
  getUrl: () => string | null,
  options: Partial<QueryOptions> = {}
): QueryResult<T> => {
  const { enabled = false, fetchOptions = {} } = options

  const [state, setState] = createStore<QueryState<T>>({
    data: null,
    error: null,
    isError: false,
    isLoading: false,
    isSuccess: false
  })

  const refetch = async (): Promise<void> => {
    const url = getUrl()

    if (!url) return

    setState({
      isLoading: true,
      isError: false,
      isSuccess: false,
      error: null
    })

    try {
      const res = await fetch(url, fetchOptions)

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status} - ${res.statusText}`)
      }

      const data = await res.json()

      setState({
        data,
        isSuccess: true
      })
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Unexpected error occurred.')

      setState({
        isError: true,
        error
      })
    } finally {
      setState({
        isLoading: false
      })
    }
  }

  createEffect(() => {
    const enabledValue = typeof enabled === 'function' ? enabled() : enabled

    if (enabledValue) refetch()
  })

  return mergeProps(state, { refetch })
}
