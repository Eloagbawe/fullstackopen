import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
          >
            <TextField
              label="Title"
              style={{ width: '40%', margin: '1.5rem 0' }}
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Box>
        </div>
        <div>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
          >
            <TextField
              label="Author"
              style={{ width: '40%', margin: '1.5rem 0' }}
              type="text"
              value={author}
              name="author"
              id="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Box>
        </div>

        <div>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
          >
            <TextField
              label="Url"
              style={{ width: '40%', margin: '1.5rem 0' }}
              type="text"
              value={url}
              name="url"
              id="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Box>
        </div>

        <Button
          variant="contained"
          style={{ width: '10rem', margin: '1rem 0', textTransform: 'none' }}
          type="submit"
          id="create"
        >
          Create Blog
        </Button>
      </form>
    </div>
  )
}
export default BlogForm
