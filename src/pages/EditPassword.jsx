import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../contexts/SessionProvider'
import { useParams, Link } from 'react-router-dom'
import Message from '../components/message'
import { useSetForm } from '../hooks'
import host from '../host'

const EditPassword = () => {
  const [stateDatos, setStateDatos] = useState({})
  const [showAlert, setShowAlert] = useState(null)
  const [forms, setForms] = useSetForm()

  const [session, dispatch] = useContext(SessionContext)

  const params = useParams()
  const handleFetch = async () => {
    try {
      const request = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': session.token
        },
        method: 'GET'
      }
      const peticion = await fetch(`${host}/usuarios/user/${params.id}`, request)
      const res = await peticion.json()
      setStateDatos(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': session.token
      },
      method: 'PUT',
      body: JSON.stringify({ ...forms, id: stateDatos[0].id })
    }
    try {
      const response = await fetch(`${host}/usuarios/password`, request)
      const json = await response.json()
      if (response.ok) {
        setShowAlert(<Message message= {'Se ha editado correctamente'} className='alert p-1 alert-success' />)
        dispatch({ type: 'update', payload: { ...forms } })
      } else {
        setShowAlert(<Message message= {json.msg || json} className='alert p-1 alert-danger' />)
      }
    } catch (error) {
      setShowAlert(<Message message= 'Error' className='col-2 alert alert-danger' />)
    }
  }
  useEffect(() => {
    handleFetch()
  }, [])
  useEffect(
    () => {
      console.log(forms)
    }, [forms]
  )
  return (
    <>
      <div className="card border-0 shadow mt-3">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">CAMBIAR CONTRASEÑA</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitForm}>
            <div className='form-group mb-2'>
              <label>Contraseña actual o clave maestra</label>
              <input type='password' name='old_password' className='form-control' onChange={setForms} required></input>
            </div>
            <div className='form-group mb-2'>
              <label>Nueva contraseña</label>
              <input type='password' name='password' className='form-control' onChange={setForms} required></input>
            </div>
            <div className='form-group mb-2'>
              <label>Confirmar nueva contraseña</label>
              <input type='password' name='passwordC' className='form-control' required></input>
            </div>
            <div className='form-group mx-2 mb-2'>
              <Link to='../'>
                <button className='btn btn-warning'>Volver</button>
              </Link>
              <button className='btn btn-primary mx-2'>Guardar</button>
            </div>
            {showAlert}
          </form>
        </div>
      </div>
    </>
  )
}

export default EditPassword
