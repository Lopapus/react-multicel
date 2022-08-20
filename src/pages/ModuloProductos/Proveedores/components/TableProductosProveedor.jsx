import React, { useContext } from 'react'
import ButtonIcon from '../../../../components/ButtonIcon'
import { Card } from 'react-bootstrap'
import ProductoItem from './ProductoItem'
import DataTable from '../../../../components/DataTable'

import ProveedorContext from '../contexts/ProveedorContex'

const TableProductosProveedor = () => {
  const { proveedor, modal } = useContext(ProveedorContext)
  const setShow = modal[1]

  return (
    <Card className='animate__animated animate__fadeIn'>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <h5 className='m-0'>Productos</h5>
        <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-box'} handler={() => setShow(true)}>Agregar</ButtonIcon>
      </Card.Header>
      <Card.Body>
        <DataTable list={proveedor.productos} tableClass="table-hover" component={ProductoItem} header={['producto', 'stock', 'entrada', 'nuevo stock']} />
      </Card.Body>
      <Card.Footer className='d-flex justify-content-end'>
        <ButtonIcon btncolor={'btn-secondary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-cart-flatbed'} >Reponer Stock</ButtonIcon>
      </Card.Footer>
    </Card>
  )
}

export default TableProductosProveedor
