import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import DataList from '../../../../components/DataList'
import ProveedorContext from '../contexts/ProveedorContex'
import ProductoItemModal from './ProductoItemModal'
import Server from '../../../../services/Server'
import { useFetchToken } from '../../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import ProductoModalFormatter from '../formatter/ProductoModalFormatter'
import ActionsContext from '../../../../contexts/ActionsContext'

const ModalProveedor = () => {
  const { proveedor, modal, reloadProductos } = useContext(ProveedorContext) // , reloadProductos
  const [show, setShow] = modal
  const fetchToken = useFetchToken()
  const [loading, setLoading] = useState(false)
  const [productos, setProductos] = useState([])

  const handleGetProductos = async () => {
    const url = `${Server}/productos`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      const productos = json.map(
        producto => ProductoModalFormatter(proveedor, producto)
      )
      return productos
    }
  }

  const handleSaveChanges = async () => {
    const updatesProductos = productos.filter(producto => producto.update === true)

    if (updatesProductos.length > 0) {
      const url = `${Server}/proveedores/updateproductos`
      const content = {
        method: 'POST',
        body: JSON.stringify(updatesProductos)
      }
      setLoading(true)
      const response = await fetchToken(url, content)
      setLoading(false)
      if (response.ok) {
        refetch()
        reloadProductos()
        setShow(false)
      }
    }
  }

  const { data, isLoading, refetch, isError } = useQuery(['productos'], handleGetProductos)

  useEffect(() => {
    setProductos(data)
  }, [data])

  return (
    <Modal show={show}>
      <Modal.Header>
        Agregar Productos
      </Modal.Header>
      <Modal.Body>
        {
          !isLoading && !isError &&
          <ActionsContext.Provider value={{ productos, setProductos }}>
            <DataList list={data} component={ProductoItemModal} filter={['text']}/>
          </ActionsContext.Provider>
        }
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <button disabled={ loading } className='btn btn-primary' onClick={() => setShow(false)}>Volver</button>
        <button disabled={ loading } className='btn btn-primary' onClick={handleSaveChanges}>{loading ? 'Guardando...' : 'Guardar'}</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalProveedor
