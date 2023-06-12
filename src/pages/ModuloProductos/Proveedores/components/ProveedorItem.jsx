import React, { useContext } from 'react'
import img_usuario from '../../../../images/sistema/usuario.png'
import { Link } from 'react-router-dom'
import DropdownButtonIcon from '../../../../components/DropdownButtonIcon'
import ActionDeleteContext from '../../../../contexts/ActionDeleteContext'
import parseCuit from '../../../../helpers/parseCuit'

const ProveedorItem = ({ data }) => {
  const action = useContext(ActionDeleteContext)
  const { id, nombre, cuit } = data

  return (
    <li className="list-group-item list-group-item-action px-2 border-bottom">
      <div className="row align-items-center">
        <div className="col-auto">
          {/* <!-- Avatar --> */}
          <span className="avatar">
            <img className="rounded" src={img_usuario} alt="user image" />
          </span>
        </div>
        <div className="col-5 col-auto text-wrap ms-2">
          <h4 className="h6 mb-0">
            {nombre}
          </h4>
          <div>
            <small>cuit: {parseCuit(cuit)}</small>
          </div>
        </div>
        <div className="col d-flex flex-row justify-content-end">
          <div className='w-auto'>
            <DropdownButtonIcon icon="fa-solid fa-ellipsis-v" className="btn btn-sm d-flex" >
              {

                <>
                  <li><Link to={`productos/${id}`} className="dropdown-item text-primary"><i className="fa-solid fa-list me-2"></i>Productos</Link></li>
                  <li><Link to={`info/${id}`} state={data} className="dropdown-item text-info"><i className="fa-solid fa-eye me-2"></i>Información</Link></li>
                  <li><Link to={`${id}`} className="dropdown-item text-primary"><i className="fa-solid fa-pencil me-2"></i>Editar</Link></li>
                  <li><button type='button' className="dropdown-item text-danger" onClick={() => action(data)}><i className="fa-solid fa-trash me-2"></i>Eliminar</button></li>
                </>
              }
            </DropdownButtonIcon>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProveedorItem
