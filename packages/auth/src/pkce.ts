/**
 * @see https://dropbox.tech/developers/pkce--what-and-why-
 */
import crypto from 'crypto'

interface PKCE {
  codeChallengeMethod: 'S256';

  newCodeVerifier(option?: { byteLength?: number }): string;
  hash(codeVerifier: string): string;
  verify(codeVerifier: string, codeChallenge: string): boolean;
}

const base64Encode = (buf: Buffer) => (
  buf.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
)

const sha256 = (str: string) => crypto.createHash('sha256').update(str).digest()

export const sha256Pkce = (): PKCE => ({
  codeChallengeMethod: 'S256',
  newCodeVerifier({ byteLength = 32 } = {}) {
    return base64Encode(crypto.randomBytes(byteLength))
  },
  hash(codeVerifier: string) {
    return base64Encode(sha256(codeVerifier))
  },
  verify(codeVerifier, codeChallenge) {
    return this.hash(codeVerifier) === codeChallenge
  },
})
