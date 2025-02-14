import type { NonEmptyArray } from '@lib/common/types'
import type { Post } from '@lib/dashboard/types'
import { type Component, For } from 'solid-js'
import cls from './styles.module.css'

type Props = {
  suggestions: NonEmptyArray<Post>
  selectedIndex: number
  onSelect(suggestion: string): void
}

export const SuggestionsList: Component<Props> = props => (
  <ul class={cls.SuggestionsList}>
    <For each={props.suggestions}>
      {(item, idx) => (
        <li
          onClick={() => props.onSelect(item.name)}
          class={cls.Suggestion}
          classList={{
            [`${cls.Selected}`]: idx() === props.selectedIndex
          }}
        >
          <p class={cls.Title}>{item.name}</p>
          <p class={cls.Subtitle}>{item.email}</p>
        </li>
      )}
    </For>
  </ul>
)
