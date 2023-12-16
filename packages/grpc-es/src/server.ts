import * as http2 from 'node:http2'
import type { AnyMessage, ServiceType } from '@bufbuild/protobuf'
import { HandlerContext, MethodImpl, ServiceImpl } from '@connectrpc/connect'
import { connectNodeAdapter } from '@connectrpc/connect-node'

type Handler = MethodImpl<ServiceType['methods'][keyof ServiceType['methods']]>
export type Middleware = (
  req: AnyMessage & AsyncIterable<AnyMessage>,
  ctx: HandlerContext,
  next: Handler,
) => ReturnType<Handler>

export class GrpcEsServer {
  private middlewares: Middleware[] = []
  private services: { service: ServiceType; implementation: ServiceImpl<ServiceType> }[] = []

  use(middleware: Middleware): this {
    this.middlewares.push(middleware)
    return this
  }

  register<Service extends ServiceType>(service: Service, implementation: ServiceImpl<Service>): this {
    const middlewareAppliedImplementation = {} as ServiceImpl<typeof service>

    for (const [key, handler] of Object.entries(implementation)) {
      let appliedHandler = handler
      for (const middleware of this.middlewares) {
        const currentHandler = appliedHandler
        appliedHandler = ((req: AnyMessage & AsyncIterable<AnyMessage>, ctx: HandlerContext) =>
          middleware(req, ctx, currentHandler)) as Handler
      }
      middlewareAppliedImplementation[key as keyof ServiceImpl<typeof service>] = appliedHandler
    }

    this.services.push({ service, implementation: middlewareAppliedImplementation })
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
