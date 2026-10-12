import { useState } from 'react'
import { addLikes, deleteBlog } from '../services/blogs'

const Blog = ({ blog, setBlogs, notify }) => {
  const [visible, setVisible] = useState(false)
  if (!blog) return null

  const toggleVisibility = () => {
    setVisible(prev => (!prev))
  }

  const likes = async () => {
    try{
      const result =await addLikes(blog.id)
      setBlogs(prevBlogs => prevBlogs.map(prev => prev.id === blog.id ? result : prev))
    }catch(e){
      notify(e.message,true)
      console.log(e)
    }
  }

  const deleteBtn = async () => {
    try{
      const result = await deleteBlog(blog.id)
      console.log(result)
      setBlogs(prevBlogs => prevBlogs.filter(prev => prev.id !== blog.id))
    }catch(e){
      notify(e.message,true)
      console.log(e)
    }
  }

  return <div className="bloglist-item">
    <div className="bloglist-item-heading">{blog.title}{visible && ` - ${blog.author}`}
      <button onClick={toggleVisibility}>{visible? 'Hide' : 'Show'}</button>
    </div>
    {visible && <>
      <div>URL: <a href={blog.url}>{blog.url}</a></div>
      <div>Likes: {blog.likes}
        <button onClick={likes}>Like</button>
      </div>
      <div>Author: {blog.author}</div>
      <button id="delete-btn" onClick={deleteBtn}>Delete</button>
    </>}
  </div>
}

export default Blog