import React, {useState} from 'react'
const Blog = ({blog}) => {
  const [detailMode, setDetailMode] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 5,
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
    <div>
    {blog.title} {blog.author}
    {!detailMode && <button onClick={() => showDetail()} style={btn}>View</button>}
    {detailMode && <button onClick={() => hideDetail()}  style={btn}>Hide</button>}
    {detailMode && <div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes} <button style={btn}>Like</button></div>
      <div>{blog.user.name}</div>
    </div>}
    </div>
  </div>  
)}

export default Blog