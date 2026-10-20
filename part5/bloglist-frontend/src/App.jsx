import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { Button, AppBar, Container, Toolbar, Typography } from '@mui/material'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import * as blogService from './services/blogs'
import loginService from './services/login'
import UserMenu from './components/UserMenu'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutBtn from './components/LogoutBtn'
import Blog from './components/Blog'

// import Toggalable from './components/Toggalable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const selectedBlog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  // const createBlogRef= useRef()

  useEffect(() => {
    //Get all the blogs from the database
    blogService.getAll().then(result =>
      setBlogs( result )
    )
  }, [])

  useEffect(() => {
    //Check if user exists. If yes, then save the user to setUser
    if('loggedInUser' in localStorage){
      const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      //TOKEN might go here
      blogService.addToken(loggedInUser.token)
    }
  },[])

  const handleLogin = async (formData) => {
    try{
      const username = formData.get('username')
      const password = formData.get('password')
      if(!username || !password) return notify('Username or password empty', 'warning')
      const newUser = await loginService.userLogin({ username,password })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(newUser)
      )
      setUser(newUser)
      blogService.addToken(newUser.token)
      notify( 'Login Successful' )
      navigate('/')
    }catch(e){
      notify(e.message, 'error')
      console.log(e) //Set error messages on the frontend
    }
  }

  const createBlog = async (formData) => {
    try{
      const title = formData.get('title')
      const author = formData.get('author')
      const url = formData.get('url')

      if([title,author,url].some(item => !item))
        return console.log('Invalid Input')

      const newBlog = { title, author, url }
      const result = await blogService.createBlog(newBlog)
      setBlogs(prev => [...prev, result])
      // createBlogRef.current.toggleVisibility()

      notify(`A new blog '${result.title}' by ${result.author} added.`)

    //await blogService.createBlog(newBlog)
    }catch(e){
      if(e.message === 'invalid token')
        notify('Login Required', 'warning')
      else
        notify(e.message, 'error')
      console.log(e)
    }
  }

  const notify = (message, type = 'success') => {
    setNotification({ message: message, type: type })
    setTimeout(() => {
      setNotification(null)
    },5000)
  }

  const navButtonStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position='static' id='header'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button to={'/'} component={Link} color='inherit' sx={navButtonStyle}>Blogs</Button>
          <Button to={'/create'} component={Link} color='inherit' sx={navButtonStyle}>Create Blogs</Button>
          {(!user)
            ? <Button to={'/login'} component={Link} color='inherit' sx={navButtonStyle}>Login</Button>
            :<LogoutBtn setUser={setUser} notify={notify} style={navButtonStyle}/>}
        </Toolbar>
      </AppBar>
      <div >
      </div>
      <main>
        <Notification notification={notification}/>

        <Routes>
          <Route path='/login'  element = {
            (!user)
              ? <LoginForm handleLogin = {handleLogin}/>
              : <UserMenu user={user} setUser={setUser} notify={notify}/>
          }/>
          <Route path='/blogs/:id' element= {
            <Blog
              blog={selectedBlog}
              setBlogs = {setBlogs}
              notify={notify}
              user={user}/>
          }/>
          <Route path='/' element={

            <BlogList
              blogs={blogs}/>
          }/>
          <Route path='/create' element={
            // <Toggalable buttonLabel= 'Create Blog' ref={createBlogRef}>
            <BlogForm createBlog={createBlog}/>
            // </Toggalable>
          }/>

        </Routes>
      </main>
    </Container>
  )
}

export default App