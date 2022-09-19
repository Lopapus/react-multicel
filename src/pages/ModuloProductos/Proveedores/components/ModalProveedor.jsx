import React, { useContext, useState, useEffect } from 'react'
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
  const { proveedor, modal, reloadProductos } = useContext(ProveedorContext)
  const [show, setShow] = modal
  const [disabled, setDisabled] = useState(false)
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

  const handleVerifyStack = () => {
    const verify = itemStack.filter(stack => stack.completed === false)
    console.log(verify)
    return verify.length > 0
  }

  const handleHideModal = () => {
    console.log(itemStack)
    itemStack.length > 0 && reloadProductos()
    setItemStack([])
    setShow(false)
  }

  const { data, isLoading, isError } = useQuery(['productos'], handleGetProductos)

  useEffect(() => {
    console.log('modificando')
    setDisabled(handleVerifyStack())
  }, [itemStack])

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
        <button disabled={ disabled } className='btn btn-primary' onClick={() => !disabled && handleHideModal()}>Volver</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalProveedor
