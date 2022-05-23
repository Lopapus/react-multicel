import React, { useEffect, useState } from 'react'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import CardComponent from '../../../layouts/Card/CardComponent'
import Server from '../../../services/Server'
import ProveedorItem from './components/ProveedorItem'

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([])
  const fetchToken = useFetchToken()

  const handleFetchProveedores = async () => {
    const url = `${Server}/proveedores`
    const response = await fetchToken(url)
    const json = response.syncJson()
    setProveedores(json)
  }

  useEffect(handleFetchProveedores, [])

  return (
    <CardComponent>
      < ul className="list-group list-group-flush list my--3" >
        {
          proveedores.map(
            (proveedor, key) =>
              <ProveedorItem key={`proveedor-n${key + 1}`} data={proveedor} />
          )
        }
      </ul >
    </CardComponent>
  )
}

export default Proveedores
