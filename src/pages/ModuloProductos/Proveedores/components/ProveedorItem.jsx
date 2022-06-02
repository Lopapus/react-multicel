import React from 'react'
import img_usuario from '../../../../images/sistema/usuario.png'
import { Link } from 'react-router-dom'
import DropdownButtonIcon from '../../../../components/DropdownButtonIcon'

const ProveedorItem = ({ data }) => {
  const { id, nombre, cuit } = data
  return (
    <li className="list-group-item px-0 border-bottom">
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
            <small>cuit: {cuit}</small>
          </div>
          {/* <div className="d-flex align-items-center text-info">
            <small>{inscripto ? 'inscripto' : 'no inscripto'}</small>
          </div> */}
        </div>
        <div className="col d-flex flex-row justify-content-end">
          <div className='w-auto'>
            <DropdownButtonIcon icon="fa-solid fa-ellipsis-v" className="btn btn-sm d-flex" >
              {

                <>
                  <li><Link to={`/productos/${id}`} className="dropdown-item text-primary"><i className="fa-solid fa-list me-2"></i>Productos</Link></li>
                  <li><Link to={`informacion/${id}`} className="dropdown-item text-info"><i className="fa-solid fa-eye me-2"></i>Información</Link></li>
                  <li><Link to={`/proveedores/${id}`} className="dropdown-item text-primary"><i className="fa-solid fa-pencil me-2"></i>Editar</Link></li>
                  <li><Link to={`/proveedores/eliminar/${id}`} className="dropdown-item text-danger"><i className="fa-solid fa-trash me-2"></i>Eliminar</Link></li>
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
