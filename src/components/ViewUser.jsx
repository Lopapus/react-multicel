import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionProvider'

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
      const peticion = await fetch(`http://localhost:4000/usuarios/${params.id}`, request)
      const res = await peticion.json()
      console.log(res)
      setDatosUser(res)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(datosUser)
  useEffect(() => {
    handleFetch()
  }, [])
  return (
    <>
      <div className="card border-0 shadow mt-3">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">Datos del usuario</h2>
        </div>
        <h1>{datosUser.nombre}</h1>
        {/*
          datosUser.length > 0 &&
          datosUser.map(
            (item, key) => (
              <div key={`user-${key}`} className='form-group'>
                <h3>{item.usuario}</h3>
                <h3>{item.nombre}</h3>
              </div>
            )) */
        }
      </div>
    </>
  )
}

export default viewUser
