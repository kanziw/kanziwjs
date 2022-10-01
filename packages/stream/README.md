# @kanziw/stream

[![npm version](https://img.shields.io/npm/v/@kanziw/stream)](https://www.npmjs.com/package/@kanziw/stream)
[![license](https://img.shields.io/npm/l/@kanziw/stream)](https://www.npmjs.com/package/@kanziw/stream)
[![npm downloads](https://img.shields.io/npm/dt/@kanziw/stream)](https://www.npmjs.com/package/@kanziw/stream)


## drain

Drain stream

```ts
import { drain } from '@kanziw/stream'

const buf = await drain(someStream)
```


## waitUntilFinished

Wait until stream finished

```ts
import { waitUntilFinished } from '@kanziw/stream'

await waitUntilFinished(someStream)
```
