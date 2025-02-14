import { Button } from '@components/common/button'
import { Card } from '@components/common/card'
import { Input } from '@components/common/input'
import { Layout } from '@components/common/layout'
import type { NonEmptyArray } from '@lib/common/types'
import { isNonEmptyArray } from '@lib/common/utils'
import { MAX_TEXT_LENGTH } from '@lib/dashboard/constants'
import type { Post } from '@lib/dashboard/types'
import { isValidSearch } from '@lib/dashboard/utils'
import { type Component, For, Show } from 'solid-js'
import { useTypeaheadSearch } from './hooks/use-typeahead-search'
import { SearchHint } from './search-hint'
import cls from './styles.module.css'
import { SuggestionsList } from './suggestions-list'

export const Dashboard: Component = () => {
  const {
    posts,
    inputValue,
    handleOnInput,
    handleOnSubmit,
    handleSuggestionClick,
    showSuggestions,
    openSuggestions,
    closeSuggestions
  } = useTypeaheadSearch()

  return (
    <Layout>
      <h1 class={cls.AppTitle}>Search Comments</h1>

      <form onSubmit={handleOnSubmit}>
        <div class={cls.SearchForm}>
          <div class={cls.SearchBar}>
            <Input
              type="text"
              autocomplete="off"
              id="search_comments"
              label="Search comments"
              placeholder="Search comments..."
              value={inputValue()}
              onInput={handleOnInput}
              onFocus={openSuggestions}
              onBlur={closeSuggestions}
              hasError={!isValidSearch(inputValue())}
              hint={isValidSearch(inputValue()) ? null : <SearchHint />}
            />

            <Show
              when={
                showSuggestions() &&
                posts.isSuccess &&
                isNonEmptyArray(posts.data)
              }
            >
              <SuggestionsList
                selectedIndex={0}
                suggestions={posts.data as NonEmptyArray<Post>}
                onSelect={handleSuggestionClick}
              />
            </Show>
          </div>

          <div
            class={cls.SearchButton}
            classList={{
              [`${cls.SearchButtonWithMargin}`]: !isValidSearch(inputValue())
            }}
          >
            <Button
              type="submit"
              fullWidth
              disabled={!isValidSearch(inputValue())}
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      <div class={cls.List}>
        <Show when={posts.isLoading}>
          <p class={cls.ListPlaceholder}>
            🔍 Search for comments using your keywords...
          </p>
        </Show>

        <Show when={posts.isError}>
          <p class={cls.ListPlaceholder}>
            An error has occurred: {posts.error?.message}.
          </p>
        </Show>

        <Show when={posts.isSuccess && !isNonEmptyArray(posts.data)}>
          <p class={cls.ListPlaceholder}>😢 The search returned no results.</p>
        </Show>

        <Show when={posts.isSuccess && isNonEmptyArray(posts.data)}>
          <ul class={cls.PostList}>
            <For each={posts.data}>
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
