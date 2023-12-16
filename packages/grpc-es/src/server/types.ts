import type { AnyMessage, ServiceType } from '@bufbuild/protobuf'
import type { HandlerContext, MethodImpl } from '@connectrpc/connect'

export type Handler = MethodImpl<ServiceType['methods'][keyof ServiceType['methods']]>

export type Interceptor = (
  req: AnyMessage & AsyncIterable<AnyMessage>,
  ctx: HandlerContext,
  next: Handler,
) => ReturnType<Handler>
