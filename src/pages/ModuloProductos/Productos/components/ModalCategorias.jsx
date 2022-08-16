import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalCategorias = ({ show, handleShow, items }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        Nueva categoría
      </Modal.Header>
      <Modal.Body>
        a
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <button className='btn btn-primary' onClick={() => handleShow(false)}>Cerrar</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCategorias
