import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ loggedInUser, logout }) => {
  const linkStyle = {
    backgroundColor: '#d3d3d3',
    padding: 10
  }
  return (
    <div style={linkStyle}>
      <Link to="/" style={{ marginRight: '1rem' }}>blogs</Link>
      <Link to="/users" style={{ marginRight: '1rem' }}>users</Link>
      <span style={{ marginRight: '1rem' }}>{loggedInUser} logged in</span>
      <button type="submit" onClick={(e) => logout(e)}>logout</button>
    </div>
  )
}

export default NavBar