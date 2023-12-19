// PRIMITIVES //

const isValidString = (str: any) =>
  typeof str === 'string' && str.trim().length !== 0

export const areValidStrings = <T extends Record<string, any>>(data: T) => {
  for (const k in data)
    if (!isValidString(data[k])) throw `${k} must be a non-empty string.`
}

export const areValidNumbers = <T extends Record<string, any>>(
  data: T,
  options?: {
    min?: number
    max?: number
  }
): Record<string, number> => {
  const ret: Record<keyof T, number> = {} as any
  for (const k in data) {
    const currVal = data[k]

    if (isNaN(currVal))
      throw `${k} must be a valid number. Received: ${currVal}`
    else if (
      (options?.min !== undefined && currVal < options.min) ||
      (options?.max !== undefined && currVal > options.max)
    )
      throw `${k} must be a valid number ${
        options.min !== undefined ? `${options.min} or more` : ''
      }${
        options.min !== undefined && options.max !== undefined ? ' and ' : ''
      }${
        options.max !== undefined ? `${options.max} or less` : ''
      }. Received: ${currVal}`
    else ret[k] = Number(currVal)
  }
  return ret
}

// OTHER //

export const isValidEmail = (email: any) => {
  areValidStrings({ email })

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw 'Invalid email address.'
}

export const isValidStatus = (status: any) => {
  areValidNumbers({ status }, { min: 0, max: 2 })
}
