import { useState, useEffect, useContext } from 'react'
import Message from '../components/message'
import { useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionProvider'

const CreateUsers = () => {
  const [showAlert, setShowAlert] = useState(null)
  const [form, setForm] = useState({})
  const params = useParams()

  const session = useContext(SessionContext)[0]

  let user
  let method

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
        const peticion = await fetch(`http://localhost:4000/usuarios/${params.id}`, request)
        const res = await peticion.json()
        // console.log(res)
        setStateUsers(res)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      handleFetch()
    }, [])

    // console.log(stateUsers)

    user = {
      nombre: stateUsers.nombre,
      usuario: stateUsers.usuario,
      password: stateUsers.password,
      rol: stateUsers.rol,
      clave_maestra: stateUsers.clave_maestra
    }

    method = 'PUT'
  } else {
    method = 'POST'
    user = {
      nombre: '',
      usuario: '',
      password: '',
      rol: '',
      clave_maestra: ''
    }
  }

  // console.log(user)

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  // console.log(url, method)
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const request = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': session.token
      },
      method: method,
      body: JSON.stringify(form)
    }
    try {
      const response = await fetch('http://127.0.0.1:4000/usuarios', request)
      const json = await response.json()
      // console.log(json)
      if (response.ok) {
        setShowAlert(<Message message= {'Usuario agregado correctamente'} className='alert p-1 alert-success' />)
      } else {
        setShowAlert(<Message message= {json.msg || json} className='alert p-1 alert-danger' />)
      }
    } catch (error) {
      // setShowAlert({ message: 'Error', style: 'col-2 alert alert-danger' })
      setShowAlert(<Message message= 'Error' className='col-2 alert alert-danger' />)
    }
  }

  useEffect(
    () => {
      // console.log(form)
    }, [form]
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
          ? <form onSubmit={handleSubmitForm}>
            <div className="mb-2 form-group">
              <label>Clave maestra</label>
              <input type="text" name='clave_maestra' id='clave_maestra' className='form-control' onChange={handleChangeForm} defaultValue={user.clave_maestra}/>
            </div>
            <div className="mb-2 form-group">
              <label>Rol</label>
              <select name="rol" id="rol" className="form-select" defaultValue={user.rol ? user.rol : 0 } onChange={handleChangeForm} required>
                <option disabled value="" readOnly={true}>Seleccione</option>
                <option value="admin">Administrador</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <button type="submit" className="mb-2 btn btn-primary">Guardar cambios</button>
            {showAlert}
        </form>
          : <form onSubmit={handleSubmitForm}>
            <div className="form-group">
              <label>Nombre y apellido</label>
              <input type="text" className="form-control" name="nombre" placeholder="" defaultValue={user.nombre} onChange={handleChangeForm} required></input>
            </div>
            <div className="form-group">
              <label>Usuario</label>
              <input type="text" className="form-control" name="usuario" placeholder="" defaultValue={user.usuario} onChange={handleChangeForm} required></input>
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control" name="password" placeholder="" defaultValue={user.password} onChange={handleChangeForm} required></input>
            </div>
            <div className="mb-2 form-group">
              <label>Rol</label>
              <select name="rol" id="rol" className="form-select" defaultValue={user.rol ? user.rol : '' } onChange={handleChangeForm} required>
                <option disabled value="" readOnly={true}>Seleccione</option>
                <option value="admin">Administrador</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <button type="submit" className="mb-2 btn btn-primary">Agregar usuario</button>
            {showAlert}
          </form>
      }
        </div>
      </div>
    </>
  )
}

export default CreateUsers
