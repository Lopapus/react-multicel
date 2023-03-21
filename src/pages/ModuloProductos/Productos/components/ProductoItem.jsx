import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DropdownButtonIcon from '../../../../components/DropdownButtonIcon'
import ActionDeleteContext from '../../../../contexts/ActionDeleteContext'

const ProductoItem = ({ data }) => {
  const action = useContext(ActionDeleteContext)
  const { marca, categoria, subcategoria, id, modelo, precio } = data

  return (
    <li className="list-group-item list-group-item-action px-0 border-bottom">
      <div className="row align-items-center" >
        <div className="col-5 col-auto text-wrap ms-2 flex align-items-center">
          <span className='h6'>
            {categoria} {subcategoria} {marca} {modelo} {'$' + precio}
          </span>
          <div className="input-group mb-3"></div>
        </div>
        <div className="col d-flex flex-row justify-content-end">
          <div className="w-auto">
            <DropdownButtonIcon
              icon="fa-solid fa-ellipsis-v"
              className="btn btn-sm d-flex"
            >
              {
                <>
                  <li>
                    <Link
                      to={`/productos/detalle/${id}`}
                      className="dropdown-item text-primary"
                    >
                      <i className="fa-solid fa-eye me-2"></i>Detalle
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/productos/editar/${id}`}
                      className="dropdown-item text-primary"
                    >
                      <i className="fa-solid fa-pencil me-2"></i>Editar
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item text-danger"
                      onClick={() => action(data)}
                    >
                      <i className="fa-solid fa-trash me-2"></i>Eliminar
                    </button>
                  </li>
                </>
              }
            </DropdownButtonIcon>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProductoItem
