import { render as defaultRender } from '@solidjs/testing-library'
import {
  type UserEvent,
  default as userEvent
} from '@testing-library/user-event'
import type { Component } from 'solid-js'

type RenderResult = ReturnType<typeof defaultRender> & {
  userEvent: UserEvent
}

export const customRender = (Ui: Component): RenderResult => ({
  userEvent: userEvent.setup(),
  ...defaultRender(() => <Ui />)
})

export { customRender as render }
