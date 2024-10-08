import type { Stream } from 'node:stream'

export const waitUntilFinished = (stream: Stream) =>
  new Promise((resolve, reject) => {
    stream.on('finish', resolve)
    stream.on('error', reject)
  })
