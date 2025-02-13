import type { Component, JSX } from 'solid-js'
import cls from './styles.module.css'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const Layout: Component<Props> = props => (
  <main class={cls.Layout}>{props.children}</main>
)
