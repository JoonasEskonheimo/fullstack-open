import { useState } from 'react'

import FailureNotification from "../notification/FailureNotification"
import SuccessNotification from "../notification/SuccessNotification"

const BlogForm = ({ notifications, createNewBlog }) => {
  const emptyBlog = { title: '', author: '', url: '', id: '', likes: 0 }

  const [blog, setBlog] = useState(emptyBlog)

  const createBlog = (event) => {
    event.preventDefault()
    const newBlog = { ...blog, id: Math.random().toString() }
    createNewBlog(newBlog)
    setBlog(emptyBlog)
  }

  return (
    <div>
      <h1>Create new blog</h1>
      <FailureNotification message={notifications.failureMessage} />
      <SuccessNotification message={notifications.successMessage} />
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            value={blog.title}
            type="text"
            name="Title"
            onChange={({ target }) => setBlog(prevState => ({ ...prevState, ['title']: target.value }))}
            data-testid='title-input'
          />

        </div>
        <div>
          author:
          <input
            value={blog.author}
            type="text"
            name="Author"
            onChange={({ target }) => setBlog(prevState => ({ ...prevState, ['author']: target.value }))}
            data-testid='author-input'
          />
        </div>
        <div>
          url:
          <input
            value={blog.url}
            type="text"
            name="Url"
            onChange={({ target }) => setBlog(prevState => ({ ...prevState, ['url']: target.value }))}
            data-testid='url-input'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm