import { Router } from 'express'
import { createUser, getUserById, validateUser } from '../db/users'
import { ensureAuthenticated, ensureNotAuthenticated } from '../middleware/auth'
import { authenticateUser } from '../utils/authFunctions'
import { areValidStrings, isValidUser } from '../utils/errorChecks'
import { sendServerError, sendServerSuccess } from '../utils/routeFunctions'

const authRouter = Router()

authRouter.get(
  '/isAuthenticated/:userId/:username',
  ensureAuthenticated,
  async (req, res) =>
    sendServerSuccess(
      res,
      await authenticateUser(req.params.userId, req.params.username)
    )
)

authRouter.post('/signup', ensureNotAuthenticated, async (req, res) => {
  const user = (({
    fullName,
    birthdate,
    gender,
    nationalities,
    email,
    username,
    password,
    savedAddresses,
    savedRestaurants,
  }: UserData) => ({
    fullName,
    birthdate,
    gender,
    nationalities,
    email,
    username,
    password,
    savedAddresses,
    savedRestaurants,
  }))(req.body)

  // error check
  try {
    isValidUser(user)
  } catch (err) {
    return sendServerError(res, 400, err, __filename)
  }

  // create new user
  try {
    return sendServerSuccess(res, await createUser(user))
  } catch (err) {
    return sendServerError(res, 500, String(err), __filename)
  }
})

authRouter.post('/login', ensureNotAuthenticated, async (req, res) => {
  const { username, password } = req.body

  // error check
  try {
    areValidStrings({ username, password })
  } catch (err) {
    return sendServerError(res, 400, String(err), __filename)
  }

  // authenticate user
  try {
    const auth = await validateUser({ username, password })
    if (auth.authenticated) return sendServerSuccess(res, auth)
    else
      return sendServerError(
        res,
        401,
        'Invalid username or password',
        __filename
      )
  } catch (err) {
    return sendServerError(res, 500, String(err), __filename)
  }
})

authRouter.get('/profile', ensureAuthenticated, async (req, res) => {
  const { user_id } = req.headers

  // error check
  try {
    areValidStrings({ user_id })
  } catch (err) {
    return sendServerError(res, 400, String(err), __filename)
  }

  // send user profile without password
  try {
    return sendServerSuccess(res, await getUserById(user_id as string))
  } catch (err) {
    return sendServerError(res, 500, String(err), __filename)
  }
})

export default authRouter
