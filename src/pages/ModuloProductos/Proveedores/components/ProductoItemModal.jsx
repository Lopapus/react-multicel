import React, { useContext, useState } from 'react'
import ButtonIcon from '../../../../components/ButtonIcon'
import { useFetchToken } from '../../../../hooks/fetch-multicel'
import ProveedorContext from '../contexts/ProveedorContex'
import Server from '../../../../services/Server'
import ActionsContext from '../../../../contexts/ActionsContext'

const ProductoItemModal = ({ data }) => {
  const { proveedor } = useContext(ProveedorContext)
  const { stack, setStack } = useContext(ActionsContext)
  const [loading, setLoading] = useState(false)
  const fetchToken = useFetchToken()

  const handleUpdateToStack = (completed) => {
    const { id, text } = data
    const findStack = stack.findIndex(element => element.id === data.id)
    console.log(findStack)
    if (findStack !== -1) {
      const prevStack = [...stack]
      prevStack[findStack] = { id, text, completed }
      setStack(prevStack)
    } else {
      setStack(stack => [...stack, { id, text, completed }])
    }
  }

  const handleChange = async () => {
    try {
      setLoading(true)
      handleUpdateToStack(false)
      const endpoint = !data.aggregate ? 'addproducto' : 'removeproducto'

      const content = {
        method: 'POST',
        body: JSON.stringify({ proveedor: proveedor.id, producto: data.id })
      }

      const response = await fetchToken(`${Server}/proveedores/${endpoint}`, content)
      if (response.ok) {
        data.aggregate = !data.aggregate
      }
      handleUpdateToStack(true)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <li className="list-group-item list-group-item-action px-2 border-bottom">
      <div className='d-flex justify-content-between'>
        <div>{data.text}</div>
        <div>
          {
            !loading
              ? <ButtonIcon
                handler={handleChange}
                btncolor={ data?.aggregate ? 'btn-outline-danger' : 'btn-outline-primary'}
                btnsize={'btn-sm'}
                iconclass={`fa-solid ${data?.aggregate ? 'fa-box-open' : 'fa-box'}`}
              >
                { data?.aggregate ? 'Quitar' : 'Agregar'}
              </ButtonIcon>
              : <label>Cargando...</label>
          }

        </div>
      </div>
    </li>
  )
}

export default ProductoItemModal
