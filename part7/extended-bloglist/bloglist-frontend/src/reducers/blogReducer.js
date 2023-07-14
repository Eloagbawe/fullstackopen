import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: []
  },
  reducers: {
    getBlogs(state, action) {
      return {
        ...state,
        blogs: action.payload
      }
    },
    createBlog(state, action) {
      const blog = action.payload.blog
      const user = action.payload.user
      return {
        ...state,
        blogs: state.blogs.concat({ ...blog, user })
      }
    },
    deleteBlog(state, action) {
      const id = action.payload
      const updatedBlogs = state.blogs.filter(blog => blog.id !== id)
      return {
        blogs: updatedBlogs
      }
    }
  }
})

export const getAllBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch(getBlogs(response))
    return response
  }
}

export const addBlog = (newBlog, user) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch(createBlog({ blog, user }))
    return blog
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const response = await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
    return response
  }
}

export const { getBlogs, createBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer