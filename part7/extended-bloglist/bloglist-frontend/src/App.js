import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs, addBlog, updateBlogLikes, removeBlog } from './reducers/blogReducer'
import { initializeUser, logoutUser, loginUser } from './reducers/authReducer'
import { createSelector } from '@reduxjs/toolkit'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const { message, propertyName } = useSelector(state => state.notification)

  const blogs = useSelector(createSelector(
    state => state.blog.blogs,
    (blogs) => {
      const blogList = [...blogs]
      return blogList.sort(function (a, b) {
        return b.likes - a.likes
      })
    }

  ))
  const user = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'fail', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  const createBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const loggedInUser = {
        id: user.id,
        name: user.name,
        username: user.username,
      }
      const returnedBlog = await dispatch(addBlog(blogObject, loggedInUser))
      dispatch(setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'success', 5))
    } catch (err) {
      console.log(err)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        username={username}
        password={password}
      />
    </Togglable>
  )

  const addLike = async(blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    try {
      await dispatch(updateBlogLikes(blog.id, updatedBlog))
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBlog = async(blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(removeBlog(blog.id))
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} propertyName={propertyName} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p> {user.name} is logged in</p>
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          {blogForm()}
          <br />
          <div>
            { blogs && blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                deleteBlog={deleteBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
