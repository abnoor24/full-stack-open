import { Alert } from '@mui/material'

export default function Notification({ notification }){
  if(!notification)
    return null

  return <Alert severity={notification.type} sx={{ margin: '10px 0' }}>{notification.message}</Alert>
}