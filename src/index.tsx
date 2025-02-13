/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App'

import './assets/styles/reset.css'
import './assets/styles/global.css'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  )
}

// biome-ignore lint/style/noNonNullAssertion: The HTML node is static.
render(() => <App />, root!)
