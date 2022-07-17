import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Server from '../../../services/Server'
import DataList from '../../../components/DataList'
import ButtonIcon from '../../../components/ButtonIcon'
import CardComponent from '../../../layouts/Card/CardComponent'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import ProveedorItem from './components/ProveedorItem'
import useDeleteProveedor from './hooks/useDeleteProveedor'
import ProovedorContext from './contexts/ProovedorContext'

const Proveedores = () => {
  const [message, setMessage] = useState(null)
  const [proveedores, setProovedores] = useState([])
  const { data, isLoading, isError } = useQuery(['proovedores'], handleGetProveedores)
  const deleteProveedor = useDeleteProveedor()

  const navigate = useNavigate()
  const fetchToken = useFetchToken()

  const handleDelete = async (data) => {
    const deleted = await deleteProveedor(data)
    if (deleted) {
      const new_proveedores = proveedores.filter(proovedor => proovedor.id !== data.id)
      setProovedores(new_proveedores)
    }
  }

  async function handleGetProveedores () {
    const url = `${Server}/proveedores`
    const response = await fetchToken(url)
    if (response.ok) {
      const json = response.syncJson()
      if (json?.length <= 0) {
        setMessage(
          <div className="alert alert-info text-center" role="alert">
            No hay proveedores
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
    setProovedores(data)
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
      <CardComponent title="Proveedores">
        {
          isLoading
            ? <Loader />
            : proveedores?.length > 0
              ? <ProovedorContext.Provider value={handleDelete}>
                  <DataList list={proveedores} component={ProveedorItem} filter={['nombre', 'cuit']} keyname={'proveedor'} />
                </ProovedorContext.Provider>
              : message
        }
      </CardComponent>
    </>
  )
}

export default Proveedores
