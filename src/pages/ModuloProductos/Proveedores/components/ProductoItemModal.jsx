import React, { useContext, useState } from 'react'
import ButtonIcon from '../../../../components/ButtonIcon'
import { useFetchToken } from '../../../../hooks/fetch-multicel'
import ProveedorContext from '../contexts/ProveedorContex'
import Server from '../../../../services/Server'

const ProductoItemModal = ({ data }) => {
  const { proveedor } = useContext(ProveedorContext)
  const [loading, setLoading] = useState(false)
  const fetchToken = useFetchToken()

  const handleChange = async () => {
    try {
      setLoading(true)
      const endpoint = !data.aggregate ? 'addproducto' : 'removeproducto'

      const content = {
        method: 'POST',
        body: JSON.stringify({ proveedor: proveedor.id, producto: data.id })
      }

      const response = await fetchToken(`${Server}/proveedores/${endpoint}`, content)
      if (response.ok) {
        data.aggregate = !data.aggregate
      }
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
