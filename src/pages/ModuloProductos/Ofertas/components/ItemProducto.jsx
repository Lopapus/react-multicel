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
    <tr>
      <td >{label || ''}</td>
      <td className='d-flex flex-row align-items-center'>
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
      </td>
      <td className='align-middle'>
        {precio_real}
      </td>
      <td className='text-success align-middle'>
        {precio}
      </td>
    </tr>
  )
}

export default ItemProducto
