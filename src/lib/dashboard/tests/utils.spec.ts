import { API_URL, COMMENTS_LIMIT } from '@lib/dashboard/constants'
import { composeSearchCommentsUrl } from '../utils'

describe('composeSearchCommentsUrl', () => {
  it('should return the correct URL with a query', () => {
    expect(composeSearchCommentsUrl('lorem ipsum')).toBe(
      `${API_URL}lorem%20ipsum&_limit=${COMMENTS_LIMIT}`
    )
  })

  it('should return the correct URL with a query and a numeric limit', () => {
    expect(composeSearchCommentsUrl('lorem ipsum', 20)).toBe(
      `${API_URL}lorem%20ipsum&_limit=20`
    )
  })

  it('should return the correct URL with a query and a string limit', () => {
    expect(composeSearchCommentsUrl('lorem ipsum', '50')).toBe(
      `${API_URL}lorem%20ipsum&_limit=50`
    )
  })

  it('should return the correct URL without a limit if limit is `null`', () => {
    expect(composeSearchCommentsUrl('lorem ipsum', null)).toBe(
      `${API_URL}lorem%20ipsum`
    )
  })

  it('should return the correct URL without a limit if limit is `NaN`', () => {
    expect(composeSearchCommentsUrl('lorem ipsum', Number.NaN)).toBe(
      `${API_URL}lorem%20ipsum`
    )
  })

  it('should return the correct URL without a limit if limit is negative', () => {
    expect(composeSearchCommentsUrl('lorem ipsum', -5)).toBe(
      `${API_URL}lorem%20ipsum`
    )
  })
})
