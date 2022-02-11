import MakeRandomString from '../../helpers/MakeRandomString'

const NavItemMultilevel = ({ label, iconclass, children }) => {
  const idSubmenu = 'multilevel-navitem-' + MakeRandomString(5)
  return (
    <li className="nav-item">
      <span
        className="nav-link  collapsed  d-flex justify-content-between align-items-center"
        data-bs-toggle="collapse" data-bs-target={`#${idSubmenu}`}>
        <span className="d-flex">
          <span className='sidebar-icon-container text-center'>
            <span className="sidebar-icon">
              <i className={iconclass}></i>
            </span>
          </span>
          <span className="sidebar-text">{label}</span>
        </span>
        <span className="link-arrow">
          <svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        </span>
      </span>
      <div className="multi-level ps-3 collapse"
        role="list" id={idSubmenu} aria-expanded="false">
        <ul className="flex-column nav">
          {children}
          {/* <NavItem label={'Tables'} path={'bootstrap-tables'} iconclass={'fas fa-users'} /> */}
        </ul>
      </div>
    </li>
  )
}

export default NavItemMultilevel
