import express, { Router } from 'express'
import { UserController } from '../controllers'
import { verifyToken } from '../helpers/middlewares'

const router: Router = express.Router()

router.post('/create', UserController.CreateUser)

export const userRoutes = router
