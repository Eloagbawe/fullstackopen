import React, { useState, useEffect } from 'react'
import './index.css'
import Notification from './components/notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logoutUser, loginUser } from './reducers/authReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './pages/users'
import Blogs from './pages/blogs'
import User from './pages/user'
import BlogDetail from './pages/blog'
import Navbar from './components/Navbar'
import { Container } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { message, propertyName } = useSelector((state) => state.notification)

  const user = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      dispatch(
        setNotification('Please provide a username and password', 'error', 5)
      )
      return
    }
    try {
      const user = await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Welcome ${user.username}`, 'success', 5))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  const loginForm = () => (
    <Togglable buttonLabel="Log in to the blog app" buttonWidth="15rem">
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
      <div style={{ margin: '1rem 0' }}>
        <Notification message={message} propertyName={propertyName} />
        <div style={{ width: '100%', textAlign: 'center', margin: '3rem 0' }}>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <Container>
      <div>
        <Notification message={message} propertyName={propertyName} />
        <div>
          <Navbar loggedInUser={user.name} logout={handleLogout} />
        </div>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
