
const LoginForm = (props) => {
  return <form action={props.handleLogin}className="form">
    <h2>Log in to application:</h2>

    <label>
      <span>Username:</span>
      <input
        type="text"
        name="username"
      />
    </label>

    <label>
      <span>Password:</span>
      <input
        type="password"
        name="password"
      />
    </label>

    <button>Login</button>
  </form>
}

export default LoginForm



// value={props.username}
// onChange={({target})=> props.setUsername(target.value)} // target is inside event: event.target.value