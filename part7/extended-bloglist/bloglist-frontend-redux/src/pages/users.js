import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Users</h2>
      <table>
        <thead>
          <tr style={{ fontWeight: 'bold' }}>
            <td style={{ paddingRight: 20 }}>Names</td>
            <td>Blogs Created</td>
          </tr>
        </thead>
        <tbody>
          {users &&
          users.map((user, key) => (
            <tr key={key}>
              <td style={{ paddingRight: 20 }}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
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
