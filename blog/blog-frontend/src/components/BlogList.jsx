import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = ({ blogs, notificationMessage, notificationType }) => {
  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />

      <h2>Blogs</h2>
      <ul>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList
