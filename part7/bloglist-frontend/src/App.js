import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { createBlog, likeBlog, removeBlog, initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({
        username, password
      }))

      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong credentials', true)
    }
  }


  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch(logout())
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

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')

    addBlogFormRef.current.toggleVisibility()

    try {
      dispatch(createBlog(blogObject))
      showNotification(`Added '${blogObject.title}'`, false)
    } catch (error) {
      showNotification(error.message, true)
    }
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))

      showNotification(`Updated '${blog.title}'`, false)
    } catch (error) {
      showNotification(error.message, true)
    }
  }

  const handleRemove = async (blog) => {

    try {
      const blogTitle = blog.title
      const blogId = blog.id

      if (window.confirm(`Remove blog '${blogTitle}' ?`)) {
        dispatch(removeBlog(blogId))

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

  const Logged = () => {
    return (
      <>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </>
    )
  }

  const Users = () => {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(item =>
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.blogs.length}</td>
            </tr>
          )}
        </table>
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {user ? Logged() : loginForm()}
        </div>

        <Switch>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} />
          </Route>
          <Route path="/users">
            {user ? <Users /> : loginForm()}
          </Route>
          <Route path="/">
            {blogForm()}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App