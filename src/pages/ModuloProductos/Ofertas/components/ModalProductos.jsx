import React, { useEffect, useState } from 'react'
import { useFetchToken } from '../../../../hooks/fetch-multicel'
import Server from '../../../../services/Server'
import { useQuery } from 'react-query'
import { Modal } from 'react-bootstrap'
import ProductosModalContext from '../contexts/ProductosModalContext'
import DataList from '../../../../components/DataList'
import ItemModalProducto from './ItemModalProducto'
import formatProducto from '../helpers/formatProducto'

const ModalProductos = ({ show, setShow }) => {
  // eslint-disable-next-line no-unused-vars
  const [productos, setProductos] = useState([])
  const fetchToken = useFetchToken()

  const handleGetProductos = async () => {
    const url = `${Server}/productos`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      const productos = json.map(
        producto => formatProducto(producto)
      )
      return productos
    }
  }

  const { data, isLoading, isError } = useQuery(['modal-productos'], handleGetProductos)

  useEffect(() => {
    if (data) {
      setProductos(data)
    }
  }, [data])

  return (
    <Modal show={show}>
      <Modal.Header>
        Agregar Productos
      </Modal.Header>
      <Modal.Body>
        {
          !isLoading && !isError &&
          <ProductosModalContext.Provider value={{ productos, setProductos }}>
            <DataList list={productos} component={ItemModalProducto} filter={['text']} />
          </ProductosModalContext.Provider>
        }
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <button disabled={isLoading} className='btn btn-primary' onClick={() => setShow(false)}>Volver</button>
        {/* <button disabled={isLoading} className='btn btn-primary' onClick={handleSaveChanges}>{loading ? 'Guardando...' : 'Guardar'}</button> */}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalProductos
