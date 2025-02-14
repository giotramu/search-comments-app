import { isValidInputValue } from '@lib/common/utils'
import { API_URL, COMMENTS_LIMIT, MIN_SEARCH_LENGTH } from './constants'

export const composeSearchCommentsUrl = (
  query: string,
  limit: number | string | null = COMMENTS_LIMIT
): string => {
  const basePath = API_URL + encodeURIComponent(query)

  return limit === null || Number.isNaN(Number(limit)) || Number(limit) < 0
    ? basePath
    : basePath + `&_limit=${limit}`
}

export const isValidSearch = (q: string) =>
  isValidInputValue(q) && q.length >= MIN_SEARCH_LENGTH
