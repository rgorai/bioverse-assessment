import { createAccount } from '../src/db/accounts'
import { closeConnection, connectToDb } from '../src/db/config/mongoConnection'
import { createUser } from '../src/db/users'
import { accountCreationList, userRegistrationList } from './seedData'
;(async () => {
  // drop db
  const db = await connectToDb()
  console.log('Dropping database...')
  await db.dropDatabase()
  console.log('Done dropping')

  // ACCOUNTS
  for (const e of accountCreationList) {
    const account = await createAccount(e)
    console.log('Created account', account._id)
  }

  // USERS
  const users: UserData[] = []
  for (const e of userRegistrationList) {
    const user = await createUser(e)
    users.push(user)
    console.log('Created user', user._id)
  }

  console.log('Done seeding.')
  await closeConnection()
})().catch((err) => {
  console.log('Seed Error:', err)
  closeConnection()
})
