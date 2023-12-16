// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
type Maybe<T> = T | void

type CancellabledDelay<T> = {
  cancel: () => void
  promise: Promise<T>
}

export const cancellableDelay = <T>(ms: number, value?: T): CancellabledDelay<Maybe<T>> => {
  /* istanbul ignore next line */
  const ret: CancellabledDelay<Maybe<T>> = {
    cancel: () => undefined,
    promise: Promise.resolve(),
  }
  const signal = new Promise((resolve, reject) => {
    ret.cancel = () => {
      reject(new Error('cancelled'))
    }
  })

  ret.promise = new Promise<Maybe<T>>((resolve, reject) => {
    const timeOut = setTimeout(() => {
      resolve(value)
    }, ms)

    signal.catch((err) => {
      reject(err)
      clearTimeout(timeOut)
    })
  }).catch(() => undefined)

  return ret
}
