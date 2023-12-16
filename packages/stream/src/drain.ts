import { Stream } from 'stream'

export const drain = async (stream: Stream): Promise<Buffer> => {
  const bufs: Uint8Array[] = []

  return new Promise<Buffer>((resolve) => {
    stream.on('data', (chunk) => bufs.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(bufs)))
  })
}
