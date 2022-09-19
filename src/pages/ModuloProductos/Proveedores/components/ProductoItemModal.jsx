import React, { useContext, useEffect, useState } from 'react'
import ButtonIcon from '../../../../components/ButtonIcon'
import ActionsContext from '../../../../contexts/ActionsContext'

const ProductoItemModal = ({ data }) => {
  const { productos, setProductos } = useContext(ActionsContext)
  const [datos, setDatos] = useState(data)

  const handleUpdateAggregate = (aggregate) => {
    const update = aggregate !== datos.prev_aggregate
    const newData = { ...data, aggregate, update }
    setDatos(newData)
  }

  useEffect(() => {
    const prevProductos = productos.filter(producto => producto.id !== data.id)
    setProductos([...prevProductos, datos])
  }, [datos])

  return (
    <li className="list-group-item list-group-item-action px-2 border-bottom">
      <div className='d-flex justify-content-between'>
        <div>{datos.text}</div>
        <div>
          {
              <ButtonIcon
                handler={() => handleUpdateAggregate(!datos.aggregate)}
                btncolor={ datos?.aggregate ? 'btn-outline-danger' : 'btn-outline-primary'}
                btnsize={'btn-sm'}
                iconclass={`fa-solid ${datos?.aggregate ? 'fa-box-open' : 'fa-box'}`}
              >
                { datos?.aggregate ? 'Quitar' : 'Agregar'}
              </ButtonIcon>
          }

        </div>
      </div>
    </li>
  )
}

export default ProductoItemModal
