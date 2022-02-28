import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionProvider'
import CardComponent from '../layouts/Card/CardComponent'
import img_usuario from '../images/sistema/usuario.png'
import svg_woman from '../images/svg/at-work.svg'

const Home = () => {
  const session = useContext(SessionContext)[0]
  return (
    <CardComponent>
      <div className="row align-items-center">

        <div className="col animate__animated animate__fadeInLeft">
          <div className="text-start text-xl-start text-xxl-center mb-4 mb-xl-0 mb-xxl-4">
            <h1 className="text-info">Biénvenido al Sistema de <b>Multicel</b></h1>

            <section className="text-gray-700 text-start">
              <b>En esta versión del sistema podrás realizar las siguientes acciones:</b>
              <ol>
                <li className="mt-2">
                  Ingresar al sistema con los datos de usuario y contraseña, provistos por un usuario <b>administrador</b>
                </li>
                <li className="mt-2">
                  Al presionar el icono de <img className="mx-1 rounded-circle" src={img_usuario} width={18} alt="user image" /> se desplegará un menú con dos opciones:
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
                    <li className="mt-2">
                      <b>Administrar</b> los usuarios que pueden ingresar al sistema:
                      <ul>
                        <li>Ver los datos de cada usuario</li>
                        <li>Crear, Modificar, Eliminar y Deshabilitar usuarios</li>
                        <li>Cambiar clave maestra de usuarios</li>
                      </ul>
                    </li>
                  </>
                }
              </ol>
            </section>

          </div>
        </div>

        <div className="col-xl-5 col-xxl-12 text-center animate__animated animate__fadeInRight">
          <img className="img-fluid" src={svg_woman} style={{ maxWidth: '26rem' }} />
        </div>
      </div>
    </CardComponent>
  )
}

export default Home
