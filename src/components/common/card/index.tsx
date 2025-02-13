import type { Component, JSX } from 'solid-js'
import cls from './styles.module.css'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const Card: Component<Props> = props => (
  <div class={cls.Card}>
    {props.children}
  </div>
)
