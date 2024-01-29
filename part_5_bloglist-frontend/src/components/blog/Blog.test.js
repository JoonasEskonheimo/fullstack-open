import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test("render only author and title by default", () => {
    const blog = {
        id: "1",
        likes: 1,
        author: "joonas",
        title: "Test",
        url: "urli"
    }
    render(<Blog blog={blog} />)
    screen.debug()
    expect(screen.getByText(blog.title + ' ' + blog.author)).toBeInTheDocument();

    const additionalInformation = document.getElementsByClassName('blog-additional-information')[0];
    expect(additionalInformation).not.toBeInTheDocument
})
test("render additional information after view-button is clicked", async () => {
    const blog = {
        id: "1",
        likes: 1,
        author: "joonas",
        title: "Test",
        url: "urli"
    }
    const mockHandler = jest.fn()
    render(<Blog blog={blog} blogHandler={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(screen.getByText(blog.title + ' ' + blog.author)).toBeInTheDocument();

    const additionalInformation = document.getElementsByClassName('blog-additional-information')[0];
    screen.debug(additionalInformation)

    expect(additionalInformation).toBeInTheDocument
    const content = additionalInformation.innerHTML
    expect(content.includes("url: urli")).toBe(true)
    expect(content.includes('likes: 1')).toBe(true)
})

test("like button invokes addLikesHandler", async () => {
    const blog = {
        id: "1",
        likes: 1,
        author: "joonas",
        title: "Test",
        url: "urli"
    }

    const mockHandler = jest.fn()
    const blogHandler = {
        addLikesHandler: mockHandler
    }
    render(<Blog blog={blog} blogHandler={blogHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})


