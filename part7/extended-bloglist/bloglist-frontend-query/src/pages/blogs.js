import React, { useRef, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import notificationContext from '../store/notificationContext'

const Blogs = () => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(notificationContext)
  const blogFormRef = useRef()

  const result = useQuery('blogs', blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const blogs = result.data ? result.data.sort((a, b) => b.likes - a.likes) : []

  const addBlogMutation = useMutation(blogService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs')
      notificationDispatch({
        type: 'DISPLAY MESSAGE',
        payload: {
          message: `a new blog ${data.title} by ${data.author} added`,
          propertyName: 'success',
        },
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR MESSAGE',
        })
      }, 5000)
    },
  })

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    addBlogMutation.mutate(blogObject)
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError && result.error.response.status === 500) {
    return <div>blog service not available due to problems in server</div>
  }

  return (
    <div>
      {blogForm()}
      <br />
      <div>
        {blogs && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}

export default Blogs
