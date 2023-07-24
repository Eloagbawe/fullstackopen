import React from 'react'
import userService from '../services/users'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = () => {
  const result = useQuery('users', userService.getUsers, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const users = result.data

  if (!users) {
    return null
  }

  return (
    <div style={{ width: '50%' }}>
      <Table hover>
        <thead>
          <tr>
            <th className="p-3">Users</th>
            <th className="p-3">Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td className="p-3">
                <Link className="blogLinkStyle" to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td className="p-3">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
