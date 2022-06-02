import React, { useEffect, useState } from 'react'
import Loader from '../../../components/Loader'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import CardComponent from '../../../layouts/Card/CardComponent'
import Server from '../../../services/Server'
import ProveedorItem from './components/ProveedorItem'

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([])
  const [message, setMessage] = useState(null)
  const fetchToken = useFetchToken()

  const handleFetchProveedores = async () => {
    setMessage(<Loader />)
    try {
      const url = `${Server}/proveedores`
      const response = await fetchToken(url)
      if (response.ok) {
        const json = response.syncJson()
        if (json.length <= 0) {
          setMessage(
            <div className="alert alert-info text-center" role="alert">
              No hay proveedores
            </div>
          )
        }
        setProveedores(json)
      } else {
        setMessage(
          <div className="alert alert-danger text-center" role="alert">
            {response.syncJson().message}
          </div>
        )
      }
    } catch (error) {
      setMessage(<h5>Ocurrió un error, por favor vuelva a intentarlo más tarde, si el error persiste comuniquese con un administrador</h5>)
    }
  }

  useEffect(handleFetchProveedores, [])

  return (
    <CardComponent title="Proveedores">
      {
        proveedores.length > 0
          ? < ul className="list-group list-group-flush list my--3" >
            {
              proveedores.map(
                (proveedor, key) =>
                  <ProveedorItem key={`proveedor-n${key + 1}`} data={proveedor} />
              )
            }
          </ul >
          : message
      }
    </CardComponent>
  )
}

export default Proveedores
