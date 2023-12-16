import * as http2 from 'node:http2'
import type { AnyMessage, ServiceType } from '@bufbuild/protobuf'
import type { HandlerContext, ServiceImpl } from '@connectrpc/connect'
import { connectNodeAdapter } from '@connectrpc/connect-node'
import type { Handler, Interceptor } from './types.js'

export class GrpcEsServer {
  private interceptors: Interceptor[] = []
  private services: { service: ServiceType; implementation: ServiceImpl<ServiceType> }[] = []

  use(interceptor: Interceptor): this {
    this.interceptors.push(interceptor)
    return this
  }

  register<Service extends ServiceType>(service: Service, implementation: ServiceImpl<Service>): this {
    const interceptorAppliedImplementation = {} as ServiceImpl<typeof service>

    for (const [key, handler] of Object.entries(implementation)) {
      let appliedHandler = handler
      for (const interceptor of this.interceptors) {
        const currentHandler = appliedHandler
        appliedHandler = ((req: AnyMessage & AsyncIterable<AnyMessage>, ctx: HandlerContext) =>
          interceptor(req, ctx, currentHandler)) as Handler
      }
      interceptorAppliedImplementation[key as keyof ServiceImpl<typeof service>] = appliedHandler
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
              router.service(service, implementation)
            }
          },
        }),
      )
      .listen(port)
  }
}
