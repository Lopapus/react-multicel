import React, { useEffect, useState } from 'react'
import Server from '../../../services/Server'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'
import ActionDeleteContext from '../../../contexts/ActionDeleteContext'
import DataList from '../../../components/DataList'
import useDeleteProducto from './hooks/useDeleteProducto'
import ProductoItem from './components/ProductoItem'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const Productos = () => {
  const [message, setMessage] = useState(null)
  const [productos, setProductos] = useState([])
  const { data, isLoading, isError } = useQuery(['productos'], handleGetProductos)
  const [check, setCheck] = useState(false)
  const [stock, setStock] = useState([])

  const fetchToken = useFetchToken()
  const deleteProducto = useDeleteProducto()
  const navigate = useNavigate()

  const handleDelete = async (data) => {
    const deleted = await deleteProducto(data)
    if (deleted) {
      const new_productos = productos.filter(producto => producto.id !== data.id)
      setProductos(new_productos)
    }
  }

  async function handleGetProductos () {
    const url = `${Server}/productos`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()

      const producto = json.map((producto) => {
        producto.categoria = producto.categoria.nombre
        producto.subcategoria = producto.subcategoria.nombre
        producto.marca = producto.marca.nombre
        return producto
      })

      if (json?.length <= 0) {
        setMessage(
          <div className="alert alert-info text-center" role="alert">
            No hay productos
          </div>
        )
      }
      return producto
    } else {
      setMessage(
          <div className="alert alert-danger text-center" role="alert">
            {response.syncJson().message}
          </div>
      )
    }
  }

  useEffect(() => {
    if (productos.length > 0) {
      setStock(productos.filter(
        (element) => element.stock <= element.stock_min
      ))
      stock.length === 0 &&
      setMessage('No hay productos con stock bajo')
    }
  }, [productos])

  useEffect(() => {
    if (data) {
      setProductos(data)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      setMessage(
        <h5>
          Ocurrió un error, por favor vuelva a intentarlo más tarde, si el error persiste comuniquese con un administrador
        </h5>
      )
    }
  }, [isError])
  return (
    <>
      <div className='input-group justify-content-between'>
        <ButtonIcon
          btncolor={'btn-primary'}
          btnsize={'btn-sm'}
          iconclass={'fa-solid fa-plus'}
          handler={() => navigate('crear')}
        >
          Agregar
        </ButtonIcon>
        <div className='form-group'>
          <input
            className='form-check-input mx-2 border border-primary'
            type="checkbox"
            value={check}
            onClick={() => setCheck((prev) => !prev)}
          />
          <label>Filtrar por stock bajo</label>
        </div>
      </div>

      <CardComponent title={check ? 'Productos con stock bajo' : 'Todos los productos'}>
        {
          isLoading
            ? <Loader />
            : (check ? stock : productos).length > 0
                ? <ActionDeleteContext.Provider value={handleDelete}>
                    <DataList
                      list={check ? stock : productos}
                      component={ProductoItem}
                      filter={['categoria', 'subcategoria', 'marca', 'modelo']}
                      keyname={'productos'}
                    />
                  </ActionDeleteContext.Provider>
                : message
          }
      </CardComponent>
    </>
  )
}

export default Productos
