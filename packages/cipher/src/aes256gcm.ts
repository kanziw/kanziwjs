import assert from 'assert'
import crypto from 'crypto'

import type { Cipher } from './cipher'

const ALGORITHM = 'aes-256-gcm'
const INITIALIZATION_VECTOR_LENGTH = 12
const AUTH_TAG_LENGTH = 16
const NON_ENCRYPTED_TEXT_LENGTH = INITIALIZATION_VECTOR_LENGTH + AUTH_TAG_LENGTH

const generateRandomIv = (): Buffer => crypto.randomBytes(INITIALIZATION_VECTOR_LENGTH)
export const generateFixedNounce = (): Buffer => generateRandomIv()

export const aes256gcm = (cipherKey: Buffer, { fixedNounce = null }: { fixedNounce?: Buffer | null } = {}): Cipher => {
  if (fixedNounce) {
    assert(
      fixedNounce.length === INITIALIZATION_VECTOR_LENGTH,
      `Initialization Vector length must be ${INITIALIZATION_VECTOR_LENGTH}`,
    )
  }

  const encrypt = (plainText: string): string => {
    const iv = fixedNounce ?? generateRandomIv()
    const cipher = crypto.createCipheriv(ALGORITHM, cipherKey, iv, {
      authTagLength: AUTH_TAG_LENGTH,
    })

    return Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final(), iv, cipher.getAuthTag()]).toString('base64')
  }

  const decrypt = (encryptedText: string) => {
    const encryptedBuffer = Buffer.from(encryptedText, 'base64')
    const [encryptedTextBuffer, iv, tag] = [
      encryptedBuffer.slice(0, encryptedBuffer.length - NON_ENCRYPTED_TEXT_LENGTH),
      encryptedBuffer.slice(
        encryptedBuffer.length - NON_ENCRYPTED_TEXT_LENGTH,
        encryptedBuffer.length - AUTH_TAG_LENGTH,
      ),
      encryptedBuffer.slice(encryptedBuffer.length - AUTH_TAG_LENGTH),
    ]

    const decipher = crypto.createDecipheriv(ALGORITHM, cipherKey, fixedNounce ?? iv, {
      authTagLength: AUTH_TAG_LENGTH,
    })
    decipher.setAuthTag(tag)

    return decipher.update(encryptedTextBuffer, undefined, 'utf8') + decipher.final('utf8')
  }

  return {
    encrypt,
    decrypt,
  }
}
