/* eslint-disable @typescript-eslint/no-explicit-any */

export type HasPayloadType<T> = T extends (arg1: any, arg2: infer R) => any ? R : void
export type PayloadType<T> = unknown extends HasPayloadType<T> ? void : HasPayloadType<T>
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
export type CommitFunction<T, P, K> = undefined extends P
  ? (mutation: T, payload?: P) => K
  : (mutations: T, payload: P) => K
export type CommitUtility<T extends Record<string, (...args: any[]) => any>> = UnionToIntersection<
  { [P in keyof T]: CommitFunction<P, PayloadType<T[P]>, ReturnType<T[P]>> }[keyof T]
>
export type MappedFunction<T, P> = T extends void
  ? () => P
  : undefined extends T
  ? (payload?: T) => P
  : (payload: T) => P
export type MappedActionOrMutationUtility<T extends Record<string, (...args: any[]) => any>> = {
  [P in keyof T]: UnionToIntersection<MappedFunction<PayloadType<T[P]>, ReturnType<T[P]>>>
}
export type GetterResultsUtility<T extends Record<string, (...args: any[]) => any>> = {
  [P in keyof T]: ReturnType<T[P]>
}
