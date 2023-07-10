import React, { useState, useEffect,  useRef } from 'react'
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
  const blogFormRef = useRef()





  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort(function(a, b) {return b.likes - a.likes})
      setBlogs( sortedBlogs )
    }
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

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      const loggedInUser = { id: user.id, name: user.name, username: user.username }
      const newBlog = { ...returnedBlog, user: loggedInUser }
      setBlogs(blogs.concat(newBlog))
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
    //   const blog = await blogService.create(blogObject)
    //   setBlogs(blogs.concat(blog))
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
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog}/>
    </Togglable>

  )


  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm setUsername={setUsername} setPassword={setPassword}
        handleLogin={handleLogin} username={username} password={password}/>
    </Togglable>
  )

  const addLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    blogService.update(blog.id, updatedBlog).then(() => {
      const updatedBlogs = blogs.map((item) => {
        if (item.id === blog.id) {
          item.likes += 1
        }
        return item
      })
      const sortedBlogs = updatedBlogs.sort(function(a, b) {return b.likes - a.likes})
      setBlogs( sortedBlogs )
      // setBlogs(updatedBlogs)
    }).catch((err) => {
      console.log(err)
    })
  }

  const deleteBlog = (blog) => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id).then(() => {
        const updatedBlogs = blogs.filter((item) => item.id !== blog.id)
        setBlogs(updatedBlogs)
      }).catch((err) => {
        console.log(err)
      })
    }

  }
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message = {message} propertyName = {propertyName}/>
      {user === null ? ( loginForm())
        : (
          <div>
            <h2>blogs</h2>
            <p> {user.name} is logged in</p>
            <button type="submit" onClick={handleLogout}>logout</button>
            {blogForm()}
            <br/>
            <div>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog}/>)}
            </div>
          </div>
        )}
    </div>
  )

}

export default App