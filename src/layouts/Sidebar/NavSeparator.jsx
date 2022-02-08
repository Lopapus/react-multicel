const NavSeparator = ({ colorclass = 'border-gray' }) => {
  return (
    <li role="separator" className={`dropdown-divider ${colorclass}`} ></li>
  )
}

export default NavSeparator
