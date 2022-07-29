import React, { useEffect, useState } from 'react'
import Server from '../../../services/Server'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'
import ActionDeleteContext from '../../../contexts/ActionDeleteContext'
import DataList from '../../../components/DataList'
import useDeleteModelo from './hooks/useDeleteModelo'
import ModeloItem from './components/ModeloItem'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const Modelos = () => {
  const [message, setMessage] = useState(null)
  const [modelos, setModelos] = useState([])
  const { data, isLoading, isError } = useQuery(['modelos'], handleGetModelos)

  const fetchToken = useFetchToken()
  const deleteModelo = useDeleteModelo()
  const navigate = useNavigate()

  const handleDelete = async (data) => {
    const deleted = await deleteModelo(data)
    if (deleted) {
      const new_modelos = modelos.filter(modelo => modelo.id !== data.id)
      setModelos(new_modelos)
    }
  }

  async function handleGetModelos () {
    const url = `${Server}/modelos`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      if (json?.length <= 0) {
        setMessage(
          <div className="alert alert-info text-center" role="alert">
            No hay modelos
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
    setModelos(data)
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
      <CardComponent title="Modelos">
        {
          isLoading
            ? <Loader />
            : modelos?.length > 0
              ? <ActionDeleteContext.Provider value={handleDelete}>
                  <DataList list={modelos} component={ModeloItem} filter={['nombre']} keyname={'modelo'} />
                </ActionDeleteContext.Provider>
              : message
        }
      </CardComponent>
    </>
  )
}

export default Modelos
