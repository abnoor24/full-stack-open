import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import * as blogService from './services/blogs'
import loginService from './services/login'
import UserMenu from './components/UserMenu'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggalable from './components/Toggalable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null})
  const createBlogRef= useRef()

  useEffect(() => {
    //Get all the blogs from the database
    blogService.getAll().then(result =>
      setBlogs( result )
    ) 
  }, [])
  
  useEffect(() =>{
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
      const newUser = await loginService.userLogin({username,password})
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(newUser)
      )
      setUser(newUser)
      blogService.addToken(newUser.token)
      notify(`Login Successful`)
    }catch(e){
      notify(e.message,true)
      console.log(e); //Set error messages on the frontend
    }
  }

  const createBlog = async (formData) => {
    try{
      const title = formData.get('title')
      const author = formData.get('author')
      const url = formData.get('url')
      
      if([title,author,url].some(item => !item))
        return console.log('Invalid Input')
      
      const newBlog = {title, author, url}
      const result = await blogService.createBlog(newBlog)
      setBlogs(prev => [...prev, result])
      createBlogRef.current.toggleVisibility()

    notify(`A new blog '${result.title}' by ${result.author} added.`)
    
    //await blogService.createBlog(newBlog)
    }catch(e){
      if(e.message === 'invalid token')
        notify('Login Required', true)
      else
        notify(e.message,true)
      console.log(e)
    }
  }

  const notify = (message, isError = false) => {
    setNotification({message,isError})
    setTimeout(() => {
      setNotification({message: null})
    },5000)
  }

  return (
    <main>
      <Notification notification={notification}/>
      {(!user)
      ? <LoginForm handleLogin = {handleLogin}/>
      : <UserMenu user={user} setUser={setUser} notify={notify}/>
      }
      <h2>Blogs:</h2>

      <Toggalable buttonLabel= 'Create Blog' ref={createBlogRef}>
        <BlogForm createBlog={createBlog}/>
      </Toggalable>
      <BlogList 
        blogs={blogs} 
        setBlogs={setBlogs} 
        notify={notify}/>
    </main>
  )
}

export default App