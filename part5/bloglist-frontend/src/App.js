import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const STORAGE_KEY = 'loggedBlogAppUser'

  const showNotification = (message, isError) => {
    if (isError === true) {
      setErrorMessage(message)
    } else {
      setNotificationMessage(message)
    }
    setTimeout(() => {
      setErrorMessage(null)
      setNotificationMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        STORAGE_KEY, JSON.stringify(user)
      )
    } catch (exception) {
      showNotification('Wrong credentials', true)
    }
  }


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notificationMessage === null ? errorMessage : notificationMessage} isError={errorMessage !== null} />
      <form onSubmit={handleLogin}>
        <div>
          username
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
        <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showNotification(`Added '${returnedBlog.title}'`, false)
      }).catch(error => {
        console.log(error)
        showNotification(error.message, true)
      })
  }

  const addBlog = () => (
    <form onSubmit={handleAddBlog}>
      <div>
        title: <input
          type="text"
          value={blogTitle}
          name="Title"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author: <input
          type="text"
          value={blogAuthor}
          name="Author"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url: <input
          type="text"
          value={blogUrl}
          name="Url"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <br />
      <Notification message={notificationMessage === null ? errorMessage : notificationMessage} isError={errorMessage !== null} />
      <div>
        <label>{user.name} logged in</label>
        <button onClick={handleLogout}>logout</button>
      </div>
      {addBlog()}
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App