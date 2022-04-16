import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [message, setMessage] = useState(null)
  const [propertyName, setPropertyName] = useState('')
  const [user, setUser] = useState(null)



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
    console.log('logging in with', username, password)

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

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`)
      setPropertyName('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch(error){
      console.log(error)
    }
    
  }

  if (user === null) {
    return (
      <div>
        <Notification message = {message} propertyName = {propertyName}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
    <Notification message = {message} propertyName = {propertyName}/>
    <h2>blogs</h2>
     <p> {user.username} is logged in</p>     
     <button type="submit" onClick={handleLogout}>logout</button>

     
     {/* <h2>create new</h2>
     <form onSubmit={createBlog}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:
            <input
            type="text"
            value={url}
            name="Title"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        
        <button type="submit">create</button>
      </form> */}
        <BlogForm createBlog={createBlog} />
      
      <br/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )

}

export default App