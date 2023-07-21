import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const User = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)

  const user = users ? users.find((user) => user.id === id) : null

  if (!user) {
    return null
  }
  return (
    <div style={{ margin: '4rem 0' }}>
      <div style={{ margin: '0 1rem' }}>
        <h3 style={{ color: '#19376D' }}>{user.name}</h3>
        <h4 style={{ marginTop: '2rem' }}>Added Blogs</h4>
      </div>
      <List>
        {user &&
          user.blogs.map((blog, key) => (
            <div key={key}>
              <ListItem>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link to={`/blogs/${blog.id}`} className="blogLinkStyle">
                    {blog.title}
                  </Link>
                </ListItemText>
              </ListItem>
            </div>
          ))}
      </List>
    </div>
  )
}

export default User
