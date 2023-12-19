import { ObjectId } from 'mongodb'

declare global {
  type CollectionType<T, ObjectIdKeys extends keyof T = never> = Omit<
    T,
    '_id' | ObjectIdKeys
  > & {
    _id?: ObjectId
  } & {
    [K in ObjectIdKeys]: ObjectId
  }
}
