import React from 'react'

const Message = ({ message, className }) => {
  return (
    <p className={className}>{message}</p>
  )
}

export default Message
