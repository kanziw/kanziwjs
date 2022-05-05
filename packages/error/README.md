# @kanziw/error

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
