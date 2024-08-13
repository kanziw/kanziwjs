import * as http2 from 'node:http2'
import type { AnyMessage, ServiceType } from '@bufbuild/protobuf'
import type { HandlerContext, ServiceImpl } from '@connectrpc/connect'
import { connectNodeAdapter } from '@connectrpc/connect-node'
import { UniversalHandlerOptions } from '@connectrpc/connect/protocol'
import { Code, GrpcError } from './status.js'
import type { Interceptor } from './types.js'

export class GrpcEsServer {
  private interceptors: Interceptor[] = []
  private services: { service: ServiceType; implementation: ServiceImpl<ServiceType> }[] = []

  constructor(private options?: Partial<UniversalHandlerOptions>) {}

  use(interceptor: Interceptor): this {
    this.interceptors.push(interceptor)
    return this
  }

  register<Service extends ServiceType>(service: Service, partialImplementation: Partial<ServiceImpl<Service>>): this {
    type Implementation = ServiceImpl<Service>
    const implementation = { ...makeUnimplementedService(service), ...partialImplementation } as Implementation
    const interceptorAppliedImplementation = {} as Implementation

    for (const [key, handler] of Object.entries(implementation)) {
      let appliedHandler = handler
      for (const interceptor of this.interceptors) {
        const currentHandler = appliedHandler
        appliedHandler = (req: AnyMessage & AsyncIterable<AnyMessage>, ctx: HandlerContext) =>
          interceptor(req, ctx, currentHandler)
      }
      interceptorAppliedImplementation[key as keyof Implementation] = appliedHandler
    }
    this.services.push({ service, implementation: interceptorAppliedImplementation })

    return this
  }

  listenAndServe(port: number): void {
    http2
      .createServer(
        connectNodeAdapter({
          routes: (router) => {
            for (const { service, implementation } of this.services) {
              router.service(service, implementation, this.options)
            }
          },
        }),
      )
      .listen(port)
  }
}

function makeUnimplementedService<Service extends ServiceType>(service: Service): ServiceImpl<Service> {
  return Object.keys(service.methods).reduce(
    (us, method) => {
      // @ts-ignore
      us[method] = () => {
        throw new GrpcError(`Unimplemented method: [${method}]`, Code.Unimplemented)
      }
      return us
    },
    {} as ServiceImpl<Service>,
  )
}
