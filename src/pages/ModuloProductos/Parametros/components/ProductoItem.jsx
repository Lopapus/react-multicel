const ProductoItem = ({ data, actions }) => {
  const { modelo, precio, categoria, subcategoria, marca, id } = data

  return (
    <li className="list-group-item px-0 border-bottom">
      <div className="row align-items-center">
        <div className="col-9 col-auto text-wrap ms-2">
          <div className="form-check" >
            <input
              className="form-check-input"
              type="checkbox"
              id={`${'defaultCheck' + id}`}
              name={`name${id}`}
              checked={actions.checks.includes(id)}
              onChange={() => {
                actions.handleToggleCheck(id)
              }}
            />
            <label className="form-check-label" htmlFor={`${'defaultCheck' + id}`}>
              <span className="text-primary h6 mb-0">
                {modelo}
              </span>{' '}
              <span>
                <i>
                  {categoria.nombre} {subcategoria.nombre} {marca.nombre}
                </i>
              </span>{' '}
              <span className="text-info">{'$' + precio}</span>
            </label>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProductoItem
