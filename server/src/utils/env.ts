import dotenv from 'dotenv'

dotenv.config()

export const {
  PORT,
  // JWT_SECRET_STRING,
  // JWT_EXPIRATION,
  MONGO_URI,
  NODE_ENV,
} = process.env
