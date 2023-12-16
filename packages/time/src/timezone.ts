const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

type Hour =
  | '00'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
type Minute = '00' | '30'
type Offset = `${'+' | '-'}${Hour}:${Minute}`
export type TimeFormatter = {
  date(): string
  time(): string
  datetime(): string
}

const padLeft = (value: string | number, length: number): string => `${value}`.padStart(length, '0')

export const formatWithTimezoneOffset = (offset: Offset): ((input: Date | number) => TimeFormatter) => {
  const operator = offset[0] === '+' ? 1 : -1
  const [hours, minutes] = offset
    .slice(1)
    .split(':')
    .map((numericString) => parseInt(numericString, 10))

  return (input: Date | number) => {
    const ts = typeof input === 'number' ? input : input.getTime()
    const d = new Date(ts + operator * hours * HOUR + operator * minutes * MINUTE)

    return {
      date(): string {
        return `${d.getUTCFullYear()}-${padLeft(d.getUTCMonth() + 1, 2)}-${padLeft(d.getUTCDate(), 2)}`
      },
      time(): string {
        return `${padLeft(d.getUTCHours(), 2)}:${padLeft(d.getUTCMinutes(), 2)}:${padLeft(d.getUTCSeconds(), 2)}`
      },
      datetime(): string {
        return `${this.date()} ${this.time()}`
      },
    }
  }
}

export const utcFormat = formatWithTimezoneOffset('+00:00')
export const kstFormat = formatWithTimezoneOffset('+09:00')
