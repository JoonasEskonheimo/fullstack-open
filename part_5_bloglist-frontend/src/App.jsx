import { useState, useEffect } from 'react'
import Blogs from './components/blog/Blogs'
import BlogForm from './components/blog/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/login/LoginForm'
import loginService from './services/loginService'
import Togglable from './components/wrapper/Togglable'

const App = () => {
  const DEFAUT_NOTIFICATION_VALUE = ''

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successNotificationMessage, setNewSuccessNotificationMessage] = useState(DEFAUT_NOTIFICATION_VALUE)
  const [failureNotificationMessage, setNewFailureNotificationMessage] = useState(DEFAUT_NOTIFICATION_VALUE)

  const nofitications = { failureMessage: failureNotificationMessage, setFailureMessage: setNewFailureNotificationMessage, successMessage: successNotificationMessage, setSuccessMessage: setNewSuccessNotificationMessage }

  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //  setBlogs( blogs )
    //)  
  }, [])


  useEffect(() => {
    if (successNotificationMessage !== DEFAUT_NOTIFICATION_VALUE) {
      setTimeout(() => setNewSuccessNotificationMessage(DEFAUT_NOTIFICATION_VALUE), 3000)
    }
  }, [successNotificationMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const loginHandler = (event) => {
    event.preventDefault()
    const user = loginService.login({ username: username, password: password })
    setUser(user)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )
    console.log('login')
    setNewSuccessNotificationMessage(`${username} successfully logged in!`)
  }

  const showBlogs = () => {
    return (
      <div>
        <Blogs user={user} notifications={nofitications} />
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    location.reload()
  }
  const showLoginForm = () => {
    return (
      <div>
        <LoginForm notifications={nofitications} loginHandler={loginHandler} setPassword={setPassword} setUsername={setUsername} />
      </div>
    )
  }

  return (

    <div>
      {user === null ? showLoginForm() : showBlogs()}
      <button onClick={logout}>logout</button>
    </div>

  )
}

export default App