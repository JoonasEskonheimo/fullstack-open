import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test("createNewBlog handler is called correctly with the form content", async () => {
    const user = userEvent.setup()
    const mockHandler = jest.fn()
    render(<BlogForm notifications={jest.fn()} createNewBlog={mockHandler} />)
    screen.debug()
    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')

    await user.type(titleInput, 'title1')
    await user.type(authorInput, 'author1')
    await user.type(urlInput, 'url1')

    const submitButton = screen.getByText('create')
    await user.click(submitButton)
    expect(mockHandler.mock.calls).toHaveLength(1)

    const blog = mockHandler.mock.lastCall[0]
    expect(blog.title).toBe('title1')
    expect(blog.author).toBe('author1')
    expect(blog.url).toBe('url1')
})
