import { MONGODB_URI } from './utils/config.js'
import * as middleware from './utils/middleware.js'
import express from 'express'
import mongoose from 'mongoose'
import blogRouter from './controllers/blogRouter.js'
import userRouter from './controllers/userRouter.js'
import loginRouter from './controllers/loginRouter.js'

const app = express()

mongoose.connect(MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')})
  .catch((error) =>
    console.log('Error connecting to MongoDB: ', error.message))

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.getTokenFrom)

//IF using request logger USE MIDDLEWARE HERE

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.errorHandler)

export default app