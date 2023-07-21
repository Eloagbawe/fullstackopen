import React from 'react'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    paddingBottom: 5,
    marginBottom: 5,
    cursor: 'pointer',
    fontSize: '1rem',
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        <Link className="blogLinkStyle" to={`/blogs/${blog.id}`}>
          {blog.title}{' '}
          <span style={{ fontWeight: 'bold' }}> by {blog.author}</span>
        </Link>
      </div>
    </div>
  )
}

export default Blog
