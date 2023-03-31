import React, { useContext } from 'react'
import OfertasModalContext from '../contexts/OfertasModalContext'
import InputRegex from '../../../../components/InputRegex'

const ItemProducto = ({ data }) => {
  const { position, descuento, precio, precio_real, label } = data
  // const [, setDescuent] = useState(descuento)
  const { updateDescuento } = useContext(OfertasModalContext)

  const handleUpdateDescuento = (e) => {
    const value = parseInt(e.target.value)
    isNaN(value) && updateDescuento(position, 0)
    if (value >= 0 && value <= 100) {
      updateDescuento(position, value)
    }
  }

  return (
    data &&
    <div className='list-group-item list-group-item-action d-flex flex-row gap-3'>
      <span className='flex-grow-1 d-flex align-items-center'>{label || ''}</span>
      <div className='row'>
        <span className='col-6 d-flex flex-row align-items-center justify-content-start'>
          <span>%</span>
          <InputRegex
            type="text"
            value={descuento}
            className="form-control text-center"
            onChange={handleUpdateDescuento}
            regex={/^(?:[0-9])*$/gm}
            style={{ width: '100px' }}
            required
          />
        </span>
        <span className='col-6 text-success d-flex justify-content-center align-items-center'>
          {precio_real} / {precio}
        </span>
      </div>
    </div>
  )
}

export default ItemProducto
