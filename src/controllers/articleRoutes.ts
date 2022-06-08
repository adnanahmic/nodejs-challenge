import { NextFunction, Request, Response } from 'express'
import ArticleModal from '../Models/articleModal'
import mongoose from 'mongoose'

const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allArticles = await ArticleModal.find()
    if (allArticles.length > 0) {
      return res.status(200).json({
        success: true,
        data: allArticles,
      })
    }
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Cannot get All Articles',
    })
  }
}

const deleteArticle = async (
  req: Request<
    never,
    never,
    { user_id: mongoose.Types.ObjectId; article_id: mongoose.Types.ObjectId },
    never
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, article_id } = req.body || {}

    const deletedArticle = await ArticleModal.deleteOne({
      user_id,
      _id: article_id,
    })

    return res.status(200).json({
      success: true,
      message: 'Article Deleted Successfully',
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Cannot delete Articles',
    })
  }
}

const createArticle = async (
  req: Request<
    never,
    never,
    {
      title: string
      slug: string
      userId: mongoose.Types.ObjectId
      published_at?: Date
      privateArticle?: boolean // Since article is a reserved word so thats why I put it as privateArticle
    },
    never
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, slug, userId, published_at, privateArticle } = req.body || {}
    const article = await ArticleModal.create({
      title,
      slug,
      user_id: userId,
    })

    if (published_at) {
      article.published_at = published_at
      await article.save()
    }

    if (privateArticle || !privateArticle) {
      article.private = privateArticle
      await article.save()
    }

    return res.status(200).json({
      success: true,
      message: 'Article Created Successfully',
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Cannot Create Articles',
    })
  }
}

const getPublishedArticles = async (
  req: Request<
    never,
    never,
    {
      articleId: mongoose.Types.ObjectId
      userId: mongoose.Types.ObjectId
      published_at: string
    },
    never
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    let publishableArticle = await ArticleModal.find({
      published_at: { $exists: true },
    })

    return res.status(200).json({
      success: true,
      data: publishableArticle,
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Cannot Make Articles Published',
    })
  }
}

export { getAllArticles, deleteArticle, createArticle, getPublishedArticles }
