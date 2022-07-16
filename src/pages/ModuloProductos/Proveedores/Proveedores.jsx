import React, { useEffect, useState } from 'react'
import Loader from '../../../components/Loader'
import { useFetchToken } from '../../../hooks/fetch-multicel'
import CardComponent from '../../../layouts/Card/CardComponent'
import Server from '../../../services/Server'
import ProveedorItem from './components/ProveedorItem'
import ButtonIcon from '../../../components/ButtonIcon'
import { useNavigate } from 'react-router-dom'
import DataList from '../../../components/DataList'
import { useQuery } from 'react-query'

const Proveedores = () => {
  // const [proveedores, setProveedores] = useState([])
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const fetchToken = useFetchToken()

  const handeGetProveedores = async () => {
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

  // const handleFetchProveedores = async () => {
  //   setMessage(<Loader />)
  //   try {
  //     const url = `${Server}/proveedores`
  //     const response = await fetchToken(url)
  //     if (response.ok) {
  //       const json = response.syncJson()
  //       if (json.length <= 0) {
  //         setMessage(
  //           <div className="alert alert-info text-center" role="alert">
  //             No hay proveedores
  //           </div>
  //         )
  //       }
  //       setProveedores(json)
  //     } else {
  //       setMessage(
  //         <div className="alert alert-danger text-center" role="alert">
  //           {response.syncJson().message}
  //         </div>
  //       )
  //     }
  //   } catch (error) {
  //     setMessage(<h5>Ocurrió un error, por favor vuelva a intentarlo más tarde, si el error persiste comuniquese con un administrador</h5>)
  //   }
  // }

  const { data: proveedores, isLoading, isError } = useQuery(['proovedores'], handeGetProveedores)

  useEffect(() => {
    if (isError) {
      setMessage(<h5>Ocurrió un error, por favor vuelva a intentarlo más tarde, si el error persiste comuniquese con un administrador</h5>)
    }
  }, [isError])

  // useEffect(handleFetchProveedores, [])

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
              ? <DataList list={proveedores} component={ProveedorItem} filter={['nombre', 'cuit']} keyname={'proveedor'} />
              : message
        }
      </CardComponent>
    </>
  )
}

export default Proveedores
