import { NavLink, useLocation } from 'react-router-dom'
import NavItemSizeControls from './NavItemSizeControls'

const NavItem = ({ label, path, iconclass = '' }) => {
  const handleSetActive = () => {
    const location = useLocation()
    const pathname = location.pathname.slice(1).split('/')[0]
    return pathname === path || location.pathname.slice(1) === path ? 'active' : ''
  }

  return (
    <li className={`nav-item ${handleSetActive()} `}>
      <NavLink to={path} >
        <NavItemSizeControls className="nav-link d-flex flex-row" >
          {
            iconclass !== '' &&
            <span className='sidebar-icon-container text-center'>
              <span className="sidebar-icon">
                <i className={iconclass}></i>
              </span>
            </span>
          }
          <span className="sidebar-text">{label}</span>
        </NavItemSizeControls>
      </NavLink>
    </li>
  )
}

export default NavItem
