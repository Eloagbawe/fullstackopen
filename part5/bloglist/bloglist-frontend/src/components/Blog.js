import React, { useState } from 'react'
const Blog = ({ blog, addLike, deleteBlog }) => {
  const [detailMode, setDetailMode] = useState(false)
  let user
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const btn = {
    marginLeft: 10
  }

  const showDetail = () => {
    setDetailMode(true)
  }

  const hideDetail = () => {
    setDetailMode(false)
  }
  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author}
        {!detailMode && <button onClick={() => showDetail()} style={btn}>View</button>}
        {detailMode && <button onClick={() => hideDetail()}  style={btn}>Hide</button>}
        {detailMode && <div>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>likes {blog.likes} <button onClick={() => addLike(blog)} style={btn}>Like</button></div>
          <div>{blog.user.name}</div>
          {user.id === blog.user.id && <button onClick={() => deleteBlog(blog)} style={btn}>Remove Blog</button>}
        </div>}
      </div>
    </div>
  )}

export default Blog