import { Link } from 'react-router-dom'
import ButtonIcon from './ButtonIcon'

const UserItem = ({ name, rol, id, onDelete }) => {
  return (
    <li className="list-group-item px-0 border-bottom">
      <div className="row align-items-center">
        <div className="col-auto">
          {/* <!-- Avatar --> */}
          <span className="avatar">
            <img className="rounded" alt="Image placeholder" src="https://www.getbillage.com/files/user/avatar/_usuario.png" />
          </span>
        </div>
        <div className="col-auto ms--2">
          <h4 className="h6 mb-0">
            {name}
          </h4>
          <div className="d-flex align-items-center text-info">
            <small>{rol}</small>
          </div>
        </div>
        <div className="col d-flex flex-row justify-content-end">
          <div className='w-auto d-grid gap-2 d-flex'>
            <Link to={`/usuarios/${id}`}>
              <ButtonIcon btncolor={'btn-primary'} btnsize={'btn-sm'} iconclass={'fa-solid fa-pencil'} />
            </Link>
            <ButtonIcon btncolor={'btn-danger'} btnsize={'btn-sm'} iconclass={'fa-solid fa-trash'} handler={onDelete} />
          </div>
        </div>
      </div>
    </li>
  )
}

export default UserItem
