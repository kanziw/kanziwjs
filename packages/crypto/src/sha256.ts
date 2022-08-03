import crypto from 'crypto'

export const sha256 = (str: string) => crypto.createHash('sha256').update(str).digest()
