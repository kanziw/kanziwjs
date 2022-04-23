import { setTimeout as delay } from 'timers/promises'
import { startStopwatch } from './stopwatch'

describe('startStopwatch', () => {
  test('end', async() => {
    const stopwatch = startStopwatch()
    await delay(100)

    const elapsedMs = stopwatch.end()
    expect(elapsedMs).toBeGreaterThanOrEqual(100)
    expect(elapsedMs).toBeLessThan(200)
  })
})
