import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import notificationContext from './store/notificationContext'
import authContext from './store/authContext'

const App = () => {
  const queryClient = useQueryClient()

  const [notification, notificationDispatch] = useContext(notificationContext)
  const [user, userDispatch] = useContext(authContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const { message, propertyName } = notification

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET USER',
        payload: user
      })
      blogService.setToken(user)
    }
  }, [])
  const result = useQuery('blogs', blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const blogs = result.data
    ? result.data.sort(function (a, b) {
      return b.likes - a.likes
    })
    : []

  const addBlogMutation = useMutation(blogService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs')
      notificationDispatch({
        type: 'DISPLAY MESSAGE',
        payload: {
          message: `a new blog ${data.title} by ${data.author} added`,
          propertyName: 'success',
        },
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR MESSAGE',
        })
      }, 5000)
    },
  })

  const addLikeMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      userDispatch({
        type: 'SET USER',
        payload: user
      })
      blogService.setToken(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'DISPLAY MESSAGE',
        payload: {
          message: 'wrong username or password',
          propertyName: 'fail',
        },
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR MESSAGE',
        })
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({
      type: 'REMOVE USER'
    })
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    addBlogMutation.mutate(blogObject)
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

  const addLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    addLikeMutation.mutate({ id: blog.id, newObject: updatedBlog })
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError && result.error.response.status === 500) {
    return <div>blog service not available due to problems in server</div>
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
            {blogs &&
              blogs.map((blog) => (
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
