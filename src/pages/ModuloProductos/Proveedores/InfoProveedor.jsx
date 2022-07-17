import React, { useState, useEffect } from 'react'
import Server from '../../../services/Server'
import { useLocation, Link, useParams } from 'react-router-dom'
import parseCuit from '../../../helpers/parseCuit'
import useFetchToken from '../../../hooks/fetch-multicel/useFetchToken'
import CardComponent from '../../../layouts/Card/CardComponent'
import Loader from '../../../components/Loader'

const InfoProveedor = () => {
  const location = useLocation()
  const params = useParams()

  const [data, setData] = useState({})
  const fetchToken = useFetchToken()

  const handleGetProveedor = async () => {
    try {
      const response = await fetchToken(`${Server}/proveedores/${params.id}`)
      const res_data = response.syncJson()
      setData(res_data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (location?.state) {
      setData(location.state)
    }
    handleGetProveedor()
  }, [])

  return (
    <CardComponent title={data?.nombre ? (`Información de "${data.nombre}"`) : 'Espere un momento...'}>
      {
        data?.id
          ? <div className='form-group'>
              {/* <h4>Nombre: {data.nombre}</h4> */}
              <h6>Cuit: { parseCuit(data?.cuit)}</h6>
              <h6>Telefono: {data?.telefono}</h6>
              <h6>Correo: {data?.correo}</h6>
              <h6>
                {
                  data?.inscripto
                    ? <span className='text-success'>Inscripto</span>
                    : <span className='text-danger'>No inscripto</span>
                }
              </h6>
            </div>
          : <Loader/>
      }
      <div className='form-group'>
        <Link to={'../'}>
          <button className='btn btn-warning mt-2'>Volver</button>
        </Link>
      </div>
    </CardComponent>
  )
}

export default InfoProveedor
