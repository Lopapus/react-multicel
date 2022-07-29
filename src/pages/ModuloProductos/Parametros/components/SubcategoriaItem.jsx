import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DropdownButtonIcon from '../../../../components/DropdownButtonIcon'
import ActionDeleteContext from '../../../../contexts/ActionDeleteContext'

const SubcategoriaItem = ({ data }) => {
  const action = useContext(ActionDeleteContext)
  const { id, nombre } = data

  return (
    <li className="list-group-item px-0 border-bottom">
      <div className="row align-items-center">
        <div className="col-5 col-auto text-wrap ms-2">
          <h4 className="h6 mb-0 color-black">
            {nombre}
          </h4>
        </div>
        <div className="col d-flex flex-row justify-content-end">
          <div className='w-auto'>
            <DropdownButtonIcon icon="fa-solid fa-ellipsis-v" className="btn btn-sm d-flex" >
              {
                <>
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

export default SubcategoriaItem