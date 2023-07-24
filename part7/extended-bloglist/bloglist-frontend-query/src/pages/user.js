import React from 'react'
import { useQueryClient } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const User = () => {
  const queryClient = useQueryClient()
  const id = useParams().id

  const result = queryClient.getQueryData('users')

  const user = result ? result.find((user) => user.id === id) : null

  if (!user) {
    return null
  }
  return (
    <div style={{ width: '40%' }}>
      <h2 className="mb-5">{user.name}</h2>
      <h4 className="my-4">Added Blogs</h4>
      <ListGroup as="ol" numbered variant="flush">
        {user.blogs.map((blog, key) => (
          <ListGroup.Item as="li" key={key}>
            <Link className="blogLinkStyle" to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
