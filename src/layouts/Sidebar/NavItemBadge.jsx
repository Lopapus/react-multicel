import { NavLink, useLocation } from 'react-router-dom'

const NavItem = ({ label, path, iconclass = '', badgelabel, badgetxtcolor, badgebgcolor }) => {
  const location = useLocation()
  const pathname = location.pathname.replace('/', '')

  return (
    <li className={`nav-item ${pathname === path ? 'active' : ''} `}>
      <NavLink to={path} className="nav-link d-flex justify-content-between" rel="noreferrer" >
        {
          iconclass !== '' &&
          <span className="d-flex">
            <span className='sidebar-icon-container text-center'>
              <span className="sidebar-icon">
                <i className={iconclass}></i>
              </span>
            </span>
            <span className="sidebar-text">{label}</span>
          </span>
        }
        <span>
          <span className={`badge badge-sm ${badgebgcolor} ms-1 ${badgetxtcolor}`} >{badgelabel}</span>
        </span>
      </NavLink>
    </li>
  )
}

export default NavItem
