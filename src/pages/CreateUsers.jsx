import { useState, useEffect, useContext } from 'react'
import Message from '../components/message'
import { useParams, Link } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionProvider'
import { useSetForm } from '../hooks'
import Swal2 from '../components/SweetAlert2'
import host from '../host'
// import formCreateSchema from '../validations/vCreateUser'

const CreateUsers = () => {
  const [showAlert, setShowAlert] = useState(null)
  const [forms, setForms] = useSetForm()
  const params = useParams()

  const session = useContext(SessionContext)[0]

  let user
  let method
  let url

  if (params.id) {
    const [stateUsers, setStateUsers] = useState({})

    const handleFetch = async () => {
      try {
        const request = {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': session.token
          },
          method: 'GET'
        }
        const peticion = await fetch(`${host}/usuarios/${params.id}`, request)
        const res = await peticion.json()
        setStateUsers(res)
      } catch (error) {
        console.log(error)
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
    url = `${host}/usuarios/${params.id}`
  } else {
    method = 'POST'
    url = `${host}/usuarios`
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
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': session.token
      },
      method: method,
      body: JSON.stringify({ ...forms, id: user.id })
    }

    try {
      const response = await fetch(url, request)
      const json = await response.json()
      // console.log(json)
      if (response.ok) {
        if (method === 'POST') {
          setShowAlert(<Message message= {'Usuario agregado correctamente'} className='alert p-1 alert-success' />)
        } else {
          setShowAlert(<Message message= {'Se ha editado correctamente'} className='alert p-1 alert-success' />)
        }
      } else {
        setShowAlert(<Message message= {json.msg || json} className='alert p-1 alert-danger' />)
      }
    } catch (error) {
      setShowAlert(<Message message= 'Error' className='alert alert-danger' />)
    }
  }

  const handleSubmitMaster = async (e) => {
    e.preventDefault()
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': session.token
      },
      method: 'PUT',
      body: JSON.stringify({ id: user.id })
    }
    Swal2.fire({
      title: '¿Desea generar una nueva clave maestra?',
      showDenyButton: false,
      confirmButtonColor: '#161d27',
      showCancelButton: true,
      confirmButtonText: 'GENERAR'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${host}/usuarios/master`, request)
          const json = await response.json()
          if (response.ok) {
            setShowAlert(<Message message= {'Clave maestra actualizada correctamente'} className='alert p-1 alert-success' />)
          } else {
            setShowAlert(<Message message= {json.msg || json} className='alert p-1 alert-danger' />)
          }
        } catch (error) {
          setShowAlert(<Message message= 'Error' className='alert alert-danger' />)
        }
      } else if (result.isDenied) {
        // //
      }
    })
  }

  useEffect(
    () => {
      console.log(forms)
    }, [forms]
  )
  return (
    <>
      <div className="card border-0 shadow mt-3">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">Usuarios</h2>
        </div>
        <div className="card-body">
          {
        params.id
          ? <div>
              <form onSubmit={handleSubmitMaster}>
                <label>Clave maestra</label>
                <div className="input-group mb-3">
                  <input type="text" name='clave_maestra' className='form-control' defaultValue={user.clave_maestra} disabled />
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
          : <form onSubmit={handleSubmitForm}>
              <div className="form-group">
                <label>Nombre y apellido</label>
                <input type="text" className="form-control" name="nombre" defaultValue={user.nombre} onChange={setForms} required></input>
              </div>
              <div className="form-group">
                <label>Usuario</label>
                <input type="text" className="form-control" name="usuario" defaultValue={user.usuario} onChange={setForms} required></input>
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" className="form-control" name="password" defaultValue={user.password} onChange={setForms} required></input>
              </div>
              <div className="mb-2 form-group">
                <label>Rol</label>
                <select name="rol" id="rol" className="form-select" defaultValue={user.rol ? user.rol : '' } onChange={setForms} required>
                  <option className="form-control" disabled value="" readOnly={true}>Seleccione</option>
                  <option className="form-control" value="admin">Administrador</option>
                  <option className="form-control" value="personal">Personal</option>
                </select>
              </div>
              <div className='form-group mx-2 mb-2'>
                  <Link to="../">
                    <button className='btn btn-warning'>Volver</button>
                  </Link>
                  <button type="submit" className="btn btn-primary mx-2">Agregar usuario</button>
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
