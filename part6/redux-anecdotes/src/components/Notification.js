
import React from 'react'
import { useSelector } from 'react-redux'
import { clear } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification !== '') {
    setTimeout(() => {
      dispatch(clear())
    }, 5000)

    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return (<div />)
  }
}

export default Notification