import { Router } from 'express'

const ticketsRouter = Router()

// get all tickets
ticketsRouter.get('/', async (req, res) => {
  // error check
})

// get single ticket
ticketsRouter.get('/:ticketId', async (req, res) => {
  // error check
})

// create a ticket
ticketsRouter.post('/', async (req, res) => {
  // error check
})

// update a ticket status
ticketsRouter.put('/:ticketId', async (req, res) => {
  // error check
})

export default ticketsRouter
