import {
  areValidStrings,
  isValidObjectId,
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
    status: 'New',
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  })
  if (!insertRet.acknowledged)
    throw `Creation for ticket ${JSON.stringify(ticketInfo)} failed.`

  // return full details
  return await getTicketDetails(String(insertRet.insertedId))
}

export const getTicketDetails = async (ticketId: string): Promise<Ticket> => {
  // error check
  areValidStrings({ ticketId })
  const ticketIdObj = isValidObjectId(ticketId)

  // get ticket details
  const ticketsCollection = await getTicketsCollection()
  const ticket = await ticketsCollection.findOne({ _id: ticketIdObj })
  if (!ticket) throw `Ticket ${ticketId} does not exist.`

  return { ...ticket, _id: ticketId }
}

export const getAllTickets = async (): Promise<Ticket[]> => {
  const ticketsCollection = await getTicketsCollection()
  return (await ticketsCollection.find({}).toArray()).map((e) => ({
    ...e,
    _id: String(e._id),
  }))
}
