import React, { useContext, useEffect } from 'react'
import Server from '../../../../services/Server'
import DataList from '../../../../components/DataList'
import formatProducto from '../helpers/formatProducto'
import ItemModalProducto from './ItemModalProducto'
import { Modal } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useFetchToken } from '../../../../hooks/fetch-multicel'
import OfertasModalContext from '../contexts/OfertasModalContext'

const ModalProductos = () => {
  const { productos, setProductos, modal } = useContext(OfertasModalContext)
  const { show, setShow } = modal
  const fetchToken = useFetchToken()

  const handleGetProductos = async () => {
    const url = `${Server}/productos`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      const productos = json.map(
        (producto, position) => formatProducto(producto, position)
      )
      return productos
    }
  }

  const { data, isLoading, isError } = useQuery(['modal-productos'], handleGetProductos, { refetchOnWindowFocus: false })

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
          !isLoading && !isError && productos &&
          <DataList list={productos} component={ItemModalProducto} filter={['label']} keyname='productos-modal' />
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
