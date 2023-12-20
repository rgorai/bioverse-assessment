import {
  areValidStrings,
  isValidObjectId,
  isValidStatus,
  isValidTicketInput,
} from '../utils/errorChecks'
import { getTicketsCollection } from './config/mongoCollections'

export const createTicket = async (
  ticketInfo: TicketInput
): Promise<Ticket> => {
  // error check
  isValidTicketInput(ticketInfo)

  // create ticket document
  const ticketsCollection = await getTicketsCollection()
  const insertRet = await ticketsCollection.insertOne({
    ...ticketInfo,
    status: 0,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  })
  if (!insertRet.acknowledged)
    throw `Creation for ticket ${JSON.stringify(ticketInfo)} failed.`

  // return full details
  return await getTicketById(String(insertRet.insertedId))
}

// ONLY USED FOR SEEDING FOR DEVELOPMENT PURPOSES
export const createTicketSEED = async (
  ticketInfo: TicketInput,
  status: Status,
  createdDate: string,
  updatedDate: string
): Promise<Ticket> => {
  // error check
  isValidTicketInput(ticketInfo)
  if (status === 0 && createdDate !== updatedDate)
    throw 'Created date and updated date must match when status is 0.'

  // create ticket document with seeded data
  const ticketsCollection = await getTicketsCollection()
  const insertRet = await ticketsCollection.insertOne({
    ...ticketInfo,
    status,
    createdDate,
    updatedDate,
  })
  if (!insertRet.acknowledged)
    throw `Creation for ticket ${JSON.stringify(ticketInfo)} failed.`

  // return full details
  return await getTicketById(String(insertRet.insertedId))
}

export const getTicketById = async (ticketId: string): Promise<Ticket> => {
  // error check
  areValidStrings({ ticketId })
  const ticketIdObj = isValidObjectId(ticketId)

  // get ticket details
  const ticketsCollection = await getTicketsCollection()
  const ticket = await ticketsCollection.findOne({ _id: ticketIdObj })

  if (!ticket)
    throw { status: 404, message: `Ticket with id ${ticketId} was not found.` }

  return { ...ticket, _id: ticketId }
}

export const getAllTickets = async (): Promise<Ticket[]> => {
  const ticketsCollection = await getTicketsCollection()
  return (
    await ticketsCollection
      .find({})
      .sort({ status: 1, updatedDate: -1 })
      .toArray()
  ).map((e) => ({
    ...e,
    _id: String(e._id),
  }))
}

export const updateTicketStatus = async (
  ticketId: string,
  newStatus: number
): Promise<Ticket> => {
  // error check
  const ticketIdObj = isValidObjectId(ticketId)
  isValidStatus(newStatus)

  // ensure ticket exists and status is not being updated to same value
  const ticket = await getTicketById(ticketId)
  if (ticket.status === newStatus)
    throw { status: 409, message: 'Cannot update status to same value.' }

  // update ticket status
  const ticketsCollection = await getTicketsCollection()
  const updateRet = await ticketsCollection.updateOne(
    { _id: ticketIdObj },
    {
      $set: {
        status: newStatus as Status,
        updatedDate: new Date().toISOString(),
      },
    }
  )
  if (updateRet.modifiedCount !== 1)
    throw `Failed to update ticket ${ticketId} to status ${newStatus}`

  return await getTicketById(ticketId)
}
