import NavItem from '../Sidebar/NavItem'
import NavItemBadge from '../Sidebar/NavItemBadge'
import NavItemMultilevel from '../Sidebar/NavItemMultilevel'
import NavSeparator from '../Sidebar/NavSeparator'

const Sidebar = () => {
  // const multiList = [
  //   <NavItem key={'multi-list-navitem-0'} label={'Tables'} path={'bootstrap-tables'} iconclass={'fas fa-users'} />
  // ]
  return (
    <>
      {/* Mobile design */}
      <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
        <a className="navbar-brand me-lg-5" href="../../index.html">
          <img className="navbar-brand-dark" src="../../assets/img/brand/light.svg" alt="Volt logo" /> <img className="navbar-brand-light" src="../../assets/img/brand/dark.svg" alt="Volt logo" />
        </a>
        <div className="d-flex align-items-center">
          <button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Desktop and sidebar */}
      <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar>
        <div className="sidebar-inner px-4 pt-3">
          <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
            <div className="d-flex align-items-center">
              <div className="avatar-lg me-4">
                <img src="../../assets/img/team/profile-picture-3.jpg" className="card-img-top rounded-circle border-white"
                  alt="Bonnie Green" />
              </div>
              <div className="d-block">
                <h2 className="h5 mb-3">Hi, Jane</h2>
                <a href="../../pages/examples/sign-in.html" className="btn btn-secondary btn-sm d-inline-flex align-items-center">
                  <svg className="icon icon-xxs me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Sign Out
                </a>
              </div>
            </div>
            <div className="collapse-close d-md-none">
              <a href="#sidebarMenu" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true"
                aria-label="Toggle navigation">
                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>
            </div>
          </div>

          <ul className="nav flex-column pt-3 pt-md-0">

            <li className="d-flex justify-content-center"> {/* nav-item */}
              <a href="../../index.html" className="nav-link d-flex align-items-center">
                {/* <span className="sidebar-icon">
                <img src="../../assets/img/brand/light.svg" height="20" width="20" alt="Volt Logo" />
                </span> */}
                <span className="mt-1 ms-1 sidebar-text"> <i className="fas fa-mobile-alt"></i> MULTICEL</span>
              </a>
            </li>

            <NavSeparator colorclass={'border-gray-700'} />
            <NavItem label={'Inicio'} path={'inicio'} iconclass={'fa-solid fa-home'} />
            <NavItem label={'Productos'} path={'productos'} iconclass={'fa-solid fa-box'} />
            <NavItem label={'Usuarios'} path={'usuarios'} iconclass={'fa-solid fa-user'} />
            <NavItem label={'Caja'} path={'caja'} iconclass={'fa-solid fa-cash-register'} />
            <NavItem label={'Ventas'} path={'ventas'} iconclass={'fa-solid fa-dollar-sign'} />
            <NavItem label={'Proveedores'} path={'proveedores'} iconclass={'fa-solid fa-users'} />
            <NavItem label={'Reportes'} path={'reportes'} iconclass={'fa-solid fa-chart-pie'} />
            <NavItemBadge label={'Alertas'} path={'alertas'} iconclass={'fa-solid fa-circle-exclamation'} badgelabel={1} badgetxtcolor={'text-white'} badgebgcolor={'bg-danger'} />

            <NavItemMultilevel label={'Configuración'} iconclass={'fa-solid fa-gear'} >
              <NavItem label={'Metodos de pago'} path={'configuracion/methodos-de-pago'} iconclass={'fa-solid fa-credit-card'} />
              <NavItemMultilevel label={'Productos'} iconclass={'fa-regular fa-clipboard'} >
                <NavItem label={'Categoria'} path={'configuracion/categoria'} iconclass={'fa-solid fa-list'} />
                <NavItem label={'Subcategoria'} path={'configuracion/subcategoria'} iconclass={'fa-solid fa-list'} />
              </NavItemMultilevel>
            </NavItemMultilevel>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
