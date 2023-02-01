import React, { useContext } from 'react'

import ActionsContext from '../../../../contexts/ActionsContext'

// import ButtonIcon from '../../../../components/ButtonIcon'

const ProductoItem = ({ data }) => {
  const { update } = useContext(ActionsContext)

  const changeNewStock = (e) => {
    const value = Math.abs(parseInt(e.target.value)) || 0
    update(data.id, value)
  }

  return (
    data &&
    <tr>
      <td>{`${data?.categoria} ${data?.subcategoria} ${data?.marca} ${data?.modelo}`}</td>
      <td>{data.stock}</td>
      <td><input value={data.entrada === 0 ? '' : data.entrada} type="number" className="form-control text-center" style={{ width: '100px' }} onChange={changeNewStock} /></td>
      <td className='text-success'>{data.stock + data.entrada}</td>
    </tr>
  )
}

export default ProductoItem
