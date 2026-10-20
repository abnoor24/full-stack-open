import express from 'express'
import Blog from '../model/Blog.js'
import User from '../model/User.js'
import blogs from '../tests/blogs.json' with { type: 'json' }
import bcrypt from 'bcrypt'
const testRouter = express.Router()


testRouter.post('/reset', async (req,res,next) => {
  try{
    await Blog.deleteMany({})
    await User.deleteMany({})

    const password = 'west12345'
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
      username: 'root',
      name: 'superuser',
      passwordHash
    })
    const newUser = await user.save()

    const blogPromise = blogs.map(async (blog) => {
      const sendBlog = new Blog({ ...blog, user: newUser._id })
      const result = await sendBlog.save()
      return result._id
    })

    const blogIds = await Promise.all(blogPromise)

    newUser.blogs = blogIds
    await newUser.save()

    res.status(204).end()
  }catch(e){next(e)}
})

export default testRouter