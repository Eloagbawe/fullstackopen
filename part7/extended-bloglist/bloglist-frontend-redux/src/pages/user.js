import React from 'react'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)

  const user = users ? users.find(user => user.id === id) : null

  if (!user) {
    return null
  }
  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added Blogs</h4>
      <ul>
        { user && user.blogs.map((blog, key) => (
          <li key={key}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User