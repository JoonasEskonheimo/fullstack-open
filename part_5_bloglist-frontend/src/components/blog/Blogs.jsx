import { useState } from 'react'
import Blog from './Blog'
import Togglable from '../wrapper/Togglable'
import BlogForm from './BlogForm'

const Blogs = ({ user, notifications }) => {

  const [blogs, setBlogs] = useState([])

  const addLikesHandler = (id) => {
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === id) {
        return { ...blog, likes: blog.likes + 1 };
      } else {
        return blog;
      }
    })
    setBlogs(updatedBlogs);
  }

  const deleteBlogHandler = (id) => {
    const deleteConfirmed = window.confirm("Are you sure to delete?")
    if (deleteConfirmed) {
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlogs);
    }
  }

  const blogHandler = {
    addLikesHandler: addLikesHandler,
    deleteBlogHandler: deleteBlogHandler
  }

  const createNewBlog = (newBlog) => {
    setBlogs([...blogs, newBlog])
    notifications.setSuccessMessage(`new blog ${newBlog.title} added by ${newBlog.author}`)
  }

  const sortByLikes = (a, b) => {
    if (a.likes === b.likes) {
      return 0
    }
    return a.likes > b.likes ? -1 : 1
  }

  return (

    <div>
      <Togglable buttonLabel={'create blog'}>
        <BlogForm notifications={notifications} createNewBlog={createNewBlog} />
      </Togglable>
      <h2>blogs</h2>
      {user.username} logged in
      {blogs.sort(sortByLikes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} blogHandler={blogHandler} />
        )}
    </div>
  )
}

export default Blogs