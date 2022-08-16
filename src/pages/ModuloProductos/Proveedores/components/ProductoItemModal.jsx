import React from 'react'
import ButtonIcon from '../../../../components/ButtonIcon'

const ProductoItem = ({ data }) => {
  return (
    <li className="list-group-item list-group-item-action px-2 border-bottom">
      <div className='d-flex justify-content-between'>
        <div>{data.label}</div>
        <div>
          <ButtonIcon
            btncolor={ data?.aggregate ? 'btn-outline-primary' : 'btn-outline-danger'}
            btnsize={'btn-sm'}
            iconclass={`fa-solid ${data?.aggregate ? 'fa-box' : 'fa-box-open'}`}
          >
            { data?.aggregate ? 'Agregar' : 'Quitar'}
          </ButtonIcon>
        </div>
      </div>
    </li>
  )
}

export default ProductoItem
