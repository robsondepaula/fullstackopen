import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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
  const addBlogFormRef = useRef()

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
    async function fetchData() {
      const returnedBlogs = await blogService.getAll()
      setBlogs(returnedBlogs)
    }
    fetchData()
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
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
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

    addBlogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification(`Added '${returnedBlog.title}'`, false)
    } catch (error) {
      showNotification(error.message, true)
    }
  }

  const handleLike = async (blog) => {

    const blogObject = {
      id: blog.id,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }

    try {
      const returnedBlog = await blogService.update(blogObject)

      const newBlogs = [...blogs]
      const foundIndex = newBlogs.findIndex(item => item.id === returnedBlog.id)
      newBlogs[foundIndex] = returnedBlog

      setBlogs(newBlogs)

      showNotification(`Updated '${returnedBlog.title}'`, false)
    } catch (error) {
      showNotification(error.message, true)
    }
  }

  const handleRemove = async (blog) => {

    try {
      const blogTitle = blog.title
      const blogId = blog.id

      if (window.confirm(`Remove blog '${blogTitle}' ?`)) {
        await blogService.remove(blogId)

        const newBlogs = blogs.filter((item) => item.id !== blogId)
        setBlogs(newBlogs)

        showNotification(`Removed '${blogTitle}'`, false)
      }
    } catch (error) {
      showNotification(error.message, true)
    }
  }

  const blogForm = () => {
    blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
    return (
      <div>
        <h2>blogs</h2>
        <br />
        <Notification message={notificationMessage === null ? errorMessage : notificationMessage} isError={errorMessage !== null} />
        <div>
          <label>{user.name} logged in</label>
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLabel='create new blog' ref={addBlogFormRef}>
          <AddBlogForm
            blogAuthor={blogAuthor}
            blogTitle={blogTitle}
            blogUrl={blogUrl}
            handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
            handleTitleChange={({ target }) => setBlogTitle(target.value)}
            handleUrlChange={({ target }) => setBlogUrl(target.value)}
            handleAddBlog={handleAddBlog}
          />
        </Togglable>
        <br />
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog)}
            userName={user.username}
            handleRemove={() => handleRemove(blog)} />
        )}
      </div>
    )
  }

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