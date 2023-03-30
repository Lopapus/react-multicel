import React from 'react'

const ItemModalProducto = ({ data }) => {
  console.log(data)
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id={`checkbox-${data.modelo}`} />
      <label className="form-check-label" htmlFor={`checkbox-${data.modelo}`}>
        {data.label}
      </label>
    </div>
  )
}

export default ItemModalProducto
