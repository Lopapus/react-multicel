import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalSubcategorias = ({ show, handleShow }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        Nueva subcategoría
      </Modal.Header>
      <Modal.Body>
        Form
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <button className='btn btn-primary' onClick={() => handleShow(false)}>Cerrar</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalSubcategorias
