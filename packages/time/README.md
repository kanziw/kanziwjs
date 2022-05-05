# time

## cancellableDelay

```ts
import { cancellableDelay } from '@kanziw/time'

const delay100 = cancellableDelay(100)
const delay1000 = cancellableDelay(1000)

// It takes about 100ms
await Promise.all([
  delay100.promise.finally(delay1000.cancel),
  delay1000.promise,
])
```

## stopwatch

Measure elapsed ms using perf_hooks.performance

```ts
import { startStopwatch } from '@kanziw/time'
import { setTimeout as delay } from 'timers/promises'

const stopwatch = startStopwatch()
await delay(100)

const elapsedMs = stopwatch.end()
console.log(elapsedMs) // 100.74062514305115
```
