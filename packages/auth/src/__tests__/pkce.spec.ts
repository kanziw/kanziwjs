import { sha256Pkce } from '../pkce'

describe('PKCE', () => {
  describe('sha256', () => {
    it('success', async () => {
      const pkce = sha256Pkce()
      const codeVerifier = pkce.newCodeVerifier()
      const codeChallenge = pkce.hash(codeVerifier)

      expect(pkce.verify(codeVerifier, codeChallenge)).toBe(true)
      expect(pkce.verify('invalidCodeVerifier', codeChallenge)).toBe(false)
      expect(pkce.verify(codeVerifier, 'invalidCodeChallenge')).toBe(false)
    })
  })
})
