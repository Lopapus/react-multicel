import React, { useContext } from 'react'
import OfertasModalContext from '../contexts/OfertasModalContext'

const ItemModalProducto = ({ data }) => {
  const { checkProducto } = useContext(OfertasModalContext)

  const handleCheckItem = () => checkProducto(data.position)

  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" checked={data.checked} id={`checkbox-${data.uid}`} onChange={handleCheckItem} />
      <label className="form-check-label" htmlFor={`checkbox-${data.uid}`}>
        {data.label}
      </label>
    </div>
  )
}

export default ItemModalProducto
