import React from 'react'
import { Modal } from 'react-bootstrap'
import DataList from '../../../../components/DataList'
import ProductoItemModal from './ProductoItemModal'

const ModalProveedor = ({ show, handleShow, items }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        Agregar Productos
      </Modal.Header>
      <Modal.Body>
        <DataList list={items} component={ProductoItemModal} filter={['label']}/>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <button className='btn btn-primary' onClick={() => handleShow(false)}>Volver</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalProveedor
