import crypto from 'crypto'

export const sha256 = (str: string): Buffer => (
  crypto.createHash('sha256').update(str).digest()
)
