import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateBlogLikes, removeBlog } from '../reducers/blogReducer'


const BlogDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blogs } = useSelector(state => state.blog)
  const loggedInUser = useSelector((state) => state.auth)

  const id = useParams().id

  const blog = blogs ? blogs.find(blog => blog.id === id) : null

  const addLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await dispatch(updateBlogLikes(blog.id, updatedBlog))
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(removeBlog(blog.id))
        navigate('/')
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (!blog){
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} {blog.likes === 1 ?  'like': 'likes'}</p>
      <button onClick={() => addLike(blog)}>Like</button>
      <p>added by {blog.author}</p>
      {loggedInUser.id === blog.user.id && (
        <button
          onClick={() => deleteBlog(blog)}
        >
          Remove Blog
        </button>
      )}
    </div>
  )
}

export default BlogDetail
