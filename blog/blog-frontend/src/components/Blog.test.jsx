import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom' // Ensure this is imported for style matches if needed
import Blog from './Blog'

test('shows URL and likes when the view button is clicked', async () => {
  const blog = {
    title: 'Testing React Apps with Vitest',
    author: 'Test Author',
    url: 'https://react-testing.com',
    likes: 42,
    user: { name: 'Anton' },
  }

  const user = userEvent.setup()
  render(<Blog blog={blog} />)

  // 1. Find and click the "view" button
  const button = screen.getByText('view')
  await user.click(button)

  // 2. Find the wrapper div for the details and check that it's visible
  const detailedView = screen
    .getByText('https://react-testing.com')
    .closest('div')
  expect(detailedView).not.toHaveStyle('display: none')
})
