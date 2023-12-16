/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

export const defer = <T=void>() => {
  const defer = {
    promise: Promise.resolve(undefined as unknown as T),
    resolve: (_value: Awaited<T> | PromiseLike<Awaited<T>>) => {},
    reject: (_reason?: any) => {},
  }
  defer.promise = new Promise<Awaited<T>>((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })

  return defer
}
