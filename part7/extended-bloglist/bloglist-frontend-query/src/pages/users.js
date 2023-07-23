/* eslint-disable no-unused-vars */
import React from 'react'
import userService from '../services/users'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

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
    <div>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
