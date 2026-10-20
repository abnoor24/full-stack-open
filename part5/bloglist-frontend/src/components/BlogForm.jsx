import { Typography, Button, TextField, Box } from '@mui/material'

export default function BlogForm({ createBlog }){
  return <form className="form" action={createBlog}>
    <Typography variant="h4" component="h4" sx={{ margin: '20px 0' }}>
      Create new:
    </Typography>

    <Box sx={{ width: '300px' }}>
      <TextField
        variant="standard"
        label="Title:"
        type="text"
        name="title"
        data-testid="title-input"
        sx={{ display: 'block', mb: 2 }}
        fullWidth
      />
      <TextField
        variant="standard"
        label="Author:"
        type="text"
        name="author"
        data-testid="author-input"
        sx={{ display: 'block', mb: 2 }}
        fullWidth
      />
      <TextField
        variant="standard"
        label="URL:"
        type="text"
        name="url"
        data-testid="url-input"
        sx={{ display: 'block', mb: 2 }}
        fullWidth
      />

      <Button variant='contained' type="submit">Create</Button>
    </Box>
  </form>
}