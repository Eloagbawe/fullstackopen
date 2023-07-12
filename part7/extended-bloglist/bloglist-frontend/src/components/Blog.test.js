import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let addLike
  let deleteBlog
  beforeEach(() => {
    jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue(JSON.stringify({ id: '12' }))
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'react-testing-library',
      url: 'https://google.com',
      likes: 0,
      user: {
        id: '12',
        name: 'react-testing',
      },
    }

    addLike = jest.fn()
    deleteBlog = jest.fn()
    container = render(
      <Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
    ).container
  })

  test('renders appropriate content', async () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    const element = screen.getByText(
      'Component testing is done with react-testing-library react-testing-library'
    )
    const element2 = screen.getByText('View')
    const element3 = screen.queryByText('https://google.com')
    const element4 = screen.queryByText('likes 0')
    const element5 = screen.queryByText('Remove Blog')

    expect(element).toBeDefined()
    expect(element2).toBeDefined()
    expect(element3).not.toBeInTheDocument()
    expect(element4).not.toBeInTheDocument()
    expect(element5).not.toBeInTheDocument()
  })

  test('Displays url and likes when the view button is clicked', async () => {
    const button = screen.getByText('View')
    await userEvent.click(button)

    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')
    const deleteBtn = container.querySelector('.deleteBtn')

    expect(url).not.toHaveStyle('display: none')
    expect(likes).not.toHaveStyle('display: none')
    expect(deleteBtn).not.toHaveStyle('display: none')

    expect(screen.queryByText('https://google.com')).toBeInTheDocument()
    expect(screen.queryByText('likes 0')).toBeInTheDocument()
  })

  test(`ensures that the event handler the component received as props is called twice
  when the like button is clicked twice`, async () => {
    const button = screen.getByText('View')
    await userEvent.click(button)

    const likeButton = screen.getByText('Like')
    await userEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(1)

    await userEvent.click(likeButton)
    expect(addLike.mock.calls).toHaveLength(2)
  })
})
