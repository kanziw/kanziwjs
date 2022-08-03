import { sha256 } from '../sha256'

describe('Sha256', () => {
  it('success', () => {
    expect(sha256('test').toString('hex')).toEqual('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')
  })
})
