const ButtonIcon = ({ btncolor = 'btn-primary', btnsize = 'btn-md', iconclass, children }) => {
  const spacing = children ? 'me-2' : ''
  return (
    <button className={`btn ${btnsize} ${btncolor} ${!children ? 'btn-icon-only' : ''} d-inline-flex align-items-center`}>
      <i className={`${iconclass} ${spacing}`}></i>
      {children}
    </button>
  )
}

export default ButtonIcon
