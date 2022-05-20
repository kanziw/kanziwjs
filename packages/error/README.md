# @kanziw/error

[![npm version](https://img.shields.io/npm/v/@kanziw/error)](https://www.npmjs.com/package/@kanziw/error)
[![license](https://img.shields.io/npm/l/@kanziw/error)](https://www.npmjs.com/package/@kanziw/error)
[![npm downloads](https://img.shields.io/npm/dt/@kanziw/error)](https://www.npmjs.com/package/@kanziw/error)

## wrapUnknownError

```ts
import { wrapUnknownError } from '@kanziw/error'

try {
  someWrongFunction()
} catch (unknownErr: unknown) {
  // Handle err with type Error
  const err: Error = wrapUnknownError(unknownError)
}
```
