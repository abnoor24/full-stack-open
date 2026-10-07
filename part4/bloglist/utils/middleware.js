import jwt from 'jsonwebtoken'
import User from "../model/User.js"
import { SECRET } from "./config.js"

const errorHandler =(error,req,res,next) => {
  
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  console.log(error)
  next(error)
}

const getTokenFrom = (req,res,next) => { //fix this 4.20
  const authorization = req.get('authorization')
  if(authorization && authorization.startsWith('Bearer '))
    req.token = authorization.replace('Bearer ','')
  else
    req.token = null

  next()
}

const userExtractor = async (req, res, next) => {
  try{
  const decodedToken = jwt.verify(req.token, SECRET)
  if(!decodedToken.id)
    return res.status(401).json({ error: 'invalid token'})

  const user = await User.findById(decodedToken.id)
  if(!user)
    return res.status(400).json({error: 'UserId missing or not valid.'})

  req.user = user
  return next()
  }catch(e){next(e)}//error for invalid token exists in errorHandler
}

export { errorHandler, getTokenFrom, userExtractor }