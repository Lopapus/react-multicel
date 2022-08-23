import React, { useContext, useState, useEffect } from 'react'
import ButtonIcon from '../../../../components/ButtonIcon'
import { Card } from 'react-bootstrap'
import ProductoItem from './ProductoItem'
import DataTable from '../../../../components/DataTable'

import ProveedorContext from '../contexts/ProveedorContex'
import ProductoTableFormatter from '../formatter/ProductoTableFormatter'
import ActionsContext from '../../../../contexts/ActionsContext'
import useFetchToken from '../../../../hooks/fetch-multicel/useFetchToken'
import Server from '../../../../services/Server'

const TableProductosProveedor = () => {
  const { proveedor, modal } = useContext(ProveedorContext)
  const [listProductos, setListProductos] = useState([])
  const setShow = modal[1]
  const fetchToken = useFetchToken()

  const handleListProductos = () => {
    const { productos } = proveedor
    const list = productos.map(producto => ProductoTableFormatter(producto))
    const update = list.map(
      producto => {
        const find = listProductos.find(prod => prod.id === producto.id)
        if (find) {
          producto.entrada = find.entrada
        }
        return producto
      }
    )
    setListProductos(update)
  }

  const handleUpdateEntrada = (id, entrada) => {
    const update_productos = [...listProductos]
    const index = update_productos.findIndex(producto => producto.id === id)
    if (index !== -1) {
      update_productos[index].entrada = entrada
      setListProductos(update_productos)
    }
  }

  const handleUpdateStock = async () => {
    console.log('actualizando')
    const updates = listProductos.filter(producto => producto.entrada > 0).map(({ id, entrada }) => ({ id, entrada }))

    const content = {
      method: 'PUT',
      body: JSON.stringify({ productos: updates })
    }
    console.log('pasando')
    const response = await fetchToken(`${Server}/productos/proveedor`, content)
    if (response.ok) {
      console.log('todo good')
    } else {
      console.log('todo bad')
    }
  }

  useEffect(handleListProductos, [proveedor])
  return (
    <Card className='animate__animated animate__fadeIn'>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <h5 className='m-0'>Productos</h5>
        <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-box'} handler={() => setShow(true)}>Agregar</ButtonIcon>
      </Card.Header>
      <Card.Body>
        <ActionsContext.Provider value={{ update: handleUpdateEntrada }}>
          <DataTable list={listProductos} tableClass="table-hover" component={ProductoItem} header={['producto', 'stock', 'entrada', 'nuevo stock']} />
        </ActionsContext.Provider>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-end'>
        <ButtonIcon btncolor={'btn-secondary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-cart-flatbed'} handler={handleUpdateStock} >Reponer Stock</ButtonIcon>
      </Card.Footer>
    </Card>
  )
}

export default TableProductosProveedor
