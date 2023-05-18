import React, { useEffect, useState } from 'react'
import Server from '../../../services/Server'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'
import ActionDeleteContext from '../../../contexts/ActionDeleteContext'
import DataList from '../../../components/DataList'
import useDeleteOferta from './hooks/useDeleteOferta'
import OfertaItem from './components/OfertaItem'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const Ofertas = () => {
  const [message, setMessage] = useState(null)
  const [ofertas, setOfertas] = useState([])
  const { data, isLoading, isError } = useQuery(['ofertas'], handleGetOfertas)

  const fetchToken = useFetchToken()
  const deleteOferta = useDeleteOferta()
  const navigate = useNavigate()

  const handleDelete = async (data) => {
    const deleted = await deleteOferta(data)
    if (deleted) {
      const new_ofertas = ofertas.filter(oferta => oferta.id !== data.id)
      setOfertas(new_ofertas)
    }
  }

  async function handleGetOfertas () {
    const url = `${Server}/tipos_ofertas`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      if (json?.length <= 0) {
        setMessage(
          <div className="alert alert-info text-center" role="alert">
            No hay ofertas
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
    setOfertas(data)
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
      <CardComponent title="Ofertas">
        {
          isLoading
            ? <Loader />
            : ofertas?.length > 0
              ? <ActionDeleteContext.Provider value={handleDelete}>
                  <DataList list={ofertas} component={OfertaItem} filter={['nombre']} keyname={'ofertas'} />
                </ActionDeleteContext.Provider>
              : message
        }
      </CardComponent>
    </>
  )
}

export default Ofertas
