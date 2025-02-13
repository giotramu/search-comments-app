/**
 * @desc `ValueOf` returns a union of all possible property values.
 * @example
 * ```
 * const VARIANT = {
 *   PRIMARY: 'primary',
 *   SECONDARY: 'secondary'
 * } as const
 *
 * type Result = ValueOf<typeof VARIANT> //-> 'primary' | 'secondary'
 * ```
 */
export type ValueOf<T extends Record<string, unknown>> = T[keyof T]

export type NonEmptyArray<T> = [T, ...T[]]
