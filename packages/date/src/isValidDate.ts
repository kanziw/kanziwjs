export const isValidDate = (d: Date): boolean => (
  d instanceof Date && !isNaN(d.getTime())
)
