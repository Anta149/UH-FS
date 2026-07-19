import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { useNavigate, useMatch } from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  const navigate = useNavigate()

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateBlogLike = async (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
    }

    const returnedBlog = await blogService.update(blogObject.id, updatedBlog)
    setBlogs(blogs.map((b) => (b.id === blogObject.id ? returnedBlog : b)))
  }

  const deleteBlogOf = (id, title) => {
    if (window.confirm(`Delete ${title}?`)) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id))
      })
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))

      setNotificationType('success')
      setNotificationMessage(
        `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added!`,
      )

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationType('error')
      setNotificationMessage('Failed to create a new blog post')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      setNotificationMessage('Wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/')
  }

  const padding = {
    padding: 5,
  }

  return (
    <>
      <div>
        {user ? (
          <>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
        <Link style={padding} to="/blogs">
          blogs
        </Link>
      </div>

      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              //key={blog.id}
              blog={blog}
              handleLike={updateBlogLike}
              deleteBlogOf={deleteBlogOf}
            />
          }
        />
        <Route
          path="/blogs"
          element={
            <BlogList
              blogs={blogs}
              deleteBlogOf={deleteBlogOf}
              addBlog={addBlog}
              updateBlogLike={updateBlogLike}
              notificationMessage={notificationMessage}
              notificationType={notificationType}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
              notificationMessage={notificationMessage}
              notificationType={notificationType}
            />
          }
        />
      </Routes>
    </>
  )
}
export default App
