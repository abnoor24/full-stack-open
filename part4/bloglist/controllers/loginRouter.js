import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import User from '../model/User.js'
import { SECRET } from '../utils/config.js'

const loginRouter = express.Router()

loginRouter.post('/', async (req,res,next) => {
  try{
    const { username, password } = req.body

    const user = await User.findOne({ username })
    // console.log(`The password is: ${password}`)
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect))
      return res.status(401).json({ error: 'invalid username or password' })

    const useForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(useForToken, SECRET, { expiresIn: 60*60 })
    res.status(200).send({ token, username: user.username, name: user.name, id: user.id })

  }catch(e){next(e)}
})

export default loginRouter