import clsx from 'clsx'

export default function Notification({notification}){
  const {message, isError} = notification
  if(!message)
    return null

  const className = clsx('notification', isError && 'error-msg')

  return <div className= {className}>{message}</div>
}