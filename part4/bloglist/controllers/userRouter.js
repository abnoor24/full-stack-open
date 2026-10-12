import express from 'express'
import User from '../model/User.js'
import bcrypt from 'bcrypt'

const userRouter = express.Router()

userRouter.get('/', async (req,res,next) => {
  try{
    const result = await User.find({}).populate('blogs',{ title: 1, author: 1, url: 1, likes: 1 }) // Need to give the required fields in blogs here
    res.json(result)

  }catch(e){next(e)}
})

userRouter.post('/', async (req,res,next) => {
  try{
    const { username, name, password } = req.body

    if( (!password) || (password.length <= 3))
      return res.status(400).json({ error: 'Password must be greater than 3 characters.' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)

  }catch(e){next(e)}
})


export default userRouter