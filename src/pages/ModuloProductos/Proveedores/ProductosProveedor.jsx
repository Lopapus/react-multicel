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
import ProductoTableFormatter from './formatter/ProductoTableFormatter'

const ProductosProveedor = () => {
  const [showModal, setShowModal] = useState(false)
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const fetchToken = useFetchToken()

  const { data, refetch, isFetching } = useQuery([`productos-proveedor-${params.id}`], handleGetProveedor, { refetchOnWindowFocus: false })

  async function handleGetProveedor () {
    try {
      const response = await fetchToken(`${Server}/proveedores/${params.id}?productos=1`)
      return response.syncJson()
    } catch (error) {
      console.log(error)
    }
  }

  const handleListProductos = () => {
    const { productos: dataProductos } = data
    const list = dataProductos.map(producto => ProductoTableFormatter(producto))
    const update = list.map(
      producto => {
        const find = productos.find(prod => prod.id === producto.id)
        if (find) {
          producto.entrada = find.entrada
        }
        return producto
      }
    )
    setProductos(update)
  }

  const handleUpdateStock = async () => {
    const updates = productos.filter(producto => producto.entrada > 0).map(({ id, entrada }) => ({ id, entrada }))
    if (updates.length > 0) {
      const content = {
        method: 'PUT',
        body: JSON.stringify({ productos: updates })
      }
      setLoading(true)
      const response = await fetchToken(`${Server}/productos/proveedor`, content)
      setLoading(false)
      if (response.ok) {
        refetch()
        handleClearInput()
      }
    }
  }

  const handleUpdateEntrada = (id, entrada) => {
    const update_productos = [...productos]
    const index = update_productos.findIndex(producto => producto.id === id)
    if (index !== -1) {
      update_productos[index].entrada = entrada
      setProductos(update_productos)
    }
  }

  const handleClearInput = () => {
    const cleared = productos.map(producto => {
      producto.entrada = 0
      return producto
    })
    setProductos(cleared)
  }

  const provider = {
    proveedor: data,
    modal: [showModal, setShowModal],
    productos,
    loading,
    updateStock: handleUpdateStock,
    reloadProductos: refetch,
    updateProducto: handleUpdateEntrada
  }

  useEffect(() => data && handleListProductos(), [data])

  return (
    data?.nombre
      ? <div>
          <CardProveedor data={data} />
          <ProveedorContext.Provider value={provider}>
            <ModalProveedor />
            {
              !isFetching
                ? <TableProductosProveedor />
                : <h4 className='text-center'>Comprobando actualizaciones...</h4>
            }
          </ProveedorContext.Provider>
        </div>
      : <Loader />

  )
}

export default ProductosProveedor
