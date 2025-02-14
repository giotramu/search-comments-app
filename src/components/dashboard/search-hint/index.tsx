
import { MIN_SEARCH_LENGTH } from '@lib/dashboard/constants'
import type { Component } from 'solid-js'

export const SearchHint: Component = () => (
  <>
    <strong>💡 Tip:</strong> Enter a minimum of {MIN_SEARCH_LENGTH} characters.
  </>
)
