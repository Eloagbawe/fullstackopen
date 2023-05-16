import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  // const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await userEvent.type(inputs[0], 'My new Blog...')
  await userEvent.type(inputs[1], 'Jane Doe')
  await userEvent.type(inputs[2], 'www.example.com')
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('My new Blog...')
  expect(createBlog.mock.calls[0][0].author).toBe('Jane Doe')
  expect(createBlog.mock.calls[0][0].url).toBe('www.example.com')
})
