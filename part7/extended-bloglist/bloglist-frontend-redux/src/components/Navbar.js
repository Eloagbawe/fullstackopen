import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = ({ loggedInUser, logout }) => {
  const navbarStyle = {
    padding: 10,
    backgroundColor: '#D3D3D3',
    cursor: 'pointer'
  }
  return (
    <div style={navbarStyle}>
      <span style={{ marginRight: 15 }}><Link to="/">blogs</Link></span>
      <span style={{ marginRight: 15 }}><Link to="/users">users</Link></span>
      <span style={{ marginRight: 15 }}>{loggedInUser} logged in</span>
      <button onClick={(e) => logout(e)}>logout</button>
    </div>
  )
}

export default Navbar