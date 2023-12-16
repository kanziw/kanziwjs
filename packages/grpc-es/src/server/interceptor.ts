import { Code, ConnectError } from '@connectrpc/connect'
import { performance } from 'perf_hooks'
import type { Interceptor } from './types.js'

export const stdoutUnaryServerInterceptor = (): Interceptor => async (req, ctx, next) => {
  const [startsAt, before] = [new Date(), performance.now()]
  let errCode: Code | null = null
  let errLog: { error?: string; stacktrace?: string } = {}

  try {
    return await next(req, ctx)
  } catch (unknownErr) {
    const err = ConnectError.from(unknownErr)
    errCode = err.code
    errLog = { error: err.message, stacktrace: err.stack }

    throw err
  } finally {
    const code = errCode ? Code[errCode] : 'OK'

    const headers = Object.fromEntries(ctx.requestHeader.entries())
    // biome-ignore lint/performance/noDelete: <explanation>
    delete headers.authorization

    console.log(
      JSON.stringify({
        kind: ctx.protocolName,
        grpc: {
          code,
          method: ctx.method.name,
          service: ctx.service.typeName,
          start_time: startsAt.toISOString(),
          time_ms: (performance.now() - before).toFixed(3),
        },
        headers,
        msg: `finished unary call with code ${code}`,
        ...errLog,
      }),
    )
  }
}
