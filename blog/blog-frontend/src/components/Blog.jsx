import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  // 1. Create a local state to manage whether this specific card is expanded
  const [visible, setVisible] = useState(false)

  // 2. Add standard styling for the blog cards
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
  }

  // 3. Define the inline display rules based on our visibility state
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // 4. Toggle function to flip our state back and forth
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {/* View 1: Compact (Always visible by default, hidden when expanded) */}
      <div style={hideWhenVisible}>
        <span>
          {blog.title} - {blog.author}
        </span>
        <button onClick={toggleVisibility} style={{ marginLeft: 10 }}>
          view
        </button>
      </div>

      {/* View 2: Expanded (Hidden by default, shown when visible is true) */}
      <div style={showWhenVisible}>
        <div>
          <strong>{blog.title}</strong> - {blog.author}
          <button onClick={toggleVisibility} style={{ marginLeft: 10 }}>
            hide
          </button>
        </div>
        <div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>
        <div>
          likes {blog.likes}
          <button onClick={() => handleLike(blog)} style={{ marginLeft: 10 }}>
            like
          </button>
        </div>
        <div>Added by: {blog.user ? blog.user.name : 'Unknown User'}</div>
      </div>
    </div>
  )
}

export default Blog
