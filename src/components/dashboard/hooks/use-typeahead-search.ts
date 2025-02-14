import { useQuery } from '@lib/common/hooks/use-query'
import type { Posts } from '@lib/dashboard/types'
import { composeSearchCommentsUrl, isValidSearch } from '@lib/dashboard/utils'
import { debounce } from '@solid-primitives/scheduled'
import { type JSX, createSignal } from 'solid-js'

export const useTypeaheadSearch = () => {
  const [inputValue, setInputValue] = createSignal('')

  const [query, setQuery] = createSignal('')

  const [showSuggestions, setShowSuggestions] = createSignal(false)

  const isQueryValid = () => isValidSearch(query())

  const getUrl = (): string | null => {
    const qParam = query().toLocaleLowerCase().trim()

    return isQueryValid() ? composeSearchCommentsUrl(qParam) : null
  }

  /**
   * `useQuery` will trigger the fetch whenever `getUrl()` returns a valid URL.
   * Destructuring should be avoided to preserve the Store reactivity.
   * Ref. https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity
   */
  const posts = useQuery<Posts>(getUrl, { enabled: isQueryValid })

  const debouncedUpdate = debounce((value: string): void => {
    if (isValidSearch(value) && value !== query()) {
      setQuery(value)
      setShowSuggestions(true)
    }
  }, 500)

  const handleOnInput: JSX.EventHandler<HTMLInputElement, InputEvent> = ({
    currentTarget: { value }
  }) => {
    setInputValue(value)
    debouncedUpdate(value)

    if (!isValidSearch(value)) {
      setShowSuggestions(false)
    }
  }

  const handleOnSubmit: JSX.EventHandler<
    HTMLFormElement,
    SubmitEvent
  > = evt => {
    evt.preventDefault()

    if (isValidSearch(inputValue())) {
      setQuery(inputValue())
      setShowSuggestions(false)
      posts.refetch()
    }
  }

  const handleSuggestionClick = (suggestion: string): void => {
    setInputValue(suggestion)
    setQuery(suggestion)
    setShowSuggestions(false)

    posts.refetch()
  }

  const openSuggestions = (): void => {
    if (isValidSearch(inputValue())) setShowSuggestions(true)
  }

  const closeSuggestions = (): void => {
    // Delay to allow clicking on the hint before closing the dropdown
    setTimeout(() => setShowSuggestions(false), 150)
  }

  return {
    posts,
    query,
    inputValue,
    handleOnInput,
    handleOnSubmit,
    handleSuggestionClick,
    showSuggestions,
    openSuggestions,
    closeSuggestions
  }
}
