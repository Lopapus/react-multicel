import React from 'react'
import { Collapse } from 'react-bootstrap'

const AlertCollapse = ({ message, show, type = 'danger' }) => {
  return (
    <Collapse in={show}>
      <div className={`alert mt-1 p-1 alert-${type} text-center`} role="alert">{message}</div>
    </Collapse>
  )
}

export default AlertCollapse
