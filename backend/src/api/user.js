import express from 'express'
import signup from './user-signup.js'
import { getUserProfile } from './user-controller.js'
// import auth from '../utils/auth.js'

const router = express.Router()

// Define all routers
router.post('/signup', signup)
router.get('/getProfile/:userId', /*auth, */ getUserProfile)

export default router
