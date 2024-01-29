import FailureNotification from "../notification/FailureNotification"

const LoginForm = ({ notifications, loginHandler, setUsername, setPassword }) => (
  <div>
    <h1>Log in to application</h1>
    <FailureNotification message={notifications.failureMessage} />
    <form onSubmit={loginHandler}>
      <div>
        username
        <input
          type="text"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm