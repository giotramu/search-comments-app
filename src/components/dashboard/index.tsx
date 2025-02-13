import { Button } from '@components/common/button'
import { Card } from '@components/common/card'
import { Input } from '@components/common/input'
import { Layout } from '@components/common/layout'
import { useQuery } from '@lib/common/hooks/use-query'
import { isNonEmptyArray, isValidInputValue } from '@lib/common/utils'
import { MAX_TEXT_LENGTH, MIN_SEARCH_LENGTH } from '@lib/dashboard/constants'
import type { Posts } from '@lib/dashboard/types'
import { composeSearchCommentsUrl } from '@lib/dashboard/utils'
import { type Component, For, type JSX, Show, createSignal } from 'solid-js'
import cls from './styles.module.css'

export const Dashboard: Component = () => {
  const [query, setQuery] = createSignal('')

  const isFormValid = (): boolean =>
    isValidInputValue(query()) && query().length >= MIN_SEARCH_LENGTH

  const getUrl = (): string | null => {
    const qParam = query().toLocaleLowerCase().trim()

    return isFormValid() ? composeSearchCommentsUrl(qParam) : null
  }

  /**
   * 🔥 Destructuring should be avoided to preserve the Store reactivity.
   * Ref. https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity
   */
  const qPosts = useQuery<Posts>(getUrl, { enabled: isFormValid })

  const handleOnSubmit: JSX.EventHandler<
    HTMLFormElement,
    SubmitEvent
  > = evt => {
    evt.preventDefault()

    if (isFormValid()) qPosts.refetch()
  }

  const handleOnInput: JSX.EventHandler<HTMLInputElement, InputEvent> = ({
    currentTarget: { value }
  }) => setQuery(value)

  return (
    <Layout>
      <form onSubmit={handleOnSubmit}>
        <div class={cls.SearchBar}>
          <Input
            type="text"
            id="search_comments"
            label="Search comments"
            placeholder="Search comments..."
            value={query()}
            onInput={handleOnInput}
            hasError={!isFormValid()}
            hint={
              isFormValid() ? null : (
                <>
                  <strong>💡 Tip:</strong> Enter a minimum of{' '}
                  {MIN_SEARCH_LENGTH} characters.
                </>
              )
            }
          />

          <div
            class={cls.SearchButton}
            classList={{ [`${cls.SearchButtonWithMargin}`]: !isFormValid() }}
          >
            <Button type="submit" fullWidth disabled={!isFormValid()}>
              Search
            </Button>
          </div>
        </div>
      </form>

      <div class={cls.List}>
        <Show when={qPosts.isLoading}>
          <p class={cls.ListPlaceholder}>
            🔍 Search for comments using your keywords...
          </p>
        </Show>

        <Show when={qPosts.isError}>
          <p class={cls.ListPlaceholder}>
            An error has occurred: {qPosts.error?.message}.
          </p>
        </Show>

        <Show when={qPosts.isSuccess && !isNonEmptyArray(qPosts.data)}>
          <p class={cls.ListPlaceholder}>😢 The search returned no results.</p>
        </Show>

        <Show when={qPosts.isSuccess && isNonEmptyArray(qPosts.data)}>
          <ul class={cls.PostList}>
            <For each={qPosts.data}>
              {item => (
                <li>
                  <Card>
                    <h2 class={cls.PostTitle}>{item.name}</h2>
                    <p class={cls.PostAuthor}>{item.email}</p>
                    <p>{item.body.slice(0, MAX_TEXT_LENGTH)}...</p>
                  </Card>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </Layout>
  )
}
