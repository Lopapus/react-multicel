import React, { useEffect, useState } from 'react'
import Server from '../../../services/Server'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'
import ActionDeleteContext from '../../../contexts/ActionDeleteContext'
import DataList from '../../../components/DataList'
import useDeleteMarca from './hooks/useDeleteMarca'
import MarcaItem from './components/MarcaItem'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const Marcas = () => {
  const [message, setMessage] = useState(null)
  const [marcas, setMarcas] = useState([])
  const { data, isLoading, isError } = useQuery(['marcas'], handleGetMarcas)

  const fetchToken = useFetchToken()
  const deleteMarca = useDeleteMarca()
  const navigate = useNavigate()

  const handleDelete = async (data) => {
    const deleted = await deleteMarca(data)
    if (deleted) {
      const new_marcas = marcas.filter(marca => marca.id !== data.id)
      setMarcas(new_marcas)
    }
  }

  async function handleGetMarcas () {
    const url = `${Server}/marcas`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      if (json?.length <= 0) {
        setMessage(
          <div className="alert alert-info text-center" role="alert">
            No hay marcas
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
    setMarcas(data)
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
      <CardComponent title="Marcas">
        {
          isLoading
            ? <Loader />
            : marcas?.length > 0
              ? <ActionDeleteContext.Provider value={handleDelete}>
                  <DataList list={marcas} component={MarcaItem} filter={['nombre']} keyname={'marcas'} />
                </ActionDeleteContext.Provider>
              : message
        }
      </CardComponent>
    </>
  )
}

export default Marcas
