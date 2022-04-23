type CancellabledDelay = {
  cancel: () => void,
  promise: Promise<unknown>,
}

export const cancellableDelay = <T=undefined>(ms: number, value: T): CancellabledDelay => {
  const ret: CancellabledDelay = { cancel: () => undefined, promise: Promise.resolve() }
  const signal = new Promise((resolve, reject) => {
    ret.cancel = () => { reject(new Error('cancelled')) }
  })

  ret.promise = new Promise<T>((resolve, reject) => {
    const timeOut = setTimeout(() => { resolve(value) }, ms)

    signal.catch(err => {
      reject(err)
      clearTimeout(timeOut)
    })
  }).catch(() => null)

  return ret
}
