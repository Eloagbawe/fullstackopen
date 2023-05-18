import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


import Blog from './Blog'

test('renders content', async() => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'react-testing-library',
    url: 'https://google.com',
    likes: 0,
    user: {
      id: '12',
      name: 'react-testing',
    }
  }

  const { container } =  render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // screen.debug()

  const element = screen.getByText('Component testing is done with react-testing-library react-testing-library')
  const element2 = screen.getByText('View')
  const element3 = screen.queryByText('https://google.com')
  const element4 = screen.queryByText('likes 0')

  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).not.toBeInTheDocument()
  expect(element4).not.toBeInTheDocument()
  // expect(element4).toBeInTheDocument()



  const button = screen.getByText('View')
  await userEvent.click(button)


  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')
  expect(url).not.toHaveStyle('display: none')
  expect(likes).not.toHaveStyle('display: none')
})
