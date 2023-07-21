import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  updateBlogLikes,
  removeBlog,
  addBlogComment,
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from '@mui/material/Button'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import Stack from '@mui/material/Stack'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blogs } = useSelector((state) => state.blog)
  const loggedInUser = useSelector((state) => state.auth)

  const id = useParams().id

  const blog = blogs ? blogs.find((blog) => blog.id === id) : null

  const addLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await dispatch(updateBlogLikes(blog.id, updatedBlog))
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(removeBlog(blog.id))
        navigate('/')
        dispatch(setNotification('Blog deleted successfully', 'success', 5))
      } catch (err) {
        console.log(err)
      }
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    if (!comment) {
      return
    }
    const updatedComments = blog.comments.concat({ text: comment })
    const updatedBlog = { ...blog, comments: updatedComments }
    try {
      await dispatch(addBlogComment(updatedBlog, comment))
      await dispatch(
        setNotification('Comment added successfully', 'success', 5)
      )
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } catch (err) {
      console.log(err)
    }
    e.target.comment.value = ''
  }

  if (!blog) {
    return null
  }
  return (
    <div style={{ marginTop: '2rem' }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <h2>{blog.title}</h2>
        <p style={{ marginTop: 4.5 }}>Added by {blog.author}</p>
      </Stack>
      <span style={{ fontWeight: 'bold' }}>Blog Url: </span>
      <Link to={blog.url} className="blogLinkStyle">
        {blog.url}
      </Link>
      <Stack spacing={1} direction="row" style={{ margin: '2rem 0' }}>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        <FavoriteOutlinedIcon
          style={{ fontSize: 'medium', marginTop: 2.5, marginLeft: 2 }}
        />
      </Stack>
      <div>
        <Button
          variant="contained"
          style={{ textTransform: 'none', marginBottom: '1rem' }}
          onClick={() => addLike(blog)}
        >
          Like Blog
          <FavoriteBorderOutlinedIcon
            style={{ fontSize: 'medium', marginLeft: 2, marginTop: 1.5 }}
          />
        </Button>
      </div>
      {loggedInUser.id === blog.user.id && (
        <div>
          <Button
            variant="contained"
            style={{
              textTransform: 'none',
              marginTop: '1rem',
              backgroundColor: '#F45050',
            }}
            onClick={() => deleteBlog(blog)}
          >
            Remove Blog
            <DeleteOutlineOutlinedIcon
              style={{ fontSize: 'medium', marginTop: 2 }}
            />
          </Button>
        </div>
      )}
      <Stack spacing={1} direction="row" alignItems="center" marginTop={5}>
        <h3>Comments</h3>
        <CommentOutlinedIcon style={{ marginTop: 5 }} />
      </Stack>
      <form onSubmit={addComment}>
        <TextField
          variant="outlined"
          name="comment"
          type="text"
          style={{ marginRight: '1rem', width: '50%' }}
        />
        <Button
          variant="contained"
          style={{
            textTransform: 'none',
            marginTop: '1rem',
            backgroundColor: '#3C486B',
          }}
          type="submit"
        >
          Add Comment
        </Button>
      </form>
      {blog.comments.length > 0 ? (
        <List style={{ margin: '1rem 0' }}>
          {blog.comments.map((comment, key) => (
            <div key={key}>
              <ListItem style={{ margin: '3rem 0 1rem 0' }}>
                {comment.text}
              </ListItem>
              <Divider style={{ width: '50%' }} />
            </div>
          ))}
        </List>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}

export default BlogDetail
