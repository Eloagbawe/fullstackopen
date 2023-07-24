import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div>
      <div className="blog">
        <Link className="blogLinkStyle" to={`/blogs/${blog.id}`}>
          {blog.title}{' '}
          <span style={{ fontWeight: 'bold' }}>by {blog.author}</span>
        </Link>
      </div>
    </div>
  )
}

export default Blog
