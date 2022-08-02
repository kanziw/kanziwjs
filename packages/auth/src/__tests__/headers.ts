import { AUTH_HEADER_PREFIX_BASIC, AUTH_HEADER_PREFIX_BEARER, basic, bearer, parseBasic, parseBearer } from '../headers'

describe('Headers', () => {
  it('Basic', () => {
    const [id, secret] = ['FAKE_ID', 'FAKE_SECRET']
    const basicHeaderValue = basic(id, secret)

    expect(basicHeaderValue).toBe('Basic RkFLRV9JRDpGQUtFX1NFQ1JFVA==')
    expect(parseBasic(basicHeaderValue)).toEqual({ id, secret })

    expect(parseBasic(basicHeaderValue.replace(AUTH_HEADER_PREFIX_BASIC, 'Bearer'))).toEqual({
      error: `${AUTH_HEADER_PREFIX_BASIC} token type required`,
    })
  })

  it('Bearer', () => {
    const accessToken = 'FAKE_ACCESS_TOKEN'
    const bearerHeaderValue = bearer(accessToken)

    expect(bearerHeaderValue).toBe(`Bearer ${accessToken}`)
    expect(parseBearer(bearerHeaderValue)).toEqual({ accessToken })

    expect(parseBearer(bearerHeaderValue.replace(AUTH_HEADER_PREFIX_BEARER, 'Basic'))).toEqual({
      error: `${AUTH_HEADER_PREFIX_BEARER} token type required`,
    })
  })
})
