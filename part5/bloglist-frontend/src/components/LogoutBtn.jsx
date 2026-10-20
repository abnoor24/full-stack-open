import { Button } from '@mui/material'

const LogoutBtn = ({ setUser, notify, style = null }) => {
  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    notify( 'Logout Successful' )
  }
  return <Button color='inherit' onClick={logout} sx={style}>Logout</Button>
}

export default LogoutBtn