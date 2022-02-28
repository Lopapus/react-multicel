/* eslint-disable react/no-unescaped-entities */

import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Navbar = () => {
  return (
    <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0 ">
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-between w-100" id="navbarSupportedContent"> {/* navbar */}
          <div className="d-flex align-items-center">
            {/* <!-- Search form --> */}
            {/* <form className="navbar-search form-inline" id="navbar-search-main">
              <div className="input-group input-group-merge search-bar">
                <span className="input-group-text" id="topbar-addon">
                  <svg className="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </span>
                <input type="text" className="form-control" id="topbarInputIconLeft" placeholder="Search" aria-label="Search" aria-describedby="topbar-addon" />
              </div>
            </form> */}
            {/* <!-- / Search form --> */}
          </div>
          {/* <!-- Navbar links --> */}
          <ul className="navbar-nav align-items-center ">
            <li className="nav-item dropdown " >
              <a className="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="media d-flex align-items-center">
                  <img className="avatar rounded-circle" alt="Image placeholder" src="https://www.getbillage.com/files/user/avatar/_usuario.png" />
                  <div className="media-body ms-2 text-dark align-items-center "> {/* d-none d-lg-block */}
                    {/* <span className="mb-0 font-small fw-bold text-gray-900">Admin</span> */}
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
                <Link to="/cuenta" className="dropdown-item d-flex align-items-center">
                  <span className="dropdown-icon text-gray-400">
                    <i className="fa-solid fa-circle-user"></i>
                  </span>
                  Mi usuario
                </Link>
                <div role="separator" className="dropdown-divider my-1"></div>
                <LogoutButton className="dropdown-item d-flex align-items-center" />
              </div>
            </li>
          </ul >
        </div >
      </div >
    </nav >
  )
}

export default Navbar
