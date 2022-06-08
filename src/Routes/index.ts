import { Application } from 'express'
import { articleRoutes } from './articleRoutes'
import { userRoutes } from './userRoutes'

export const initRoutes = (app: Application) => {
  app.use('/api/articles', articleRoutes)
  app.use('/api/user', userRoutes)
}
