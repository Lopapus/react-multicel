import { useContext, useState } from 'react'
import { SessionContext } from '../contexts/SessionProvider'
import fetchCallback from '../helpers/fetchCallback'
import Swal2 from '../components/SweetAlert2'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [ver, setVer] = useState(false)
  const [form, setForm] = useState({})
  const login = useContext(SessionContext)[1]
  const navigate = useNavigate()

  const handleShowAlert = async (response) => {
    const SwalTimer = Swal2.mixin({
      title: <p className='h3'>{response.json.msg}</p>,
      timer: 1500,
      showConfirmButton: false
    })

    if (response.ok) {
      await SwalTimer.fire({
        icon: 'success'
      })
      login({ type: 'login', payload: response.json.user })
      navigate('/')
    } else {
      SwalTimer.fire({
        icon: 'error'
      })
      login({ type: 'logout' })
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    const url = 'http://127.0.0.1:4000/login'
    const content = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(form)
    }
    fetchCallback(url, content, handleShowAlert)
  }

  const handleSetForm = (e) => {
    const { name, value } = e.target
    // validación de campo
    if (value.trim() !== '') {
      setForm({ ...form, [name]: value })
    } else {
      if (form[name]) {
        const new_form = { ...form }
        delete new_form[name]
        setForm({ ...new_form })
      }
    }
  }

  return (
    <main>

      {/* <!-- Section --> */}
      <section className="vh-lg-100 mt-6 mt-lg-0 bg-soft d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center form-bg-image" data-background-lg="../../assets/img/illustrations/signin.svg">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  {/* <h1 className="mb-0 h3">Ingreso al sistema</h1> */}
                  <img src="https://pngimg.com/uploads/padlock/padlock_PNG9407.png" width={100} />
                </div>
                <form onSubmit={handleSubmitForm} className="mt-4">
                  {/* <!-- Form --> */}
                  <div className="form-group mb-4">
                    {/* <label htmlFor="email">Usuario</label> */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-user"></i>
                      </span>
                      <input onChange={handleSetForm} type="text" className="form-control" placeholder="usuario" id="usuario" name="usuario" autoFocus required />
                    </div>
                  </div>
                  {/* <!-- End of Form --> */}
                  <div className="form-group">
                    {/* <!-- Form --> */}
                    <div className="form-group mb-4">
                      {/* <label htmlFor="password">Contraseña</label> */}
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon2">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input onChange={handleSetForm} type={ver ? 'text' : 'password'} placeholder="contraseña" className="form-control" id="password" name="password" required />
                        <span className="input-group-text">
                          <button
                            type="button"
                            onMouseDown={() => setVer(true)}
                            onMouseUp={() => setVer(false)}
                            // onClick={() => setVer(!ver)}
                            onContextMenu={(e) => { e.preventDefault() }}
                            className="btn btn-xs"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                    {/* <!-- End of Form --> */}
                    {/* <div className="d-flex justify-content-between align-items-top mb-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="remember" />
                        <label className="form-check-label mb-0" htmlFor="remember">
                          Remember me
                        </label>
                      </div>
                      <div>
                        <a href="./forgot-password.html" className="small text-gray-500 text-right">
                          Olvidé mi contraseña
                        </a>
                      </div>
                    </div> */}
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-gray-800">Ingresar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
