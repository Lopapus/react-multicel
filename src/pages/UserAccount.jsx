import CardComponent from '../layouts/Card/CardComponent'
import { SessionContext } from '../contexts/SessionProvider'
import { useContext } from 'react'
import ButtonIcon from '../components/ButtonIcon'
import { Link } from 'react-router-dom'

const UserAccount = () => {
  const session = useContext(SessionContext)[0]
  return (
    <CardComponent title={'Datos de la cuenta'}>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-auto d-flex justify-content-center align-items-center">
              <img className="rounded-circle" src="https://www.getbillage.com/files/user/avatar/_usuario.png" width={90} height={90} />
            </div>
            <div className="col-12 col-md-auto d-flex justify-content-center">
              <div className="text-center text-md-start">
                <p className="h3 fw-bolder mb-1">{session.nombre}</p>
                <p className="h5 fw-bolder mb-1">{session.usuario}</p>
                <p className=" fw-bolder text-info">{session.rol}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mt-4">
          <div className="w-auto d-grid gap-2 d-flex justify-content-center justify-content-md-start">
            <Link to={`${session.usuario}`}>
              <ButtonIcon btncolor='btn-secondary' btnsize='btn-sm' iconclass={'fa-solid fa-pencil'}>
                Modificar datos
              </ButtonIcon>
            </Link>
            <ButtonIcon btncolor='btn-secondary' btnsize='btn-sm' iconclass={'fa-solid fa-key'}>
              Cambiar contraseña
            </ButtonIcon>
          </div>
        </div>
      </div>
    </CardComponent>
  )
}

export default UserAccount
