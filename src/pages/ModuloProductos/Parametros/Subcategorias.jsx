import React, { useEffect, useState } from 'react'
import Server from '../../../services/Server'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import { useQuery } from 'react-query'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'
import ActionDeleteContext from '../../../contexts/ActionDeleteContext'
import DataList from '../../../components/DataList'
import useDeleteCategoria from './hooks/useDeleteCategoria'
import SubcategoriaItem from './components/SubcategoriaItem'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const Subcategorias = () => {
  const [message, setMessage] = useState(null)
  const [subcategorias, setSubcategorias] = useState([])
  const { data, isLoading, isError } = useQuery(['subcategorias'], handleGetSubcategorias)

  const fetchToken = useFetchToken()
  const deleteCategoria = useDeleteCategoria()
  const navigate = useNavigate()

  const handleDelete = async (data) => {
    const deleted = await deleteCategoria(data)
    if (deleted) {
      const new_subcategorias = subcategorias.filter(subcategoria => subcategoria.id !== data.id)
      setSubcategorias(new_subcategorias)
    }
  }

  async function handleGetSubcategorias () {
    const url = `${Server}/subcategorias`
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
    setSubcategorias(data)
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
            : subcategorias?.length > 0
              ? <ActionDeleteContext.Provider value={handleDelete}>
                  <DataList list={subcategorias} component={SubcategoriaItem} filter={['nombre']} keyname={'subcategoria'} />
                </ActionDeleteContext.Provider>
              : message
        }
      </CardComponent>
    </>
  )
}

export default Subcategorias
