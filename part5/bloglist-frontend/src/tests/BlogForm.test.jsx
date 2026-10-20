import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'



test('BlogForm sends the correct information', async () => {
  const mockHandler = vi.fn()

  render(<BlogForm createBlog={mockHandler}/>)
  const user = userEvent.setup()

  const titleInput = screen.getByTestId('title-input')
  const authorInput = screen.getByTestId('author-input')
  const urlInput = screen.getByTestId('url-input')
  const submitBtn = screen.getByText('Create')

  await user.type(titleInput,'My little pony')
  await user.type(authorInput,'Fire and Ash')
  await user.type(urlInput,'wwwwwwwww')

  await user.click(submitBtn)

  expect(mockHandler).toHaveBeenCalled()

  const formData = mockHandler.mock.calls[0][0]

  expect(Object.fromEntries(formData)).toEqual({
    title: 'My little pony',
    author: 'Fire and Ash',
    url: 'wwwwwwwww'
  })
})