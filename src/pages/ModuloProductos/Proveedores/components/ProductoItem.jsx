import React, { useState } from 'react'

// import ButtonIcon from '../../../../components/ButtonIcon'

const ProductoItem = ({ data }) => {
  const [newStock, setNewStock] = useState(0)

  const changeNewStock = (e) => {
    const value = parseInt(e.target.value)
    const stock = !isNaN(value) ? data.stock + value : data.stock
    setNewStock(stock)
  }

  return (
    <tr>
      <td>{data.modelo}</td>
      <td>{data.stock}</td>
      <td><input type="number" className="form-control text-center" style={{ width: '100px' }} onChange={changeNewStock} /></td>
      <td className='text-success'>{newStock}</td>
    </tr>
    // <li className="list-group-item list-group-item-action px-2 border-bottom">
    //   <div className='d-flex justify-content-between align-items-center'>
    //     <div>{data.subcategoria.nombre + ' ' + data.marca.nombre + ' ' + data.modelo}</div>
    //     <div>
    //       <input className="form-control" type="number" name="" id="" />
    //     </div>
    //     {/* <div>
    //       <ButtonIcon
    //         btncolor={ data?.aggregate ? 'btn-outline-primary' : 'btn-outline-danger'}
    //         btnsize={'btn-sm'}
    //         iconclass={`fa-solid ${data?.aggregate ? 'fa-box' : 'fa-box-open'}`}
    //       >
    //         { data?.aggregate ? 'Agregar' : 'Quitar'}
    //       </ButtonIcon>
    //     </div> */}
    //   </div>
    // </li>
  )
}

export default ProductoItem
