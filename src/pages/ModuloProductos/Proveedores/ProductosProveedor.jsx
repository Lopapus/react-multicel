import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchToken from '../../../hooks/fetch-multicel/useFetchToken'
import Server from '../../../services/Server'
import Loader from '../../../components/Loader'
import ModalProveedor from './components/ModalProveedor'
import CardProveedor from './layouts/CardProveedor'
import TableProductosProveedor from './components/TableProductosProveedor'
import ProveedorContext from './contexts/ProveedorContex'
import { useQuery } from 'react-query'

const ProductosProveedor = () => {
  const [showModal, setShowModal] = useState(false)
  const params = useParams()
  const fetchToken = useFetchToken()

  const handleGetProveedor = async () => {
    try {
      const response = await fetchToken(`${Server}/proveedores/${params.id}?productos=1`)
      return response.syncJson()
    } catch (error) {
      console.log(error)
    }
  }

  const { data, refetch } = useQuery([`productos-proveedor-${params.id}`], handleGetProveedor, { refetchOnWindowFocus: false })

  useEffect(() => {
    showModal === false && refetch()
  }, [showModal])

  return (
    data?.nombre
      ? <div>
          <CardProveedor data={data} />
          <ProveedorContext.Provider value={{ proveedor: data, modal: [showModal, setShowModal] }}>
            <ModalProveedor />
            <TableProductosProveedor />
          </ProveedorContext.Provider>
        </div>
      : <Loader />

  )
}

export default ProductosProveedor
