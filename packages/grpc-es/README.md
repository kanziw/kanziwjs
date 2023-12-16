# @kanziw/grpc-es

[![npm version](https://img.shields.io/npm/v/@kanziw/grpc-es)](https://www.npmjs.com/package/@kanziw/grpc-es)
[![license](https://img.shields.io/npm/l/@kanziw/grpc-es)](https://www.npmjs.com/package/@kanziw/grpc-es)
[![npm downloads](https://img.shields.io/npm/dt/@kanziw/grpc-es)](https://www.npmjs.com/package/@kanziw/grpc-es)

## GrpcEsServer

```typescript
import { GrpcEsServer, stdoutUnaryServerInterceptor } from '@kanziw/grpc-es/server'
import { EchoService } from './gen/echo/v1/echo_connect'

const PORT = 8080

new GrpcEsServer()
  .use(stdoutUnaryServerInterceptor())
  .register(EchoService, {
    echo: (req) => ({ message: `you said: ${req.message}` }),
  })
  .listenAndServe(PORT)

console.log(`🏃 Grpc Server is running on port ${PORT}`)
```
