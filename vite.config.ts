import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPathsPlugin()],

  resolve: {
    conditions: ['development', 'browser']
  },

  server: {
    port: 3000
  },

  build: {
    target: 'esnext'
  },

  test: {
    globals: true,
    include: ['**/tests/*.spec.ts?(x)'],
    environment: 'jsdom',
    setupFiles: './testing/setup.ts',
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    passWithNoTests: true,
    coverage: {
      skipFull: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      extension: ['.ts', '.tsx']
    }
  }
})
