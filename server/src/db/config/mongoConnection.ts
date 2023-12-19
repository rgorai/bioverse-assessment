import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'
import { MONGO_URI } from '../../utils/env'

dotenv.config()

const mongoConfig = {
  serverUrl: MONGO_URI ?? 'mongodb://localhost:27017/',
  database: 'bioverse-assessment-db',
}

let _connection: MongoClient | undefined = undefined
export let _db: Db | undefined = undefined

export const connectToDb = async () => {
  if (!_connection || !_db) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl)
    _db = _connection.db(mongoConfig.database)
  }
  return _db
}

export const closeConnection = async () => {
  if (_connection) await _connection.close()
}
