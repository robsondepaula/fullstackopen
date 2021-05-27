import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
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
          <label>
            likes {blog.likes}
          </label>
          <button onClick={() => console.log('+1 like')}>like</button>
        </div>
        <div>
          {blog.user ? blog.user.name : 'unknown user'}
        </div>
      </div>
    </div>
  )
}

export default Blog