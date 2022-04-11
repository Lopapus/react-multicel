import { useState, useEffect } from 'react'
import Message from '../../components/message'
import { useParams, Link } from 'react-router-dom'
import { useSetForm } from '../../hooks'
import { useFetchToken } from '../../hooks/fetch-multicel'
import Swal2 from '../../components/SweetAlert2'
import Server from '../../services/Server'
import formCreateSchema from '../../validations/vCreateUser'
import Loader from '../../components/Loader'

const CreateUsers = () => {
  const [showAlert, setShowAlert] = useState(null)
  const [forms, setForms] = useSetForm()
  const params = useParams()
  const fetchToken = useFetchToken()
  const [stateUsers, setStateUsers] = useState({})
  const [disableBtn, setDisableBtn] = useState(true)

  let user
  let method
  let url

  if (params.id) {
    const handleFetch = async () => {
      try {
        const peticion = await fetchToken(`${Server}/usuarios/user/${params.id}`)
        const res = peticion.json
        setStateUsers(res[0])
      } catch (error) {
        // console.log(error)
      }
    }
    useEffect(() => {
      handleFetch()
    }, [])

    user = {
      id: stateUsers.id,
      nombre: stateUsers.nombre,
      usuario: stateUsers.usuario,
      password: stateUsers.password,
      rol: stateUsers.rol,
      clave_maestra: stateUsers.clave_maestra
    }

    method = 'PATCH'
    url = `${Server}/usuarios/${params.id}`
  } else {
    method = 'POST'
    url = `${Server}/usuarios`
    user = {
      id: '',
      nombre: '',
      usuario: '',
      password: '',
      rol: '',
      clave_maestra: ''
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setShowAlert(<Message message={'Enviando...'} className='alert p-1 alert-info text-center' />)
    const request = {
      method: method,
      body: JSON.stringify({ ...forms, id: user.id })
    }

    try {
      const response = await fetchToken(url, request)
      const json = response.json
      if (response.ok) {
        if (method === 'POST') {
          setShowAlert(<Message message={'Usuario agregado correctamente'} className='alert p-1 alert-success text-center' />)
        } else {
          setShowAlert(<Message message={'Se ha editado correctamente'} className='alert p-1 alert-success text-center' />)
        }
      } else {
        setShowAlert(<Message message={json.msg} className='alert p-1 alert-danger text-center' />)
      }
    } catch (error) {
      setShowAlert(<Message message='Error' className='alert alert-danger text-center' />)
    }
  }

  const handleSubmitMaster = async (e) => {
    e.preventDefault()
    const request = {
      method: 'PUT',
      body: JSON.stringify({ id: user.id })
    }
    Swal2.fire({
      title: '¿Desea generar una nueva clave maestra?',
      html: '<i>Una vez acepte la clave maestra actual no se podrá recuperar, en cambio se generará una nueva<i/>',
      showDenyButton: false,
      confirmButtonColor: '#161d27',
      showCancelButton: true,
      confirmButtonText: 'GENERAR'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setShowAlert(<Message message={'Generando...'} className='alert p-1 alert-info text-center' />)
        try {
          const response = await fetchToken(`${Server}/usuarios/master`, request)
          const json = response.json
          setStateUsers({ ...stateUsers, clave_maestra: json.clave_maestra })
          if (response.ok) {
            setShowAlert(<Message message={'Clave maestra actualizada correctamente'} className='alert p-1 alert-success text-center' />)
          } else {
            setShowAlert(<Message message={json.msg} className='alert p-1 alert-danger text-center' />)
          }
        } catch (error) {
          setShowAlert(<Message message='Error' className='alert alert-danger text-center' />)
        }
      }
    })
  }

  useEffect(
    () => {
      setShowAlert(null)
    }, [forms]
  )
  useEffect(() => {
    formCreateSchema.isValid(forms).then((esValido) => {
      setDisableBtn(!esValido)
    })
  }, [forms])
  useEffect(() => {
    console.log(stateUsers)
  }, [stateUsers])
  return (
    <>
      <div className="card border-0 shadow mt-3">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">Usuarios</h2>
        </div>
        <div className="card-body">
          {
            params.id
              ? stateUsers.clave_maestra
                ? <div>
                    <form onSubmit={handleSubmitMaster}>
                      <label>Clave maestra</label>
                      <div className="input-group mb-3">
                        <input type="text" name='clave_maestra' className='form-control' value={user.clave_maestra} disabled />
                        <div className="input-group-append">
                          <button type='submit' className="btn btn-primary"><i className="fa-solid fa-arrow-rotate-right"></i></button>
                        </div>
                      </div>
                    </form>
                  <form onSubmit={handleSubmitForm}>
                    <div className="mb-2 form-group">
                      <label>Rol</label>
                      {
                        user.rol === 'admin'
                          ? <select name="rol" className="form-control" onChange={setForms}>
                              <option value="admin">Administrador</option>
                              <option value="personal">Personal</option>
                            </select>
                          : <select name="rol" className="form-control" onChange={setForms}>
                              <option value="personal">Personal</option>
                              <option value="admin">Administrador</option>
                            </select>
                        }
                      </div>
                      <div className='form-group mx-2 mb-2'>
                        <Link to="../">
                          <button className='btn btn-warning'>Volver</button>
                        </Link>
                        <button type="submit" className="btn btn-primary mx-2">Guardar cambios</button>
                      </div>
                      {showAlert}
                    </form>
                  </div>
                : <Loader />
              : <form onSubmit={handleSubmitForm}>
                    <div className="form-group">
                      <label>Nombre y apellido</label>
                      <input type="text" className="form-control" name="nombre" minLength="6" defaultValue={user.nombre} onChange={setForms} autoComplete="off" required></input>
                    </div>
                    <div className="form-group">
                      <label>Usuario</label>
                      <input type="text" className="form-control" name="usuario" minLength="8" defaultValue={user.usuario} onChange={setForms} autoComplete="off" required></input>
                    </div>
                    <div className="form-group">
                      <label>Contraseña</label>
                      <input type="password" className="form-control" name="password" minLength="8" defaultValue={user.password} onChange={setForms} required></input>
                    </div>
                    <div className="mb-2 form-group">
                      <label>Rol</label>
                        <select name="rol" id="rol" className="form-select" defaultValue={user.rol ? user.rol : ''} onChange={setForms} required>
                          <option className="form-control" disabled value="" readOnly={true}>Seleccione</option>
                          <option className="form-control" value="admin">Administrador</option>
                          <option className="form-control" value="personal">Personal</option>
                        </select>
                    </div>
                    <div className='form-group mx-2 mb-2'>
                      <Link to="../">
                        <button className='btn btn-warning'>Volver</button>
                      </Link>
                      <button type="submit" className="btn btn-primary mx-2" disabled={disableBtn}>Agregar usuario</button>
                    </div>
                    {showAlert}
              </form>
          }
        </div>
      </div>
    </>
  )
}

export default CreateUsers
