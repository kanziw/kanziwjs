# @kanziw/time

![npm version](https://img.shields.io/npm/v/@kanziw/time)
![license](https://img.shields.io/npm/l/@kanziw/time)
![npm downloads](https://img.shields.io/npm/dt/@kanziw/time)

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

## timezone

### time formatter

Format date to string with date, time and datetime format

```ts
import { formatWithTimezoneOffset, kstFormat, utcFormat } from '../timezone'

const d = new Date('2022-05-16T00:00:00.000Z')
const dMs = d.getTime()

const timeFormatter = formatWithTimezoneOffset('+17:30')(d) // or formatWithTimezoneOffset('+17:30')(d)
console.log(`${timeFormatter.date()} / ${timeFormatter.time()} / ${timeFormatter.datetime()}`)
// 2022-05-16 / 17:30:00 / 2022-05-16 17:30:00

// utcFormat equals formatWithTimezoneOffset('+00:00')
const utc = utcFormat(d) // or utcFormat(dMs)
console.log(`${utc.date()} / ${utc.time()} / ${utc.datetime()}`)
// 2022-05-16 / 00:00:00 / 2022-05-16 00:00:00

// kstFormat equals formatWithTimezoneOffset('+09:00')
const kst = kstFormat(d) // or kstFormat(dMs)
console.log(`${kst.date()} / ${kst.time()} / ${kst.datetime()}`)
// 2022-05-16 / 09:00:00 / 2022-05-16 09:00:00
```
