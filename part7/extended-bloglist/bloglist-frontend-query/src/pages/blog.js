import React, { useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import authContext from '../store/authContext'
import blogService from '../services/blogs'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import notificationContext from '../store/notificationContext'

const BlogDetail = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const id = useParams().id
  const [user] = useContext(authContext)
  const [, notificationDispatch] = useContext(notificationContext)

  const result = useQuery('blogs', blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const blog = result.data ? result.data.find((blog) => blog.id === id) : null

  const addLikeMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const addCommentMutation = useMutation(blogService.addComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const addLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    addLikeMutation.mutate({ id: blog.id, newObject: updatedBlog })
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
      navigate('/')
      notificationDispatch({
        type: 'DISPLAY MESSAGE',
        payload: {
          message: 'Blog successfully deleted',
          propertyName: 'success',
        },
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR MESSAGE',
        })
      }, 5000)
    }
  }

  const addComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value

    if (!comment) {
      return
    }
    addCommentMutation.mutate({ id: blog.id, comment })
    e.target.comment.value = ''
  }

  if (!blog) {
    return null
  }
  return (
    <div className="mt-5">
      <Stack direction="horizontal" className="align-items-center mb-3">
        <h4 className="m-0 me-3">{blog.title}</h4>
        <span className="mt-1">By {blog.author}</span>
      </Stack>
      <span style={{ fontWeight: 'bold' }}>Blog Url: </span>
      <Link to={blog.url} className="blogLinkStyle">
        {blog.url}
      </Link>
      <p className="mt-3">
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
      </p>
      <Button
        variant="outline-primary"
        className="me-3 my-4"
        onClick={() => addLike(blog)}
      >
        Like Blog
      </Button>
      {user.id === blog.user.id && (
        <Button
          variant="danger"
          className="my-4"
          onClick={() => deleteBlog(blog)}
        >
          Remove Blog
        </Button>
      )}
      <h4 className="mt-4 mb-3">comments</h4>
      <Form onSubmit={addComment} className="my-4">
        <Form.Group
          style={{ display: 'inline-block', width: '25%' }}
          className="me-3"
        >
          <Form.Control name="comment" type="text" />
        </Form.Group>
        <Button
          style={{ backgroundColor: '#213555', border: 'none' }}
          type="submit"
        >
          Add comment
        </Button>
      </Form>
      {blog.comments.length > 0 ? (
        <ListGroup variant="flush" style={{ width: '40%' }}>
          {blog.comments.map((comment, key) => (
            <ListGroup.Item
              style={{ backgroundColor: 'transparent' }}
              className="py-4"
              key={key}
            >
              {comment.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}

export default BlogDetail
