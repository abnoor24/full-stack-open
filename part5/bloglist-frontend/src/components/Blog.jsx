import { Card, CardContent, CardActions, Typography, Link, Button, Box } from '@mui/material'
import { addLikes, deleteBlog } from '../services/blogs'
// import { getUserBlogs } from '../services/blogs'
const Blog = ({ blog, setBlogs, notify, user }) => {
  if (!blog) return null
  const isDeleteVisible = user && (blog.user.id === user.id)

  const likesBtn = async () => {
    try{
      const result =await addLikes(blog.id)
      setBlogs(prevBlogs => prevBlogs.map(prev => prev.id === blog.id ? result : prev))
    }catch(e){
      notify(e.message, 'error')
      console.log(e)
    }
  }

  const deleteBtn = async () => {
    try{
      if(window.confirm(`Do you want to delete ${blog.title}`)){
        await deleteBlog(blog.id)
        setBlogs(prevBlogs => prevBlogs.filter(prev => prev.id !== blog.id))
        notify('Blog sucessfully deleted')
      }
    }catch(e){
      notify(e.message, 'error')
      console.log(e)
    }
  }

  return <Box
    sx={{
      margin: '50px',
      px: 2
    }}
  >
    <Card
      variant="outlined"
      sx={{ maxWidth: 400,
        width: 'fit-content',
        backgroundColor: '#e3f2fd',
        mb: 2 }}>
      <CardContent sx={{ marginRight: '10px' }}>
        <Typography variant="h6" className="bloglist-item-heading" gutterBottom>
          {blog.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Author: {blog.author}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1, wordBreak: 'break-all' }}>
          URL: <Link href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</Link>
        </Typography>

        <Typography variant="body2">
          Likes: <span data-testid="like-count">{blog.likes}</span>
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          {user && (
            <Button variant="outlined" size="small" onClick={likesBtn}>
              Like
            </Button>
          )}
        </Box>

        {isDeleteVisible && (
          <Button
            id="delete-btn"
            variant="contained"
            color="error"
            size="small"
            onClick={deleteBtn}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  </Box>
}

export default Blog

