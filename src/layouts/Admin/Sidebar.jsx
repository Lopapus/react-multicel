import NavItem from '../Sidebar/NavItem'
import NavItemBadge from '../Sidebar/NavItemBadge'
import NavSeparator from '../Sidebar/NavSeparator'

const Sidebar = () => {
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
                <h5 className="mt-1 ms-1 sidebar-text"> <i className="fas fa-mobile-alt"></i> MULTICEL</h5>
              </a>
            </li>

            <NavSeparator colorclass={'border-gray-700'} />

            <NavItem label={'Dashboard'} path={'dashboard'} iconclass={'fas fa-chart-pie'} />

            <NavItemBadge label={'Kanban'} path={'kanban'} iconclass={'fas fa-user'} badgelabel={3} badgetxtcolor={'text-white'} badgebgcolor={'bg-info'} />

            <NavItemBadge label={'Desarrollo'} path={'develop'} iconclass={'fas fa-user'} badgelabel={'develop'} badgetxtcolor={'text-white'} badgebgcolor={'bg-danger'} />

            <NavItem label={'Ventas'} path={'ventas'} iconclass={'fas fa-dollar-sign'} />

            <NavItem label={'Template'} path={'template'} iconclass={'fas fa-user'} />

            <li className="nav-item">
              <span
                className="nav-link  collapsed  d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse" data-bs-target="#submenu-app">
                <span>
                  <span className="sidebar-icon">
                    {/* <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg> */}
                    <i className="fas fa-users"></i>
                  </span>
                  <span className="sidebar-text">Tables</span>
                </span>
                <span className="link-arrow">
                  <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </span>
              </span>
              <div className="multi-level collapse "
                role="list" id="submenu-app" aria-expanded="false">
                <ul className="flex-column nav">
                  <NavItem label={'Tables'} path={'bootstrap-tables'} iconclass={'fas fa-users'} />
                </ul>
              </div>
            </li>
            {/* <li className="nav-item">
            <a href="../../pages/upgrade-to-pro.html"
              className="btn btn-secondary d-flex align-items-center justify-content-center btn-upgrade-pro">
              <span className="sidebar-icon d-inline-flex align-items-center justify-content-center">
                <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg>
              </span>
              <span>Upgrade to Pro</span>
            </a>
          </li> */}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar
