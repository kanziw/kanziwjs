import { performance } from 'node:perf_hooks'

const startStopwatch = () => {
  const start = performance.now()

  return {
    end(): number {
      return performance.now() - start
    },
  }
}

export default startStopwatch
