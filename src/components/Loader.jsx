import React from 'react'

const Loader = () => {
  return (
    <div className="h-100">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Loader
