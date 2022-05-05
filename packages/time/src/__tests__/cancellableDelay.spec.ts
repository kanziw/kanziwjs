import { cancellableDelay } from '../cancellableDelay'
import { startStopwatch } from '../stopwatch'

describe('cancellableDelay', () => {
  test('delay', async() => {
    const stopwatch = startStopwatch()
    const foo = await cancellableDelay(100, 'foo').promise

    expect(foo).toEqual('foo')
    expect(stopwatch.end()).toBeGreaterThanOrEqual(90)
  })

  test('cancel', async() => {
    const delay100 = cancellableDelay(100)
    const delay1000 = cancellableDelay(1000)

    const stopwatch = startStopwatch()
    await Promise.all([
      delay100.promise.finally(delay1000.cancel),
      delay1000.promise,
    ])

    expect(stopwatch.end()).toBeLessThan(500)
  })
})
