import express from 'express'
import Blog from '../model/Blog.js'
import { userExtractor } from '../utils/middleware.js'

//import mongoose from 'mongoose'

const blogRouter = express.Router()


blogRouter.get('/',async (req,res,next) => {
  try{
    const result =await Blog.find({}).populate('user',{ username: 1, name: 1 })
    res.json(result)
  }catch(error){next(error)}
})

blogRouter.get('/:id', async (req,res,next) => {
  try{
    const result = await Blog.findById(req.params.id).populate('user',{ username: 1, name: 1 }) // populate might be needed here

    if (!result)
      return res.status(404).json({ error: 'Blog not found' })

    res.json(result)
  }catch(error){next(error)}
})



blogRouter.post('/', userExtractor ,async (req, res,next) => {
  try{
    const newBlog = req.body
    const user = req.user

    if (!newBlog)
      return res.status(400).json({ error: 'Content missing!' })
    if(!['author','url','title'].every(key => key in newBlog))
      return res.status(400).json({ error: 'Missing Input!' })

    const blog = new Blog({
      author: newBlog.author,
      title: newBlog.title,
      url: newBlog.url,
      likes: newBlog.likes || 0 ,
      user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    res.status(201).json(result)
  }catch(error){next(error)}
})

blogRouter.delete('/:id', userExtractor ,async (req,res,next) => {
  try{
    const user = req.user

    const deletedBlog = await Blog.findByIdAndDelete(req.params.id) //Deletion happens here for blogs
    if (!deletedBlog)
      return res.status(404).json({ error: 'Blog not found' })

    user.blogs = user.blogs.filter(id => id !== user._id)//Deletion here for blog_id in user
    await user.save()

    res.status(204).json(deletedBlog)
  }catch(error){
    next(error)
  }
})

blogRouter.put('/:id', userExtractor , async (req,res,next) => {
  try{
    const newBlog = req.body
    if (!newBlog) return res.status(400).json({ error: 'Content missing!' })
    if(!['author','url','title'].every(key => key in newBlog))
      return res.status(400).json({ error: 'Missing Input!' })

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      newBlog,
      { returnDocument: 'after' }
    )

    if (!updatedBlog)
      return res.status(404).json({ error: 'Blog not found' })

    res.status(200).json(updatedBlog)
  }catch(error){next(error)}
})


blogRouter.put('/likes/:id', userExtractor , async (req,res,next) => {
  try{
    const blog = await Blog.findById(req.params.id)

    if (!blog)
      return res.status(404).json({ error: 'Blog not found' })

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { likes: blog.likes + 1 },
      { returnDocument: 'after' }
    ).populate('user', { username: 1, name: 1, id: 1 })

    if (!updatedBlog)
      return res.status(404).json({ error: 'Blog not found' })

    res.status(200).json(updatedBlog)
  }catch(error){next(error)}
})

export default blogRouter