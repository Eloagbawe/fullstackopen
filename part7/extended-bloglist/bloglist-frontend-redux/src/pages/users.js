import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Names</TableCell>
              <TableCell>No of Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user, key) => (
                <TableRow key={key}>
                  <TableCell>
                    <Link to={`/users/${user.id}`} className="blogLinkStyle">
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
