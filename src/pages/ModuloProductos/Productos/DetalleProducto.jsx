import React, { useEffect, useState } from 'react'
import Server from '../../../services/Server'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonIcon from '../../../components/ButtonIcon'
import Accordion from 'react-bootstrap/Accordion'

const DetalleProducto = () => {
  const [message, setMessage] = useState(null)
  const [productos, setProductos] = useState([])
  const { data, isLoading, isError } = useQuery(['producto'], handleGetProducto)

  const fetchToken = useFetchToken()
  const params = useParams()
  const navigate = useNavigate()

  async function handleGetProducto () {
    const url = `${Server}/productos/${params.id}`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()

      if (json?.length <= 0) {
        setMessage(
          <div className="alert alert-info text-center" role="alert">
            No hay productos
          </div>
        )
      }
      return json
    } else {
      setMessage(
          <div className="alert alert-danger text-center" role="alert">
            {response.syncJson().message}
          </div>
      )
    }
  }

  useEffect(() => {
    setProductos(data)
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
      <CardComponent title="Producto">
        {
          isLoading
            ? <Loader />
            : productos?.length > 0
              ? <div>
                  <div className='form-group'>
                      <div className="form-group">
                        <h6>Categoría: {productos[0].categoria.nombre}</h6>
                        <h6>Subcategoría: {productos[0].subcategoria.nombre}</h6>
                        <h6>Marca: {productos[0].marca.nombre}</h6>
                        <h6>Modelo: {productos[0].modelo}</h6>
                        <h6>Precio: {productos[0].precio}</h6>
                        <h6>Stock: {productos[0].stock}</h6>
                        <h6>Stock Mínimo: {productos[0].stock_min}</h6>
                        <h6>imei: {productos[0]?.imei || '-'}</h6>
                        <div className="form-group">
                          <h6>Observaciones:</h6>
                          <h6>{productos[0]?.observaciones || '-'}</h6>
                        </div>
                      </div>
                  </div>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Proveedores</Accordion.Header>
                      <Accordion.Body>
                        {
                          productos[0].proveedores > 0
                            ? productos[0].map(
                              (item, key) =>
                              <li key={key}>{item.nombre}</li>
                            )
                            : <li>No ha sido asignado a ningún proveedor</li>
                        }
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <div className="form-group form-group my-3 d-flex justify-content-sm-start">
                    <ButtonIcon type="button" btncolor='btn-secondary me-1' iconclass={'fas fa-arrow-left'} handler={() => navigate('/productos')} >
                      Volver
                    </ButtonIcon>
                  </div>
                </div>
              : message
        }
      </CardComponent>
    </>
  )
}

export default DetalleProducto
