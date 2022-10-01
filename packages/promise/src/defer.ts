/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

export const defer = <T=void>() => {
  const defer = {
    promise: Promise.resolve(undefined as unknown as T),
    resolve: (_value: T | PromiseLike<T>) => {},
    reject: (_reason?: any) => {},
  }
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })

  return defer
}
