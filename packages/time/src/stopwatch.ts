import { performance } from 'perf_hooks'

export const startStopwatch = () => {
  const start = performance.now()

  return {
    end(): number {
      return performance.now() - start
    },
  }
}
