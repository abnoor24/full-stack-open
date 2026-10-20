import { Typography, Button, TextField } from '@mui/material'

const LoginForm = (props) => {
  return <form action={props.handleLogin}className="form">
    <Typography variant="h4" component="h4" sx={{ margin: '20px 0', fontWeight: 500 }}>
      Log in to application:
    </Typography>

    <TextField
      id="username-input"
      variant="standard"
      label="Username:"
      type="text"
      name="username"
      sx={{ display: 'block', mb: 2 }}
    />

    <TextField
      id="password-input"
      variant="standard"
      label="Password:"
      type= 'password'
      name= 'password'
      sx={{ display: 'block', mb: 2 }}
    />
    <Button variant='contained' type="submit">Login</Button>
  </form>
}

export default LoginForm



// value={props.username}
// onChange={({target})=> props.setUsername(target.value)} // target is inside event: event.target.value