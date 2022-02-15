import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Login = () => {
  const [ver, setVer] = useState(false)
  const [form, setForm] = useState({})

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const request = {
      headers: {
        'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      body: JSON.stringify(form)
    }
    try {
      const response = await fetch('http://127.0.0.1:4000/login', request)
      const json = await response.json()
      let swal_message = ''
      let swal_icon = ''
      let swal_title = ''
      if (response.ok) {
        swal_title = 'Acceso concedido'
        swal_message = json.msg
        swal_icon = 'success'
      } else {
        swal_title = 'Error de acceso'
        swal_message = json.msg
        console.log(json.msg)
        swal_icon = 'error'
      }

      MySwal.fire({
        title: <p className='h3'>{swal_title}</p>,
        text: swal_message,
        icon: swal_icon,
        timer: 1500,
        showConfirmButton: false
        // footer: 'Copyright 2018',
        // didOpen: () => {
        //   // `MySwal` is a subclass of `Swal`
        //   //   with all the same instance & static methods
        //   MySwal.clickConfirm()
        // }
      })
    } catch (error) {

    }
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

  useEffect(() => {
    // console.log(form)
  }, [form])

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
