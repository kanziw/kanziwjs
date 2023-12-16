export const defer = <T = void>() => {
  const defer = {
    promise: Promise.resolve(undefined as unknown as T),
    resolve: (_value: Awaited<T> | PromiseLike<Awaited<T>>) => {},
    reject: (_reason?: unknown) => {},
  }
  defer.promise = new Promise<Awaited<T>>((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })

  return defer
}
