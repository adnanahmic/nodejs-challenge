import express, { Router } from 'express'
import { ArticleController } from '../controllers'
import { verifyToken } from '../helpers/middlewares'

const router: Router = express.Router()

router.get('/all', ArticleController.getAllArticles)
router.get('/published', ArticleController.getPublishedArticles)
router.post('/create', verifyToken, ArticleController.createArticle)
router.delete('/delete', verifyToken, ArticleController.deleteArticle)

export const articleRoutes = router
