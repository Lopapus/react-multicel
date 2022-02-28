import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionProvider'
import CardComponent from '../layouts/Card/CardComponent'

const Home = () => {
  const session = useContext(SessionContext)[0]
  return (
    <CardComponent>
      <div className="row align-items-center">
        <div className="col">
          <div className="text-start text-xl-start text-xxl-center mb-4 mb-xl-0 mb-xxl-4">
            <h1 className="text-info">Biénvenido al Sistema de <b>Multicel</b></h1>

            <section className="text-gray-700 text-start">
              <p>
                <b>En esta versión del sistema podrás realizar las siguientes acciones:</b>
                <ul>
                  <li>
                    Ingresar al sistema con los datos de usuario y contraseña, provistos por un usuario <b>administrador</b>
                  </li>
                  <li>
                    Al presionar el icono de <img className="mx-1 rounded-circle" src="https://www.getbillage.com/files/user/avatar/_usuario.png" width={18} /> se desplegará un menú con dos opciones:
                    <ul>
                      <li>
                        <span className="text-gray-400 me-2">
                          <i className="fa-solid fa-circle-user"></i>
                        </span>
                        <b>Mi usuario</b>: Aquí podrás ver la información de tu cuenta, como también modificar los datos y cambiar la contraseña
                      </li>
                      <li>
                        <span className="text-danger me-2">
                          <i className="fa-solid fa-door-open"></i>
                        </span>
                        <b>Salir</b>: Cerrará la sesión de tu cuenta y te enviará a la pagina de ingreso
                      </li>
                    </ul>
                  </li>
                  {
                    session.rol === 'admin' &&
                    <>
                      <li>
                        <b>Administrar</b> los usuarios que pueden ingresar al sistema:
                        <ul>
                          <li>Ver los datos de cada usuario</li>
                          <li>Crear, Modificar, Eliminar y Deshabilitar usuarios</li>
                          <li>Cambiar clave maestra de usuarios</li>
                        </ul>
                      </li>
                    </>
                  }
                </ul>
              </p>
            </section>

          </div>
        </div>
        <div className="col-xl-5 col-xxl-12 text-center"><img className="img-fluid" src="https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/at-work.svg" style={{ maxWidth: '26rem' }} /></div>
      </div>
    </CardComponent>
  )
}

export default Home
