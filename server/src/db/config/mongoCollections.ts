import { Collection, Document } from 'mongodb'
import { connectToDb } from './mongoConnection'

const getCollectionFn = <T extends Document>(
  collection: string,
  createIndex?: { [key: string]: -1 | 1 }
) => {
  let _col: Collection<T> | undefined = undefined
  return async () => {
    if (!_col) {
      const db = await connectToDb()
      _col = db.collection(collection)
      if (createIndex) await _col.createIndex(createIndex)
    }
    return _col
  }
}

export const getTicketsCollection =
  getCollectionFn<CollectionType<Ticket>>('tickets')
