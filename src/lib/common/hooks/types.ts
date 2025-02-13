export type QueryOptions = {
  enabled: boolean | (() => boolean)
  fetchOptions: RequestInit
}

export type QueryResult<T> = QueryState<T> & {
  refetch(): Promise<void>
}

export type QueryState<T> =
  | IdleState
  | LoadingState
  | ErrorState
  | SuccessState<T>

type IdleState = {
  data: null
  error: null
  isError: false
  isLoading: false
  isSuccess: false
}

type LoadingState = {
  data: null
  error: null
  isError: false
  isLoading: true
  isSuccess: false
}

type ErrorState = {
  data: null
  error: Error
  isError: true
  isLoading: false
  isSuccess: false
}

type SuccessState<T> = {
  data: T
  error: null
  isError: false
  isLoading: false
  isSuccess: true
}
