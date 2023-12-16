import { GrpcEsServer, stdoutUnaryServerInterceptor } from '../src/server'
import { EchoService } from './gen/echo/v1/echo_connect'

const PORT = 8080

new GrpcEsServer({ jsonOptions: { useProtoFieldName: true, ignoreUnknownFields: true } })
  .use(stdoutUnaryServerInterceptor())
  .register(EchoService, {
    echo: (req) => ({ message: `you said: ${req.message}` }),
  })
  .listenAndServe(PORT)

console.log(`🏃 Grpc Server is running on port ${PORT}`)
