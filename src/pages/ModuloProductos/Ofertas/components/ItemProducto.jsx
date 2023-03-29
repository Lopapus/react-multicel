import React from 'react'

const ItemProducto = ({ data }) => {
  const { descuento } = data
  const nuevoPrecio = (data?.precio || 0) - (((data?.precio || 0) * descuento) / 100)
  return (
    data &&
    <div className='list-group-item list-group-item-action d-flex flex-row gap-3' onClick={() => console.log('clickeado')}>
      <span className='flex-grow-1 d-flex align-items-center'>{`${data?.categoria || ''} ${data?.subcategoria || ''} ${data?.marca || ''} ${data?.modelo || ''}`}</span>
      <span className=''><input value={descuento === 0 ? '' : descuento} type="number" className="form-control text-center" style={{ width: '100px' }} /></span>
      <span className='text-success d-flex justify-content-center align-items-center'>{nuevoPrecio}</span>
    </div>
  )
}

export default ItemProducto
