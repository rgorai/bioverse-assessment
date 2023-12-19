import { Router } from 'express'
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
} from '../db/tickets'
import {
  areValidStrings,
  isValidObjectId,
  isValidStatus,
  isValidTicketInput,
} from '../utils/errorChecks'

const ticketsRouter = Router()

// get all tickets
ticketsRouter.get('/', async (req, res) => {
  try {
    return res.status(200).json(await getAllTickets())
  } catch (err) {
    return res.status(500).send(String(err))
  }
})

// get single ticket
ticketsRouter.get('/:ticketId', async (req, res) => {
  const { ticketId } = req.params

  // error check
  try {
    isValidObjectId(ticketId)
  } catch (err) {
    return res.status(400).send(String(err))
  }

  // send ticket details if found
  try {
    return res.status(200).json(await getTicketById(ticketId))
  } catch (err: any) {
    if (err.status && err.message)
      return res.status(err.status).send(err.message)
    else return res.status(500).send(String(err))
  }
})

// create a ticket
ticketsRouter.post('/', async (req, res) => {
  const { name, email, description } = req.body
  const ticketInfo = { name, email, description }

  // error check
  try {
    isValidTicketInput(ticketInfo)
  } catch (err) {
    return res.status(400).send(String(err))
  }

  // create ticket and send details back
  try {
    const ticket = await createTicket(ticketInfo)

    // send email confirmation of ticket creation
    console.log(
      `Ticket creation confirmation email sent to ${ticket.email} with the following details:`,
      ticket
    )

    return res.status(200).json(ticket)
  } catch (err) {
    return res.status(500).send(String(err))
  }
})

// update a ticket's status
ticketsRouter.put('/:ticketId/status', async (req, res) => {
  const { ticketId } = req.params
  const { newStatus } = req.body

  // error check
  try {
    isValidObjectId(ticketId)
    isValidStatus(newStatus)
  } catch (err) {
    return res.status(400).send(String(err))
  }

  // send updated ticket information
  try {
    return res.status(200).json(await updateTicketStatus(ticketId, newStatus))
  } catch (err: any) {
    if (err.status && err.message)
      return res.status(err.status).send(err.message)
    else return res.status(500).send(String(err))
  }
})

// send a message response
ticketsRouter.put('/:ticketId/message', async (req, res) => {
  const { ticketId } = req.params
  const { message } = req.body

  // error check
  try {
    isValidObjectId(ticketId)
    areValidStrings({ message })
  } catch (err) {
    return res.status(400).send(String(err))
  }

  // save message
  try {
    const ticket = await getTicketById(ticketId)

    /* update ticket details */

    // send email confirmation of ticket response
    console.log(
      `Emailing ${ticket.email} following ticket response: ${message}`
    )

    // send confirmation of email back to client
    return res
      .status(200)
      .send(`Emailed ${ticket.email} following ticket response: ${message}`)
  } catch (err) {
    return res.status(500).send(String(err))
  }
})

export default ticketsRouter
