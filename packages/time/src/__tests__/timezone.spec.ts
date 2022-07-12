import { formatWithTimezoneOffset, kstFormat, TimeFormatter, utcFormat } from '../timezone'

describe('timezone', () => {
  const testWithDateAndMs = (
    date: Date,
    timeFormatterFn: (input: Date | number) => TimeFormatter,
    expectedDate: string,
    expectedTime: string,
  ) => {
    const timeFormatterWithDate = timeFormatterFn(date)

    expect(timeFormatterWithDate.date()).toEqual(expectedDate)
    expect(timeFormatterWithDate.time()).toEqual(expectedTime)
    expect(timeFormatterWithDate.datetime()).toEqual(`${expectedDate} ${expectedTime}`)

    const timeFormatterWithMs = timeFormatterFn(date.getTime())

    expect(timeFormatterWithMs.date()).toEqual(expectedDate)
    expect(timeFormatterWithMs.time()).toEqual(expectedTime)
    expect(timeFormatterWithMs.datetime()).toEqual(`${expectedDate} ${expectedTime}`)
  }

  describe('utc', () => {
    test.each([
      ['2022-05-16T00:00:00.000Z', '2022-05-16', '00:00:00'],
      ['2022-05-16T14:59:59.999Z', '2022-05-16', '14:59:59'],
      ['2022-05-16T15:00:00.000Z', '2022-05-16', '15:00:00'],
      ['2022-05-16T20:31:13.874Z', '2022-05-16', '20:31:13'],
      ['2022-05-16T23:59:59.999Z', '2022-05-16', '23:59:59'],
    ])('utcFormat(%s)', (dateStr, expectedDate, expectedTime) => {
      testWithDateAndMs(new Date(dateStr), utcFormat, expectedDate, expectedTime)
    })
  })

  describe('kst', () => {
    test.each([
      ['2022-05-16T00:00:00.000Z', '2022-05-16', '09:00:00'],
      ['2022-05-16T14:59:59.999Z', '2022-05-16', '23:59:59'],
      ['2022-05-16T15:00:00.000Z', '2022-05-17', '00:00:00'],
      ['2022-05-16T20:31:13.874Z', '2022-05-17', '05:31:13'],
      ['2022-05-16T23:59:59.999Z', '2022-05-17', '08:59:59'],
      ['2022-01-01T00:00:00.000Z', '2022-01-01', '09:00:00'],
    ])('kstFormat(%s)', (dateStr, expectedDate, expectedTime) => {
      testWithDateAndMs(new Date(dateStr), kstFormat, expectedDate, expectedTime)
    })
  })

  describe('+17:30', () => {
    test.each([
      ['2022-05-16T00:00:00.000Z', '2022-05-16', '17:30:00'],
      ['2022-05-16T14:59:59.999Z', '2022-05-17', '08:29:59'],
      ['2022-05-16T15:00:00.000Z', '2022-05-17', '08:30:00'],
      ['2022-05-16T20:31:13.874Z', '2022-05-17', '14:01:13'],
      ['2022-05-16T23:59:59.999Z', '2022-05-17', '17:29:59'],
    ])('formatWithTimezoneOffset(+17:30)(%s)', (dateStr, expectedDate, expectedTime) => {
      testWithDateAndMs(new Date(dateStr), formatWithTimezoneOffset('+17:30'), expectedDate, expectedTime)
    })
  })

  describe('-06:30', () => {
    test.each([
      ['2022-05-16T00:00:00.000Z', '2022-05-15', '17:30:00'],
      ['2022-05-16T14:59:59.999Z', '2022-05-16', '08:29:59'],
      ['2022-05-16T15:00:00.000Z', '2022-05-16', '08:30:00'],
      ['2022-05-16T20:31:13.874Z', '2022-05-16', '14:01:13'],
      ['2022-05-16T23:59:59.999Z', '2022-05-16', '17:29:59'],
    ])('formatWithTimezoneOffset(-06:30)(%s)', (dateStr, expectedDate, expectedTime) => {
      testWithDateAndMs(new Date(dateStr), formatWithTimezoneOffset('-06:30'), expectedDate, expectedTime)
    })
  })
})
