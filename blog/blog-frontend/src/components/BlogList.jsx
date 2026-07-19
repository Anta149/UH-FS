import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({
  blogs,
  deleteBlogOf,
  addBlog,
  updateBlogLike,
  notificationMessage,
  notificationType,
}) => {
  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Togglable buttonLabel="New Blog">
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>

      <h2>blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={updateBlogLike}
            deleteBlogOf={deleteBlogOf}
          />
        ))}
    </div>
  )
}

export default BlogList
