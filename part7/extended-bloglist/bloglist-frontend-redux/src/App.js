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

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { message, propertyName } = useSelector(state => state.notification)

  const user = useSelector(state => state.auth)


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
      loginForm()
    )
  }

  return (
    <div>
      <Notification message={message} propertyName={propertyName} />
      <div>
        <Navbar loggedInUser={user.name} logout={handleLogout}/>
        <h2>blog app</h2>
      </div>
      <Routes>
        <Route path="/" element={<Blogs/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/users/:id" element={<User/>} />
        <Route path="/blogs/:id" element={<BlogDetail/>} />
      </Routes>
    </div>
  )
}

export default App
