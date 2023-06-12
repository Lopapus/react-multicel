const ButtonIcon = ({
  btncolor = 'btn-primary',
  btnsize = 'btn-md',
  iconclass,
  children,
  handler,
  ...props
}) => {
  const spacing = children ? 'me-2' : ''
  return (
    <button
      onClick={handler}
      className={`btn ${btnsize} ${btncolor} ${
        !children ? 'btn-icon-only' : ''
      } d-inline-flex align-items-center`}
      {...props}
    >
      <i className={`${iconclass} ${spacing}`}></i>
      {children}
    </button>
  )
}

export default ButtonIcon
