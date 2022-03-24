import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../../contexts/SessionProvider'
import { useFetchCallBack } from '../../hooks/fetch-multicel'
import { useSetForm } from '../../hooks'
import Server from '../../services/Server'
import ButtonIcon from '../../components/ButtonIcon'
import img_lock from '../../images/sistema/lock.png'
import SwalTimer from '../../helpers/SwalTimer'

const Login = () => {
  const [ver, setVer] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [form, setForm] = useSetForm({})
  const login = useContext(SessionContext)[1]
  const navigate = useNavigate()
  const fetchCallBack = useFetchCallBack()

  const handleShowAlert = async (response) => {
    if (response.ok) {
      login({ type: 'login', payload: response.json.user })
      await SwalTimer.success({ title: <p className='h3 text-success'>{response.json.msg}</p> })
      navigate('/')
    } else {
      await SwalTimer.error({ title: <p className='h3 text-danger'>{response.json.msg || 'Ocurrió un error, vuelva a intentarlo'}</p> })
      login({ type: 'logout' })
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    const url = `${Server}/login`
    const content = {
      method: 'POST',
      body: JSON.stringify(form)
    }

    try {
      setDisabled(true)
      await fetchCallBack(url, content, handleShowAlert)
      setDisabled(false)
    } catch (error) {
      setDisabled(false)
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

                <div className="text-center text-md-center mb-4 mt-md-0 animate__animated animate__pulse">
                  {/* <h1 className="mb-0 h3">Ingreso al sistema</h1> */}
                  <img src={img_lock} width={100} alt="lock image" />
                </div>

                <form onSubmit={handleSubmitForm} className="mt-4">

                  <div className="form-group mb-4">
                    <div className="input-group">
                      <span className="input-group-text px-3" id="basic-addon1">
                        <i className="fas fa-user"></i>
                      </span>
                      <input value={form.usuario || ''} onChange={setForm} type="text" className="form-control" placeholder="usuario" id="usuario" name="usuario" autoFocus required />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <div className="input-group">
                        <span className="input-group-text px-3" id="basic-addon2">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input value={form.password || ''} autoComplete='off' onChange={setForm} type={ver ? 'text' : 'password'} placeholder="contraseña" className="form-control" id="password" name="password" required />
                        <span className="input-group-text p-1">
                          <ButtonIcon
                            btncolor=""
                            type="button"
                            btnsize="btn-xs"
                            iconclass={`fa-solid ${ver ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={() => setVer(!ver)}
                            onContextMenu={(e) => { e.preventDefault() }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button disabled={disabled} type="submit" className="btn btn-gray-800">{!disabled ? 'Ingresar' : 'Ingresando...'}</button>
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