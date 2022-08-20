import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import DataList from '../../../../components/DataList'
import ProveedorContext from '../contexts/ProveedorContex'
import ProductoItemModal from './ProductoItemModal'
import Server from '../../../../services/Server'
import { useFetchToken } from '../../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import ProductoModalFormatter from '../formatter/ProductoModalFormatter'

const ModalProveedor = () => {
  const { proveedor, modal } = useContext(ProveedorContext)
  const [show, setShow] = modal
  const fetchToken = useFetchToken()

  const handleGetProductos = async () => {
    const url = `${Server}/productos`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      // console.log(json)
      const productos = json.map(
        producto => ProductoModalFormatter(proveedor, producto)
      )
      return productos
    }
  }

  const { data, isLoading, isError } = useQuery(['productos'], handleGetProductos)

  return (
    <Modal show={show}>
      <Modal.Header>
        Agregar Productos
      </Modal.Header>
      <Modal.Body>
        {
          !isLoading && !isError &&
          <DataList list={data} component={ProductoItemModal} filter={['text']}/>
        }
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <button className='btn btn-primary' onClick={() => setShow(false)}>Volver</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalProveedor
