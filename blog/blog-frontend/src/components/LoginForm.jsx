import Notification from './Notification'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  notificationMessage,
  notificationType,
}) => {
  const navigate = useNavigate()
  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
