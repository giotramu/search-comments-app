import type { QueryResult } from '@lib/common/hooks/types'
import { useQuery } from '@lib/common/hooks/use-query'
import type { Posts } from '@lib/dashboard/types'
import { screen } from '@solidjs/testing-library'
import { render } from '@testing/testing-library'
import { vi } from 'vitest'
import { Dashboard } from '..'

const QUERY_MOCK = {
  data: null,
  error: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  refetch: vi.fn()
} satisfies QueryResult<Posts>

vi.mock('@lib/common/hooks/use-query', () => ({
  useQuery: vi.fn(() => QUERY_MOCK)
}))

describe('<Dashboard />', () => {
  it('should render initial state correctly', () => {
    render(Dashboard)

    expect(screen.getByLabelText('Search comments')).toBeVisible()

    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled()

    expect(screen.getByText('Enter a minimum of 4 characters.')).toBeVisible()
  })

  it('should disable button if input is invalid', async () => {
    const { userEvent } = render(Dashboard)

    const input = screen.getByLabelText('Search comments')

    const button = screen.getByRole('button', { name: 'Search' })

    await userEvent.type(input, 'a')

    expect(button).toBeDisabled()
  })

  it('should enable button if input is valid', async () => {
    const { userEvent } = render(Dashboard)

    const input = screen.getByLabelText('Search comments')

    const button = screen.getByRole('button', { name: 'Search' })

    await userEvent.type(input, 'lorem ipsum')

    expect(button).not.toBeDisabled()
  })

  it('should show loading state when fetching', () => {
    vi.mocked(useQuery).mockReturnValueOnce({
      ...QUERY_MOCK,
      isLoading: true
    })

    render(Dashboard)

    expect(
      screen.getByText('🔍 Search for comments using your keywords...')
    ).toBeVisible()
  })

  it('should show error message on fetch failure', () => {
    vi.mocked(useQuery).mockReturnValue({
      ...QUERY_MOCK,
      isError: true,
      error: new Error('Network error')
    })

    render(Dashboard)

    expect(
      screen.getByText('An error has occurred: Network error.')
    ).toBeVisible()
  })

  it('should show no results message if search is empty', () => {
    vi.mocked(useQuery).mockReturnValue({
      ...QUERY_MOCK,
      isSuccess: true,
      data: []
    })

    render(Dashboard)

    expect(screen.getByText('😢 The search returned no results.')).toBeVisible()
  })

  it('should render results when search is successful', () => {
    vi.mocked(useQuery).mockReturnValue({
      ...QUERY_MOCK,
      isSuccess: true,
      data: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          body: 'This is a comment'
        }
      ]
    })

    render(Dashboard)

    expect(screen.getByRole('heading', { name: 'John Doe' })).toBeVisible()

    expect(screen.getByText('john@example.com')).toBeVisible()

    expect(screen.getByText('This is a comment...')).toBeVisible()
  })
})
