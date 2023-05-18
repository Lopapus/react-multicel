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
            <div className="form-check-label" htmlFor={`${'defaultCheck' + id}`}>
              <span className='h6'>
                {categoria.nombre} {subcategoria.nombre} {marca.nombre} {modelo}
                <span className='text-info' style={{ marginLeft: '3%' }}>
                  {'$' + precio}
                </span>
              </span>

            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProductoItem
