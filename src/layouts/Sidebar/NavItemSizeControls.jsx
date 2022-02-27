import useWindowDimensions from '../../hooks/useWindowDimensions'

const NavItemSizeControls = ({ children, ...props }) => {
  const { width } = useWindowDimensions()
  return width < 768
    ? <span {...props} data-bs-toggle='collapse' data-bs-target='#sidebarMenu' aria-controls='sidebarMenu' >{children}</span>
    : <span {...props} >{children}</span>
}

export default NavItemSizeControls
