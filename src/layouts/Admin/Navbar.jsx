/* eslint-disable react/no-unescaped-entities */

const Navbar = () => {
  return (
    <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
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
          <ul className="navbar-nav align-items-center">
            <li className="nav-item dropdown">
              <a className="nav-link text-dark notification-bell unread dropdown-toggle" data-unread-notifications="true" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <svg className="icon icon-sm text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <div className="list-group list-group-flush">
                  <a href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">Notifications</a>
                  <a href="#" className="list-group-item list-group-item-action border-bottom">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        {/* <!-- Avatar --> */}
                        <img alt="Image placeholder" src="../../assets/img/team/profile-picture-4.jpg" className="avatar-md rounded" />
                      </div>
                      <div className="col ps-0 ms-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="h6 mb-0 text-small">Joseph Garth</h4>
                          </div>
                          <div className="text-end">
                            <small>1 d ago</small>
                          </div>
                        </div>
                        <p className="font-small mt-1 mb-0">New message: "Hey, what's up? All set for the presentation?"</p>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-bottom">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        {/* <!-- Avatar --> */}
                        <img alt="Image placeholder" src="../../assets/img/team/profile-picture-5.jpg" className="avatar-md rounded" />
                      </div>
                      <div className="col ps-0 ms-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="h6 mb-0 text-small">ADMIN</h4>
                          </div>
                          <div className="text-end">
                            <small>2 hrs ago</small>
                          </div>
                        </div>
                        <p className="font-small mt-1 mb-0">New message: "We need to improve the UI/UX for the landing page."</p>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item text-center fw-bold rounded-bottom py-3">
                    <svg className="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                    View all
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown ms-lg-3">
              <a className="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="media d-flex align-items-center">
                  {/* <img className="avatar rounded-circle" alt="Image placeholder" src="../../assets/img/team/profile-picture-3.jpg" /> */}
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold text-gray-900">Admin</span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                  My Profile
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                  Settings
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd"></path></svg>
                  Messages
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path></svg>
                  Support
                </a>
                <div role="separator" className="dropdown-divider my-1"></div>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <svg className="dropdown-icon text-danger me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
