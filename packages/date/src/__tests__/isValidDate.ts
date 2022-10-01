import { isValidDate } from '../isValidDate'

describe('isValidDate', () => {
  test.each([
    [new Date(), true],
    [new Date(0), true],
    [new Date(-8640000000000000), true],
    [new Date(8640000000000000), true],
    [new Date(-8640000000000000 - 1), false],
    [new Date(8640000000000000 + 1), false],
    [new Date(''), false],
    [new Date(NaN), false],
    [new Date(Number.MAX_SAFE_INTEGER + 1), false],
  ])('isValidDate(%p) === %p', (date, expected) => {
    expect(isValidDate(date)).toBe(expected)
  })
})
