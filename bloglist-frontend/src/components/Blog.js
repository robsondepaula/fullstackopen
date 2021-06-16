import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog, handleLike, userName, handleRemove }) => {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const renderDelete = () => {
    const blogUserName = blog.user ? blog.user.username : ''
    if (userName === blogUserName) {
      return <button onClick={handleRemove}>remove</button>
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <label>
          {blog.title} {blog.author}
        </label>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          <label className='likes'>
            likes {blog.likes}
          </label>
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user ? blog.user.name : 'unknown user'}
        </div>
        <div>
          {renderDelete()}
        </div>
      </div>
    </div>
  )
}

export default Blog