import React from 'react'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

const User = () => {
  const queryClient = useQueryClient()
  const id = useParams().id

  const result = queryClient.getQueryData('users')

  const user = result ? result.find((user) => user.id === id) : null

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog, key) => (
          <li key={key}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
