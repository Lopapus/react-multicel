import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchToken from '../../../hooks/fetch-multicel/useFetchToken'
import Server from '../../../services/Server'
import Loader from '../../../components/Loader'
import ModalProveedor from './components/ModalProveedor'
import CardProveedor from './layouts/CardProveedor'
import TableProductosProveedor from './components/TableProductosProveedor'
import ProveedorContext from './contexts/ProveedorContex'

const ProductosProveedor = () => {
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const params = useParams()
  const fetchToken = useFetchToken()

  const handleGetProveedor = async () => {
    try {
      const response = await fetchToken(`${Server}/proveedores/${params.id}?productos=1`)
      const res_data = response.syncJson()
      setData(res_data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showModal === false && handleGetProveedor()
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
