import jwt from 'jsonwebtoken'
import { JWT_EXPIRATION, JWT_SECRET_STRING } from './env'

type AuthProps = [userId: false] | [userId: string, username: string]

export const authenticateUser = async (
  ...[user_id, username]: AuthProps
): Promise<AuthResponse> => {
  try {
    if (!(user_id && JWT_SECRET_STRING)) throw null

    return {
      user_id,
      username,
      authenticated: true,
      access_token: jwt.sign({ id: user_id }, JWT_SECRET_STRING, {
        expiresIn:
          JWT_EXPIRATION && !isNaN(Number(JWT_EXPIRATION))
            ? Number(JWT_EXPIRATION)
            : 3600, // sec
      }),
    }
  } catch (err) {
    return { authenticated: false }
  }
}
