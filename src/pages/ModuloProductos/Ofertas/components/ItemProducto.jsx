import React from 'react'

const ItemProducto = ({ data }) => {
  const { descuento } = data
  const nuevoPrecio = (data?.precio || 0) - (((data?.precio || 0) * descuento) / 100)
  return (
    data &&
    <tr>
      <td>{`${data?.categoria || ''} ${data?.subcategoria || ''} ${data?.marca || ''} ${data?.modelo || ''}`}</td>
      <td>{data.stock}</td>
      <td><input value={descuento === 0 ? '' : descuento} type="number" className="form-control text-center" style={{ width: '100px' }} /></td>
      <td className='text-success'>{nuevoPrecio}</td>
    </tr>
  )
}

export default ItemProducto
