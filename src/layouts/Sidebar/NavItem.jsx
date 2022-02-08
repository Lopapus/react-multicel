import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ label, path, iconclass }) => {
  const location = useLocation()
  const pathname = location.pathname.replace('/', '')

  return (
    <li className={`nav-item ${pathname === path ? 'active' : ''} `}>
      <Link to={path} className="nav-link">
        <span className="sidebar-icon">
          <i className={iconclass}></i>
        </span>
        <span className="sidebar-text">{label}</span>
      </Link>
    </li>
  )
}

export default NavItem
