import React, { useEffect, useState } from 'react'
import Server from '../../../services/Server'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate, useParams } from 'react-router-dom'

const VerProducto = () => {
  const [message, setMessage] = useState(null)
  const [productos, setProductos] = useState([])
  const { data, isLoading, isError } = useQuery(['productos'], handleGetProductos)
  const { id } = useParams()

  const fetchToken = useFetchToken()
  const navigate = useNavigate()

  async function handleGetProductos () {
    const url = `${Server}/productos/${id}`
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
      <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-plus'} handler={() => navigate('crear')}>
        Agregar
      </ButtonIcon>
      <CardComponent title="Productos">
        {
          isLoading
            ? <Loader />
            : productos?.length > 0
              ? <form>
                { productos[0].modelo } <br />
                { productos[0].precio } <br />
                { productos[0].facturado } <br />
                { productos[0].observaciones } <br />
                { productos[0].stock } <br />
                { productos[0].stock_min }
              </form>
              : message
        }
      </CardComponent>
    </>
  )
}

export default VerProducto
