export const isValidDate = (d: Date): boolean => d instanceof Date && !Number.isNaN(d.getTime())
