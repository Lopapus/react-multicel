import React, { useEffect, useState } from 'react'
import Server from '../../../services/Server'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'
import ActionDeleteContext from '../../../contexts/ActionDeleteContext'
import DataList from '../../../components/DataList'
import useDeleteCategoria from './hooks/useDeleteCategoria'
import CategoriaItem from './components/CategoriaItem'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const Modelos = () => {
  const [message, setMessage] = useState(null)
  const [categorias, setCategorias] = useState([])
  const { data, isLoading, isError } = useQuery(['categorias'], handleGetCategorias)

  const fetchToken = useFetchToken()
  const deleteCategoria = useDeleteCategoria()
  const navigate = useNavigate()

  const handleDelete = async (data) => {
    const deleted = await deleteCategoria(data)
    if (deleted) {
      const new_categorias = categorias.filter(categoria => categoria.id !== data.id)
      setCategorias(new_categorias)
    }
  }

  async function handleGetCategorias () {
    const url = `${Server}/modelos`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      if (json?.length <= 0) {
        setMessage(
          <div className="alert alert-info text-center" role="alert">
            No hay categorias
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
    setCategorias(data)
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
      <CardComponent title="Categorias">
        {
          isLoading
            ? <Loader />
            : categorias?.length > 0
              ? <ActionDeleteContext.Provider value={handleDelete}>
                  <DataList list={categorias} component={CategoriaItem} filter={['nombre']} keyname={'categoria'} />
                </ActionDeleteContext.Provider>
              : message
        }
      </CardComponent>
    </>
  )
}

export default Modelos
