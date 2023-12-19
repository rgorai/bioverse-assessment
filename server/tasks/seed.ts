import { closeConnection, connectToDb } from '../src/db/config/mongoConnection'
import { createTicketSEED } from '../src/db/tickets'
import { ticketData } from './seedData'
;(async () => {
  // drop db
  const db = await connectToDb()
  console.log('Dropping database...')
  await db.dropDatabase()
  console.log('Done dropping')

  // create tickets
  for (const e of ticketData) {
    const ticket = await createTicketSEED(
      e,
      e.status,
      e.createdDate,
      e.updatedDate
    )
    console.log('Created ticket', ticket._id)
  }

  console.log('Done seeding.')
  await closeConnection()
})().catch((err) => {
  console.log('Seed Error:', err)
  closeConnection()
})
