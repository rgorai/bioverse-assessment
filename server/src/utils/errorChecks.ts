import { ObjectId } from 'mongodb'

// TODO: NEED TO REWORK ERROR SYSTEM USING OBJECTS

// PRIMITIVES //

const isValidString = (str: any) =>
  typeof str === 'string' && str.trim().length !== 0

export const areValidStrings = <T extends Record<string, any>>(data: T) => {
  for (const k in data)
    if (!isValidString(data[k]))
      throw `${k} must be a non-empty string. Received: ${data[k]}`
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

export const isValidObjectId = (objectId: any) => {
  if (!ObjectId.isValid(objectId)) throw `Invalid ObjectId: ${objectId}`
  return new ObjectId(objectId)
}

// OTHER //

export const areValidObjects = <T extends Record<string, any>>(data: T) => {
  for (const k in data)
    if (typeof data[k] !== 'object' || Array.isArray(data))
      throw {
        message: 'Invalid object received',
        object: data[k],
      }
}

export const isValidEmail = (email: any) => {
  if (
    typeof email !== 'string' ||
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  )
    throw `Invalid email. Received: ${email}`
}

export const isValidDate = (date: any, pastDatesOnly?: boolean) => {
  const dateVal = Date.parse(date)
  if (isNaN(dateVal) || (pastDatesOnly && Date.now() < dateVal))
    throw `Invalid date. Received: ${date}`
}

export const isValidTicketInput = (info: TicketInput) => {
  const { name, email, description } = info

  areValidStrings({ name, email, description })

  isValidEmail(email)
}
