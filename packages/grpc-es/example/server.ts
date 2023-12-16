import { Code, ConnectError } from '@connectrpc/connect'
import { GrpcEsServer, stdoutUnaryServerInterceptor } from '../src/server'
import { ExampleService } from './gen/example/v1/example_connect'

const PORT = 8080

new GrpcEsServer({ jsonOptions: { useProtoFieldName: true } })
  .use(stdoutUnaryServerInterceptor())
  .register(ExampleService, {
    echo: (req) => ({ message: `you said: ${req.message}` }),
    add: (req) => {
      switch (req.args.case) {
        case 'int32Args':
          return {
            result: {
              case: 'int32Result',
              value: req.args.value.first + req.args.value.second,
            },
          }
        case 'int64Args':
          return {
            result: {
              case: 'int64Result',
              value: req.args.value.first + req.args.value.second,
            },
          }
        default:
          throw new ConnectError('no args', Code.InvalidArgument)
      }
    },
  })
  .listenAndServe(PORT)

console.log(`🏃 Grpc Server is running on port ${PORT}`)
