import { cancellableDelay } from './cancellableDelay'

describe('cancellableDelay', () => {
  test('delay', async () => {
    const before = Date.now()
    const foo = await cancellableDelay(100, 'foo').promise

    expect(foo).toEqual('foo')
    expect(Date.now() - before).toBeGreaterThanOrEqual(100)
  })

  test('cancel', async () => {
    const delay100 = cancellableDelay(100)
    const delay1000 = cancellableDelay(1000)

    const before = Date.now()
    await Promise.all([
      delay100.promise.finally(delay1000.cancel),
      delay1000.promise,
    ])

    expect(Date.now() - before).toBeLessThan(1000)
  })
})
