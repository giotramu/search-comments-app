import { type Component, type JSX, Show } from 'solid-js'
import cls from './styles.module.css'

type Props = JSX.InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  hasError: boolean
  errorMessage?: JSX.Element | string | null | undefined
  hint?: JSX.Element | string | null | undefined
}

export const Input: Component<Props> = props => {
  const isCheckbox = props.type === 'checkbox'

  return (
    <div
      class={cls.FormGroup}
      classList={{ [`${cls.FormGroupCol}`]: !isCheckbox }}
    >
      <div
        classList={{
          [`${cls.FormGroupWithField}`]: !isCheckbox,
          [`${cls.FormGroupWithCheckbox}`]: isCheckbox
        }}
      >
        <label for={props.id} class={cls.Label}>
          {props.label}
          {props.required && <span class={cls.RequiredSign}>{' *'}</span>}
        </label>

        <input
          classList={{ [`${cls.Field}`]: !isCheckbox }}
          {...props}
          id={props.id}
          name={props.id}
        />
      </div>

      <Show when={props.hasError && props.errorMessage}>
        <span class={cls.FieldError}>{props.errorMessage}</span>
      </Show>

      <Show when={props.hint}>
        <span aria-describedby={props.id} class={cls.FieldHint}>
          {props.hint}
        </span>
      </Show>
    </div>
  )
}
