import React, { useContext, useState } from 'react'
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
  const { proveedor, modal } = useContext(ProveedorContext)
  const [show, setShow] = modal
  const [itemStack, setItemStack] = useState([])
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
          <ActionsContext.Provider value={{ stack: itemStack, setStack: setItemStack }}>
            <DataList list={data} component={ProductoItemModal} filter={['text']}/>
          </ActionsContext.Provider>
        }
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <button disabled={ itemStack.length > 0 } className='btn btn-primary' onClick={() => itemStack.length === 0 && setShow(false)}>Volver</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalProveedor
