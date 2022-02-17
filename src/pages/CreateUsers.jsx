import { useState, useEffect } from 'react'

// const [showAlert, setShowAlert] = useState(null)
// console.log(showAlert)

const CreateUsers = () => {
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
    } catch (error) {
      // setShowAlert({ Message: 'Error', style: 'col-2 alert alert-danger' })
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
            <div className="form-group">
              <label>Rol</label>
              <select name="rol" id="rol" className="form-select" onChange={handleChangeForm}>
                <option value="admin">Administrador</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Agregar usuario</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateUsers
