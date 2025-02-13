import { API_URL, COMMENTS_LIMIT } from './constants'

export const composeSearchCommentsUrl = (
  query: string,
  limit: number | string | null = COMMENTS_LIMIT
): string => {
  const basePath = API_URL + encodeURIComponent(query)

  return limit === null || Number.isNaN(Number(limit)) || Number(limit) < 0
    ? basePath
    : basePath + `&_limit=${limit}`
}
