import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  //const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [message, setMessage] = useState(null)
  const [propertyName, setPropertyName] = useState('')
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)




  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setPropertyName('fail')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    
  }

  const handleLogout = (event) =>{
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setPropertyName('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch((error) => {
      console.log(error)
    })
  
    //async function
    // try {
    //   const blog = await blogService.create({
    //     title,
    //     author,
    //     url
    //   })
    //   setBlogs(blogs.concat(blog))
    //   setTitle('')
    //   setAuthor('')
    //   setUrl('')
    //   setMessage(`a new blog ${title} by ${author} added`)
    //   setPropertyName('success')
    //   setTimeout(() => {
    //     setMessage(null)
    //   }, 5000)
    // }
    // catch(error){
    //   console.log(error)
    // }
    
  }

  const blogForm = () => (
     <Togglable buttonLabel="new blog">
       <BlogForm createBlog={createBlog}/>
     </Togglable>
    
    )
  

  const loginForm = () => (
      <Togglable buttonLabel="log in">
      <LoginForm setUsername={setUsername} setPassword={setPassword} 
      handleLogin={handleLogin} username={username} password={password}/>
      </Togglable>
    )
    
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message = {message} propertyName = {propertyName}/>
        {user == null ? ( loginForm())
          : (
          <div>
            <h2>blogs</h2>
            <p> {user.username} is logged in</p>     
            <button type="submit" onClick={handleLogout}>logout</button>
            {blogForm()}
            <br/>
            <div>
              {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} /> )}
            </div>
          </div>
        )}
      </div>
    )

}

export default App