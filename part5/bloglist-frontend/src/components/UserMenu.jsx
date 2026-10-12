export default function UserMenu({user,setUser,notify}){
  
  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    notify(`Logout Successful`)
  }
  return <div className="user-menu">
  <h4>User: "{user.name}" is logged in</h4>
  <button onClick={logout}>Logout</button>
  </div>
}