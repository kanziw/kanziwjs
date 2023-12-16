export const AUTH_HEADER_PREFIX_BASIC = 'Basic'
export const AUTH_HEADER_PREFIX_BEARER = 'Bearer'

export const basic = (id: string, secret: string): string =>
  `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`
export const parseBasic = (headerValue: string): { id: string; secret: string } | { error: string } => {
  const [tokenType, encoded] = headerValue.split(' ')
  if (tokenType !== AUTH_HEADER_PREFIX_BASIC) {
    return { error: `${AUTH_HEADER_PREFIX_BASIC} token type required` }
  }

  const decoded = Buffer.from(encoded, 'base64').toString()
  const [id, secret] = decoded.split(':')
  return { id, secret }
}

export const bearer = (accessToken: string): string => `Bearer ${accessToken}`
export const parseBearer = (headerValue: string): { accessToken: string } | { error: string } => {
  const [tokenType, accessToken] = headerValue.split(' ')
  if (tokenType !== AUTH_HEADER_PREFIX_BEARER) {
    return { error: `${AUTH_HEADER_PREFIX_BEARER} token type required` }
  }

  return { accessToken }
}
