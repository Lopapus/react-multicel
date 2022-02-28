import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../../contexts/SessionProvider'
import NavItem from '../Sidebar/NavItem'
// import NavItemBadge from '../Sidebar/NavItemBadge'
// import NavItemMultilevel from '../Sidebar/NavItemMultilevel'
import NavSeparator from '../Sidebar/NavSeparator'
// import ButtonIcon from '../../components/ButtonIcon'
import img_multicel from '../../images/logo/Multicel.png'
import icon_multicel from '../../images/logo/Multicel_icon.png'

const Sidebar = () => {
  // const multiList = [
  //   <NavItem key={'multi-list-navitem-0'} label={'Tables'} path={'bootstrap-tables'} iconclass={'fas fa-users'} />
  // ]
  const session = useContext(SessionContext)[0]
  return (
    <>
      {/* Mobile design navbar controls */}
      <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
        <Link to="/" className="navbar-brand me-lg-5">
          <img className="navbar-brand-dark me-2" src={icon_multicel} alt="Multicel icon" />
          {/* <img className="navbar-brand-light" src="../../assets/img/brand/dark.svg" alt="Volt logo" /> */}
        </Link>
        <div className="d-flex align-items-center">
          <button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Desktop and sidebar */}
      <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar>
        <div className="sidebar-inner px-4 pt-3">

          {/* mobile content */}
          <div className="d-flex d-md-none align-items-center justify-content-end">
            {/* <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4"> */}
            {/* <div className="d-flex align-items-center">
              <div className="d-block">
                <h2 className="h5 mb-3">Hola, {session.nombre}</h2>
                <Link to="/logout">
                  <ButtonIcon btncolor='btn-secondary' btnsize='btn-sm' iconclass={'fa-solid fa-person-running'}>
                    Cerrar Sesion
                  </ButtonIcon>
                </Link>
              </div>
            </div> */}
            <div className="collapse-close d-md-none">
              <a onContextMenu={(e) => e.preventDefault()} className="btn btn-outline-danger btn-sm" href="#sidebarMenu" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true"
                aria-label="Toggle navigation">
                <i className="fa-solid fa-xmark"></i>
              </a>
            </div>
          </div>

          <ul className="nav flex-column pt-3 pt-md-0">

            <li className="d-flex justify-content-center"> {/* nav-item */}
              <Link to="/" className="nav-link d-flex align-items-center">
                <span className="sidebar-icon">
                  <img src={img_multicel} width={100} alt="Multicel logo" />
                </span>
                {/* <span className="mt-1 ms-1 sidebar-text">MULTICEL</span> */}
              </Link>
            </li>

            <NavSeparator colorclass={'border-gray-700'} />

            <NavItem label={'Inicio'} path={''} iconclass={'fa-solid fa-home'} />
            {/* <NavItem label={'Productos'} path={'productos'} iconclass={'fa-solid fa-box'} /> */}
            {
              session.rol === 'admin' &&
              <NavItem label={'Usuarios'} path={'usuarios'} iconclass={'fa-solid fa-user'} />
            }
            {/* <NavItem label={'Caja'} path={'caja'} iconclass={'fa-solid fa-cash-register'} /> */}
            {/* <NavItem label={'Ofertas'} path={'ofertas'} iconclass={'fa-solid fa-percent'} /> */}
            {/* <NavItem label={'Proveedores'} path={'proveedores'} iconclass={'fa-solid fa-users'} /> */}
            {/* <NavItem label={'Reportes'} path={'reportes'} iconclass={'fa-solid fa-chart-pie'} /> */}
            {/* <NavItem label={'Reportes'} path={'reportes'} iconclass={'bi bi-pie-chart-fill'} />
            <NavItem label={'Reportes'} path={'reportes'} iconclass={'bi bi-person-circle'} /> */}
            {/* <NavItemBadge label={'Alertas'} path={'alertas'} iconclass={'fa-solid fa-circle-exclamation'} badgelabel={1} badgetxtcolor={'text-white'} badgebgcolor={'bg-danger'} /> */}

            {/* <NavItemMultilevel label={'Parametros'} iconclass={'fa-solid fa-gear'} >
              <NavItem label={'Metodos de pago'} path={'parametros/methodos-de-pago'} iconclass={'fa-solid fa-credit-card'} />
              <NavItemMultilevel label={'Productos'} iconclass={'fa-regular fa-clipboard'} >
                <NavItem label={'Categoria'} path={'parametros/categorias'} iconclass={'fa-solid fa-list'} />
                <NavItem label={'Subcategoria'} path={'parametros/subcategorias'} iconclass={'fa-solid fa-list'} />
                <NavItem label={'Marcas'} path={'parametros/marcas'} iconclass={'fa-solid fa-list'} />
                <NavItem label={'Modelos'} path={'parametros/modelos'} iconclass={'fa-solid fa-list'} />
              </NavItemMultilevel>
            </NavItemMultilevel> */}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
