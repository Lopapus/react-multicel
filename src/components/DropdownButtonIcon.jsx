import MakeRandomString from '../helpers/MakeRandomString'

const DropdownButtonIcon = ({ text, className = 'btn btn-primary', containerClass, icon, children }) => {
  const id_dropdown_menu = 'dropdown-menu-' + MakeRandomString(5)
  return (
    <div className="dropdown">
      <button className={`${className} ${!text ? 'btn-icon-only' : ''} d-inline-flex align-items-center`} type="button" id={id_dropdown_menu} data-bs-toggle="dropdown" aria-expanded="false">
        <i className={`${icon} ${text ? 'me-2' : ''}`}></i>
        {text}
      </button>
      <ul className="dropdown-menu" aria-labelledby={id_dropdown_menu}>
        <div className={containerClass}>
          {children}
        </div>
      </ul>
    </div>
  )
}

export default DropdownButtonIcon
