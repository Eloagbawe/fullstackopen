import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    <div style={{ width: '30%' }}>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="my-4">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Label>Author: </Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>

        <Form.Group className="my-4">
          <Form.Label>Url: </Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>

        <Button
          style={{
            backgroundColor: '#213363',
            outline: 'none',
            border: 'none',
          }}
          className="mb-4 px-4"
          type="submit"
          id="create"
        >
          create
        </Button>
      </Form>
    </div>
  )
}
export default BlogForm
