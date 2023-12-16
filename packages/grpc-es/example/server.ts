import { GrpcEsServer, stdoutUnaryServerInterceptor } from '../src/server'
import { ExampleService } from './gen/example/v1/example_connect'

const PORT = 8080

new GrpcEsServer({ jsonOptions: { useProtoFieldName: true } })
  .use(stdoutUnaryServerInterceptor())
  .register(ExampleService, {
    echo: (req) => ({ message: `you said: ${req.message}` }),
    add: (req) => ({ result: req.int64Value + BigInt(req.int32Value) }),
  })
  .listenAndServe(PORT)

console.log(`🏃 Grpc Server is running on port ${PORT}`)
