import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import authContext from '../store/authContext'
import blogService from '../services/blogs'

const BlogDetail = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const id = useParams().id
  const [user] = useContext(authContext)

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
    }
  })

  const addLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    addLikeMutation.mutate({ id: blog.id, newObject: updatedBlog })
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
      navigate('/')
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
    <div>
      <h4>{blog.title}</h4>
      <p>{blog.url}</p>
      <p>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
      </p>
      <button onClick={() => addLike(blog)}>like</button>
      <p>added by {blog.author}</p>
      {user.id === blog.user.id && (
        <button onClick={() => deleteBlog(blog)}>Remove Blog</button>
      )}
      <h4>comments</h4>
      <form onSubmit={addComment}>
        <input name="comment" type="text"/>
        <button type="submit">Add comment</button>
      </form>
      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, key) => (
            <li key={key}>{comment.text}</li>
          ))}
        </ul>
      ):<p>No comments yet</p>}
    </div>
  )
}

export default BlogDetail
