import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModal from '../Models/userModal'
import { createToken } from '../helpers/middlewares'

const CreateUser = async (
  req: Request<never, never, { username: string; password: string }, never>,
  res: Response,
  next: NextFunction
) => {
  try {
    let user
    const { username, password } = req.body || {}

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'User Created Successfully',
      })
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'User Created Successfully',
      })
    }

    const existingUser = await UserModal.findOne({ username })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User Already exists ',
      })
    }

    const hashedPassword: string = await bcrypt.hash(password, 10)

    user = await UserModal.create({
      username,
      password: hashedPassword,
    })

    const newtoken = await createToken(user._id as string, username as string)

    user.token = newtoken
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: user,
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Something Went Wrong',
    })
  }
}

export { getAllUsers, CreateUser }
