import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../contexts/SessionProvider'
import { useParams, Link } from 'react-router-dom'
import Message from '../components/message'
import { useSetForm } from '../hooks'

const EditUser = () => {
  const [stateDatos, setStateDatos] = useState({})
  const form = useState({})[0]
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
      const peticion = await fetch(`http://localhost:4000/usuarios/user/${params.id}`, request)
      const res = await peticion.json()
      setStateDatos(res)
    } catch (error) {
      console.log(error)
    }
  }

  /* const handleChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  } */
  // console.log(url, method)
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': session.token
      },
      method: 'PATCH',
      body: JSON.stringify({ ...form, id: stateDatos[0].id })
    }
    try {
      const response = await fetch(`http://localhost:4000/usuarios/${params.id}`, request)
      const json = await response.json()
      // console.log(json)
      if (response.ok) {
        setShowAlert(<Message message= {'Usuario agregado correctamente'} className='alert p-1 alert-success' />)
        dispatch({ type: 'update' })
      } else {
        setShowAlert(<Message message= {json.msg || json} className='alert p-1 alert-danger' />)
      }
    } catch (error) {
      // setShowAlert({ message: 'Error', style: 'col-2 alert alert-danger' })
      setShowAlert(<Message message= 'Error' className='col-2 alert alert-danger' />)
    }
  }
  useEffect(() => {
    handleFetch()
  }, [])
  useEffect(
    () => {
      // console.log(form)
    }, [forms]
  )
  return (
    <>
      {
        stateDatos.length > 0 &&
        stateDatos.map(
          (item, key) => (
          <div key={'user-' + key} className="card border-0 shadow mt-3">
            <div className="card-header border-bottom d-flex align-items-center justify-content-between">
              <h2 className="fs-5 fw-bold mb-0">Usuario</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitForm}>
                <div className='form-group'>
                  <label>Nombre</label>
                  <input type="text" name="nombre" id="nombre" defaultValue={item.nombre} className='form-control' onChange={setForms} required></input>
                </div>
                <div className='form-group'>
                  <label>Nombre de usuario</label>
                  <input type="text" name="usuario" id="usuario" defaultValue={item.usuario} className='form-control' onChange={setForms} required></input>
                </div>
                <div className='form-group'>
                  <Link to={'../'}>
                    <button className='btn btn-secondary mx-2'>Cancelar</button>
                  </Link>
                  <button className='btn btn-primary mx-2'>Guardar</button>
                </div>
                {showAlert}
              </form>
            </div>
          </div>
          ))
      }
    </>
  )
}

export default EditUser
