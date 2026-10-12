import { useState, useImperativeHandle } from 'react'

export default function Toggalable(props){

  const [visible, setVisible] = useState(false)


  const toggleVisibility = () => {
    return setVisible(prev => !prev)
  }

  useImperativeHandle(props.ref, () => {
    return{ toggleVisibility }
  })

  return <div>
    {visible && <div>
      <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    </div>}
    {(!visible) && <div>
      {props.children}
      <button onClick={toggleVisibility}>Cancel</button>
    </div>}
  </div>
}