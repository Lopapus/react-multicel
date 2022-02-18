import { useState, useEffect } from 'react'
import Message from '../components/message'

const CreateUsers = () => {
  const [showAlert, setShowAlert] = useState(null)
  const [form, setForm] = useState({})

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(form)
    }
    try {
      const response = await fetch('http://127.0.0.1:4000/usuarios', request)
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        setShowAlert(<Message message= {'Usuario agregado correctamente'} className='alert p-1 alert-success' />)
      } else {
        setShowAlert(<Message message= {json.msg} className='alert p-1 alert-danger' />)
      }
    } catch (error) {
      // setShowAlert({ message: 'Error', style: 'col-2 alert alert-danger' })
      setShowAlert(<Message message= 'Error' className='col-2 alert alert-danger' />)
    }
  }

  useEffect(
    () => {
      console.log(form)
    }, [form]
  )
  return (
    <>
      <div className="card border-0 shadow mt-3">
        <div className="card-header border-bottom d-flex align-items-center justify-content-between">
          <h2 className="fs-5 fw-bold mb-0">Usuarios</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitForm}>
            <div className="form-group">
              <label>Nombre y apellido</label>
              <input type="text" className="form-control" name="nombre" placeholder="" onChange={handleChangeForm} required></input>
            </div>
            <div className="form-group">
              <label>Usuario</label>
              <input type="text" className="form-control" name="usuario" placeholder="" onChange={handleChangeForm} required></input>
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control" name="password" placeholder="" onChange={handleChangeForm} required></input>
            </div>
            <div className="mb-2 form-group">
              <label>Rol</label>
              <select name="rol" id="rol" className="form-select" defaultValue={''} onChange={handleChangeForm} required>
                <option disabled value="" readOnly={true}>Seleccione</option>
                <option value="admin">Administrador</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <button type="submit" className="mb-2 btn btn-primary">Agregar usuario</button>
            {showAlert}
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateUsers
