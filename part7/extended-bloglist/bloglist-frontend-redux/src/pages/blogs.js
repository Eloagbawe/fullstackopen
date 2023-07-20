import React, { useEffect, useRef } from 'react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllBlogs,
  addBlog,
} from '../reducers/blogReducer'
import { createSelector } from '@reduxjs/toolkit'


const Blogs = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const user = useSelector((state) => state.auth)
  const blogs = useSelector(
    createSelector(
      (state) => state.blog.blogs,
      (blogs) => {
        const blogList = [...blogs]
        return blogList.sort(function (a, b) {
          return b.likes - a.likes
        })
      }
    )
  )

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const loggedInUser = {
        id: user.id,
        name: user.name,
        username: user.username,
      }
      const returnedBlog = await dispatch(addBlog(blogObject, loggedInUser))
      dispatch(
        setNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          'success',
          5
        )
      )
    } catch (err) {
      console.log(err)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )


  return (
    <div>
      {blogForm()}
      <br />
      <div>
        {blogs &&
          blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
      </div>
    </div>
  )
}

export default Blogs
