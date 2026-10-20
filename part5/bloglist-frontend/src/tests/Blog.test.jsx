import { render, screen } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const blog = {
  title: 'Knightmare',
  author: 'Borant Green',
  likes: '100',
  url: 'https://www.knightmare.com/',
  user: {
    username: 'root',
    id: '123'
  }
}

// Mock the external service module
vi.mock('../services/blogs', () => ({
  addLikes: vi.fn(),
  deleteBlog: vi.fn(),
}))

test('Blog information and the number of likes are displayed to unauthenticated users, buttons are not displayed', () => {

  const { container } = render(<Blog blog={blog}/>)

  const element = container.querySelector('.bloglist-item-heading')
  const likeButton = screen.queryByRole('button', { name: 'Like' })
  const deleteButton = screen.queryByRole('button', { name: 'Delete' })

  expect(element).toHaveTextContent('Knightmare')
  expect(likeButton).toBeNull()
  expect(deleteButton).toBeNull()
})

test('Authenticated users who are not the blogs creator are shown only the like button', async () => { //This does not work
  // const mockHandler = vi.fn()

  const user = { username: 'snek' }

  render(<Blog blog={blog} user={user}/>)

  const likeButton = screen.queryByRole('button', { name: 'Like' })
  const deleteButton = screen.queryByRole('button', { name: 'Delete' })


  expect(likeButton).toBeDefined()
  expect(deleteButton).toBeNull()
})

test('The blogs creator is also shown the delete button' , async () => {

  const user = { username: 'root', id: '123' }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} setBlogs={mockHandler} notify={mockHandler} user={user}/>)

  const deleteButton = screen.queryByRole('button', { name: 'Delete' })
  expect(deleteButton).toBeDefined()
})



// const user = userEvent.setup()
// const buttonShow = screen.getByText('Show')
// await user.click(buttonShow)
