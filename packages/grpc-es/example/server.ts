import { GrpcEsServer } from '../src'
import { EchoService } from './gen/echo/v1/echo_connect'

const PORT = 8080

new GrpcEsServer()
  .register(EchoService, {
    echo: (req) => ({ message: `you said: ${req.message}` }),
  })
  .listenAndServe(PORT)

console.log(`🏃 Grpc Server is running on port ${PORT}`)
