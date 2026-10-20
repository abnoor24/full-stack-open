import { Link } from 'react-router-dom'
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'

const BlogList = ({ blogs }) => {
  const sortedBlog = blogs.toSorted((a,b) => b.likes-a.likes)

  const blogList = sortedBlog.map(blog => {return (
    <ListItem key={blog.id} disablePadding>
      <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
        <ListItemText
          primary={blog.title}
          secondary={`By ${blog.author}`}
        />
      </ListItemButton>
    </ListItem>
  )
  })
  return <>
    <Typography variant="h5" component="h5" sx={{ margin: '20px 0', fontWeight: 600 }}>
      Blogs:
    </Typography>

    <List>
      {blogList}
    </List>
  </>
}

export default BlogList
