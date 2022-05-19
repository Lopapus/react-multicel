import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../../contexts/SessionProvider'
import { useParams, Link } from 'react-router-dom'
import Message from '../../components/message'
import { useSetForm } from '../../hooks'
import Server from '../../services/Server'
import { useFetchToken } from '../../hooks/fetch-multicel'
import formEditUserSchema from '../../validations/vEditUser'
import Loader from '../../components/Loader'

const EditUser = () => {
  const [stateDatos, setStateDatos] = useState({})
  const [showAlert, setShowAlert] = useState(null)
  const [forms, setForms] = useSetForm()
  const fetchToken = useFetchToken()
  const [disableBtn, setDisableBtn] = useState(true)

  const dispatch = useContext(SessionContext)[1]

  const params = useParams()
  const handleFetch = async () => {
    try {
      const peticion = await fetchToken(`${Server}/usuarios/user/${params.id}`)
      const res = peticion.json
      setStateDatos(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const request = {
      method: 'PATCH',
      body: JSON.stringify({ ...forms, id: stateDatos[0].id })
    }
    try {
      const response = await fetchToken(`${Server}/usuarios/${params.id}`, request)
      const json = response.json
      if (response.ok) {
        setShowAlert(<Message message={'Se ha editado correctamente'} className='alert p-1 alert-success' />)
        dispatch({ type: 'update', payload: { ...forms } })
      } else {
        setShowAlert(<Message message={json.message || json} className='alert p-1 alert-danger' />)
      }
    } catch (error) {
      setShowAlert(<Message message='Error' className='col-2 alert alert-danger' />)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])
  useEffect(
    () => {
      setShowAlert(null)
    }, [forms]
  )
  useEffect(() => {
    formEditUserSchema.isValid(forms).then((esValido) => {
      setDisableBtn(!esValido)
    })
  }, [forms])
  return (
    <>
      {
        stateDatos.length > 0
          ? stateDatos.map(
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
                    <div className='form-group mb-2'>
                      <label>Nombre de usuario</label>
                      <input type="text" name="usuario" id="usuario" defaultValue={item.usuario} className='form-control' onChange={setForms} required></input>
                    </div>
                    <div className='form-group mb-2'>
                      <Link to={'../'}>
                        <button type="button" className='btn btn-secondary me-2'>Volver</button>
                      </Link>
                      <button type="submit" className='btn btn-primary mx-2' disabled={disableBtn}>Guardar</button>
                    </div>
                    {showAlert}
                  </form>
                </div>
              </div>
            ))
          : <Loader />
      }
    </>
  )
}

export default EditUser
