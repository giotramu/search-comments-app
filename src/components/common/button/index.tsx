import type { ValueOf } from '@lib/common/types'
import { type Component, type JSX, mergeProps } from 'solid-js'
import { VARIANTS } from './constants'
import cls from './styles.module.css'

type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ValueOf<typeof VARIANTS>
  fullWidth?: boolean
}

export const Button: Component<Props> = rawProps => {
  const props = mergeProps({ variant: VARIANTS.PRIMARY }, rawProps)

  return (
    <button
      {...props}
      class={cls.Button}
      classList={{
        [`${cls.Primary}`]: props.variant === VARIANTS.PRIMARY,
        [`${cls.Secondary}`]: props.variant === VARIANTS.SECONDARY,
        [`${cls.FullWidth}`]: props.fullWidth
      }}
    >
      {props.children}
    </button>
  )
}
