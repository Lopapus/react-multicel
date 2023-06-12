import { useContext } from 'react'
import { Link } from 'react-router-dom'
import CardComponent from '../../layouts/Card/CardComponent'
import { SessionContext } from '../../contexts/SessionProvider'
import img_usuario from '../../images/sistema/usuario.png'
import ButtonIcon from '../../components/ButtonIcon'

const UserAccount = () => {
  const session = useContext(SessionContext)[0]
  return (
    <CardComponent title={'Datos de la cuenta'}>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-auto d-flex justify-content-center align-items-center">
              <img className="rounded-circle" src={img_usuario} width={90} height={90} />
            </div>
            <div className="col-12 col-md-auto d-flex justify-content-center">
              <div className="text-center text-md-start">
                <p className="h3 fw-bolder mb-1">{session.nombre}</p>
                <p className="h5 fw-bolder mb-1">Usuario: {session.usuario}</p>
                <p className=" fw-bolder text-info">Rol: {session.rol}</p>
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
            <Link to={`clave${session.usuario}`}>
              <ButtonIcon btncolor='btn-secondary' btnsize='btn-sm' iconclass={'fa-solid fa-key'}>
                Cambiar contraseña
              </ButtonIcon>
            </Link>
          </div>
        </div>
      </div>
    </CardComponent>
  )
}

export default UserAccount
