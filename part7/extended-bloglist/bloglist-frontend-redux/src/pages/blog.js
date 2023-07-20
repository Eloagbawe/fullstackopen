import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { updateBlogLikes, removeBlog, addBlogComment } from '../reducers/blogReducer'


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

  const addComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    if (!comment) {
      return
    }
    const updatedComments = blog.comments.concat({ text: comment })
    const updatedBlog = { ...blog, comments: updatedComments }
    dispatch(addBlogComment(updatedBlog, comment))
    e.target.comment.value = ''
  }

  if (!blog){
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
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
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input name="comment" type="text" style={{ marginRight: 5 }}/>
        <button type="submit">Add Comment</button>
      </form>
      {blog.comments.length > 0 ?
        (<ul>
          {blog.comments.map((comment, key) => (
            <li key={key}>{comment.text}</li>
          ))}
        </ul>) : <p>No comments yet</p>
      }
    </div>
  )
}

export default BlogDetail
