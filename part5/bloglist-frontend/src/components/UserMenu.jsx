import LogoutBtn from './LogoutBtn'

export default function UserMenu({ user,setUser,notify }){

  return <div className="user-menu">
    <h4>User: "{user.name}" is logged in</h4>
    <LogoutBtn setUser={setUser} notify={notify}/>
  </div>
}