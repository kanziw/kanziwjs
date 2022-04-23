type CancellabledDelay<T> = {
  cancel: () => void,
  promise: Promise<T>,
}

export const cancellableDelay = <T>(ms: number, value?: T): CancellabledDelay<T extends undefined ? void : T> => {
  const ret: CancellabledDelay = { cancel: () => undefined, promise: Promise.resolve() }
  const signal = new Promise((resolve, reject) => {
    ret.cancel = () => { reject(new Error('cancelled')) }
  })

  ret.promise = new Promise<T | void>((resolve, reject) => {
    const timeOut = setTimeout(() => { resolve(value) }, ms)

    signal.catch(err => {
      reject(err)
      clearTimeout(timeOut)
    })
  }).catch(() => null)

  return ret
}
