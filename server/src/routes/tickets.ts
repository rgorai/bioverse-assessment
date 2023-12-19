import { Router } from 'express'
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
} from '../db/tickets'
import {
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

  // create ticket and send details
  try {
    return res.status(200).json(await createTicket(ticketInfo))
  } catch (err) {
    return res.status(500).send(String(err))
  }
})

// update a ticket's status
ticketsRouter.put('/:ticketId/:newStatus', async (req, res) => {
  const { ticketId, newStatus } = req.params

  try {
    // error check
    isValidObjectId(ticketId)
    isValidStatus(newStatus)
  } catch (err) {
    return res.status(400).send(String(err))
  }

  // send updated ticket information
  try {
    return res
      .status(200)
      .json(await updateTicketStatus(ticketId, Number(newStatus)))
  } catch (err: any) {
    if (err.status && err.message)
      return res.status(err.status).send(err.message)
    else return res.status(500).send(String(err))
  }
})

export default ticketsRouter
