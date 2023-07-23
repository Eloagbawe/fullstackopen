import React, { useState, useEffect } from 'react'
import './index.css'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useContext } from 'react'
import Blogs from './pages/blogs'
import Users from './pages/users'
import User from './pages/user'
import BlogDetail from './pages/blog'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'

import notificationContext from './store/notificationContext'
import authContext from './store/authContext'

const App = () => {
  const [notification, notificationDispatch] = useContext(notificationContext)
  const [user, userDispatch] = useContext(authContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { message, propertyName } = notification

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET USER',
        payload: user
      })
      blogService.setToken(user.token)
    }
  }, [])

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
      blogService.setToken(user.token)
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

  if (user === null) {
    return (
      <div>
        <Notification message={message} propertyName={propertyName} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Notification message={message} propertyName={propertyName} />
      <NavBar loggedInUser={user.name} logout={handleLogout}/>
      <h1>Blog App</h1>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>

    </div>
  )
}

export default App
