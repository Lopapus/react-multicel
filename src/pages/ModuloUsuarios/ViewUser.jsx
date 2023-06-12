import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { SessionContext } from '../../contexts/SessionProvider'
import Server from '../../services/Server'

const viewUser = () => {
  const params = useParams()
  const [datosUser, setDatosUser] = useState({})

  const session = useContext(SessionContext)[0]

  const handleFetch = async () => {
    try {
      const request = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': session.token
        },
        method: 'GET'
      }
      const peticion = await fetch(`${Server}/usuarios/user/${params.id}`, request)
      const res = await peticion.json()
      setDatosUser(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])
  return (
    <>
      {
        datosUser.length > 0
          ? datosUser.map((item, key) => (
            <div key={key} className="card border-0 shadow mt-3">
              <div className="card-header border-bottom d-flex align-items-center justify-content-between">
                <h2 className="fs-5 fw-bold mb-0">Datos del usuario</h2>
              </div>
              <div className='card-body'>
                <div className='form-group'>
                  <h6>Nombre: {item.nombre}</h6>
                  <h6>Usuario: {item.usuario}</h6>
                  <h6>Clave maestra: {item.clave_maestra}</h6>
                  <h6>Rol: {item.rol}</h6>
                </div>
                <div className='form-group'>
                  <Link to={'../'}>
                    <button className='btn btn-warning mt-2'>Volver</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
          : <Loader />
      }
    </>
  )
}

export default viewUser
